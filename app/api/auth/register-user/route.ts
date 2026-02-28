import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabase";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Extract formData and siteCode safely
    const { formData, siteCode } = body;

    if (
      !formData ||
      !formData.displayName ||
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !siteCode
    ) {
      return NextResponse.json({ error: "ข้อมูลไม่ครบถ้วน" }, { status: 400 });
    }

    // 1. Find the site by siteCode (slug) to get tenant_id
    const { data: siteData, error: siteError } = await supabase
      .from("sites")
      .select("id, tenant_id, tenants(company_code)")
      .eq("site_code", siteCode)
      .single();

    if (siteError || !siteData) {
      return NextResponse.json(
        { error: "ไม่พบรหัสโครงการนี้ในระบบ (Invalid Site Code)" },
        { status: 404 },
      );
    }

    const tenantId = siteData.tenant_id;
    // Define the expected type from the Supabase join
    interface TenantRelation {
      company_code: string;
    }

    const tenantsData = siteData.tenants as unknown as
      | TenantRelation
      | TenantRelation[];
    const companyCode = Array.isArray(tenantsData)
      ? tenantsData[0]?.company_code
      : tenantsData?.company_code;

    if (!companyCode) {
      return NextResponse.json(
        { error: "ไม่พบรหัสบริษัทที่เชื่อมโยงกับโครงการนี้" },
        { status: 500 },
      );
    }

    // 2. Hash Password & Construct login_identity
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(formData.password, salt);
    const loginIdentity =
      `${formData.username.trim()}@${companyCode}`.toLowerCase();

    // 3. Insert User
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        tenant_id: tenantId,
        username: formData.username.trim(),
        password_hash: passwordHash,
        email: formData.email.trim(),
        display_name: formData.displayName.trim(),
        login_identity: loginIdentity,
        is_tenant_admin: false, // Normal user
      })
      .select("user_uuid")
      .single();

    if (userError || !userData) {
      const isDuplicate =
        userError?.message.includes("duplicate") ||
        userError?.message.includes("unique");
      return NextResponse.json(
        {
          error: isDuplicate
            ? `ชื่อผู้ใช้นี้ถูกใช้งานในรหัสบริษัท @${companyCode} แล้ว กรุณาเปลี่ยนชื่อผู้ใช้ใหม่`
            : `สมัครสมาชิกไม่สำเร็จ: ${userError?.message}`,
        },
        { status: 409 },
      );
    }

    // 4. Insert into user_sites
    const { error: userSiteError } = await supabase.from("user_sites").insert({
      tenant_id: tenantId,
      user_uuid: userData.user_uuid,
      site_id: siteData.id,
      is_primary_site: true,
    });

    if (userSiteError) {
      // ซ่อมแซมระบบโดยลบผู้ใช้งานที่เพิ่งสร้างออก เพราะผูกเข้ากับไซต์ไม่สำเร็จ
      await supabase.from("users").delete().eq("user_uuid", userData.user_uuid);
      console.error("User Site Insert Error:", userSiteError);
      return NextResponse.json(
        { error: "ระบบไม่สามารถผูกบัญชีเข้ากับโครงการได้ ข้อมูลจึงถูกยกเลิก" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "สมัครสมาชิกโครงการสำเร็จ",
      },
      { status: 201 },
    );
  } catch (error: unknown) {
    console.error("Register User Error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดภายในระบบ" },
      { status: 500 },
    );
  }
}
