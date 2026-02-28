import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { tenantId, sites } = body;

    // Validate incoming data
    if (!tenantId || !sites || !Array.isArray(sites) || sites.length === 0) {
      return NextResponse.json({ error: 'ข้อมูลไม่ครบถ้วน หรือไม่มีรายการโครงการ' }, { status: 400 });
    }

    // Format sites for bulk insert
    const sitesToInsert = sites.map((site: { siteId: string; siteName: string }) => ({
      tenant_id: tenantId,
      site_code: site.siteId.trim().toUpperCase(),
      site_name: site.siteName.trim(),
    }));

    // Perform bulk insert
    const { data: insertedSites, error } = await supabase
      .from('sites')
      .insert(sitesToInsert)
      .select('id');

    if (error) {
       // Handle duplicate unique code errors
       if (error.message.includes('duplicate') || error.message.includes('unique')) {
         return NextResponse.json({ error: 'มีรหัสโครงการซ้ำอยู่ในระบบ กรุณาใช้รหัสอื่น' }, { status: 409 });
       }
       return NextResponse.json({ error: `สร้างโครงการไม่สำเร็จ: ${error.message}` }, { status: 500 });
    }
    
    // Attempt to link the first generated site to the admin user who was created earlier 
    // for this tenant with no site_id.
    if (insertedSites && insertedSites.length > 0) {
        const firstSiteId = insertedSites[0].id;
        await supabase
          .from('users')
          .update({ site_id: firstSiteId })
          .eq('tenant_id', tenantId)
          .is('site_id', null);
    }

    return NextResponse.json({ success: true, message: 'บันทึกโครงการสำเร็จ' }, { status: 201 });

  } catch (error: unknown) {
    console.error('Add Sites API Error:', error);
    return NextResponse.json({ error: 'เกิดข้อผิดพลาดเซิร์ฟเวอร์ กรุณาลองใหม่อีกครั้ง' }, { status: 500 });
  }
}
