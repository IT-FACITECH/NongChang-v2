import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { supabase } from '@/lib/supabase'; // Using named import

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { formData } = body;

    // Validate incoming data
    if (!formData || 
        !formData.companyName || 
        !formData.companyCode ||
        !formData.adminName || 
        !formData.email || 
        !formData.username || 
        !formData.password) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบถ้วน' }, { status: 400 });
    }

    // 1. Insert tenant
    const { data: tenantData, error: tenantError } = await supabase
      .from('tenants')
      .insert({ company_name: formData.companyName.trim(), company_code: formData.companyCode.trim(), is_active: true })
      .select('tenant_id')
      .single();

    if (tenantError) return NextResponse.json({ error: `สร้างบริษัทไม่สำเร็จ: ${tenantError.message}` }, { status: 500 });
    if (!tenantData) return NextResponse.json({ error: 'สร้างบริษัทไม่สำเร็จ: ไม่ได้รับข้อมูลกลับ' }, { status: 500 });

    const tenantId: string = tenantData.tenant_id;

    // 2. Insert department "ผู้บริหาร"
    const { data: departmentData, error: departmentError } = await supabase
      .from('departments')
      .insert({
        tenant_id: tenantId,
        department_name: 'ผู้บริหาร'
      })
      .select('id')
      .single();

    if (departmentError) {
      await supabase.from('tenants').delete().eq('tenant_id', tenantId);
      return NextResponse.json({ error: `สร้างแผนกไม่สำเร็จ: ${departmentError.message}` }, { status: 500 });
    }
    if (!departmentData) return NextResponse.json({ error: 'สร้างแผนกไม่สำเร็จ: ไม่ได้รับข้อมูลกลับ' }, { status: 500 });

    const departmentId: number = departmentData.id;

    // 3. Hash password and insert user
    const passwordHash = await bcrypt.hash(formData.password, 10);

    const { error: userError } = await supabase
      .from('users')
      .insert({
        tenant_id: tenantId,
        department_id: departmentId,
        role_id: 2,

        display_name: formData.adminName.trim(),
        email: formData.email.trim().toLowerCase(),
        username: formData.username.trim(),
        login_identity: `${formData.username.trim()}@${formData.companyCode.trim()}`,
        password_hash: passwordHash,
        is_tenant_admin: true,
      });

    if (userError) {
      await supabase.from('departments').delete().eq('tenant_id', tenantId);
      await supabase.from('tenants').delete().eq('tenant_id', tenantId);
      const isDuplicate = userError.message.includes('duplicate') || userError.message.includes('unique');
      return NextResponse.json({ 
        error: isDuplicate 
          ? `ชื่อผู้ใช้นี้ถูกใช้งานในรหัสบริษัท @${formData.companyCode.trim()} แล้ว กรุณาใช้ชื่อผู้ใช้อื่น`
          : `สร้างผู้ดูแลระบบไม่สำเร็จ: ${userError.message}`
      }, { status: 409 });
    }

    return NextResponse.json({ 
      success: true, 
      message: 'สร้างบริษัทและผู้ใช้สำเร็จ',
      tenantId: tenantId
    }, { status: 201 });

  } catch (error: unknown) {
    console.error('Registration API Error:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' }, { status: 500 });
  }
}
