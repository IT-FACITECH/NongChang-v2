'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Home, Plus, Trash2, Loader2, Play } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SiteForm {
  id: string; // Used for React key only
  siteId: string;
  siteName: string;
}

const AddSite = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tenantId = searchParams.get('tenantId');

  const [sites, setSites] = useState<SiteForm[]>([
    { id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36), siteId: '', siteName: '' }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // If someone visits without a tenantId (not coming directly from register)
    if (!tenantId) {
      router.push('/registerCompany');
    }
  }, [tenantId, router]);

  const handleAddSite = () => {
    setSites([...sites, { id: Math.random().toString(36).substring(2, 9) + Date.now().toString(36), siteId: '', siteName: '' }]);
  };

  const handleRemoveSite = (id: string) => {
    if (sites.length > 1) {
      setSites(sites.filter(site => site.id !== id));
    }
  };

  const handleChange = (id: string, field: 'siteId' | 'siteName', value: string) => {
    setSites(sites.map(site => 
      site.id === id ? { ...site, [field]: value } : site
    ));
  };

  const isValid = sites.every(s => s.siteId.trim() !== '' && s.siteName.trim() !== '');

  const handleSubmit = async () => {
    if (!isValid || !tenantId) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/sites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tenantId, sites }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการเพิ่มโครงการ');
      }

      // Success, proceed to login page
      router.push('/login');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!tenantId) return null;

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4B39EF] to-[#8f94fb]">
      {/* Logo Top Left */}
      <div className="absolute top-6 left-6 z-20 w-32 md:w-36">
        <Image
          src="/images/Logo_Horizontal_White.png"
          alt="FACITECH Logo"
          width={200}
          height={60}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="z-20 w-full max-w-md px-4 py-8 mt-16 md:mt-0 flex flex-col items-center">
        {/* Header */}
        <div className="text-left mb-8 w-full">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">เพิ่มโครงการ</h1>
          <p className="text-white/80 text-sm md:text-base">
            เพิ่มข้อมูลโครงการ (Site) ในบริษัทของคุณ (เพิ่มได้มากกว่า 1 โครงการ)
          </p>
        </div>

        <form className="w-full space-y-5" onSubmit={e => e.preventDefault()}>
          {sites.map((site, index) => (
            <div key={site.id} className="relative rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 space-y-4">
              
              {/* Header and Delete Button */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-semibold text-base">
                  <Home size={18} />
                  <span>ข้อมูลโครงการ {index + 1}</span>
                </div>
                {sites.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveSite(site.id)}
                    className="text-white/50 hover:text-red-400 transition-colors p-1"
                    title="ลบโครงการ"
                  >
                    <Trash2 size={18} />
                  </button>
                )}
              </div>

              {/* Site ID */}
              <div>
                <label className="block text-white/80 text-sm mb-1">รหัสโครงการ (Site ID)</label>
                <div className="relative flex items-center rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors">
                  <span className="pl-4 text-white/60">
                    <Home size={16} />
                  </span>
                  <input
                    type="text"
                    value={site.siteId}
                    onChange={(e) => handleChange(site.id, 'siteId', e.target.value)}
                    placeholder="เช่น PROJ01"
                    maxLength={10}
                    className="flex-1 bg-transparent text-white placeholder-white/50 py-3 px-3 focus:outline-none text-sm uppercase"
                  />
                </div>
                <p className="text-white/70 text-xs mt-1">ตัวอักษรภาษาอังกฤษและตัวเลข ไม่เกิน 10 ตัวอักษร</p>
              </div>

              {/* Site Name */}
              <div>
                <label className="block text-white/80 text-sm mb-1">ชื่อโครงการ</label>
                <div className="relative flex items-center rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors">
                  <span className="pl-4 text-white/60">
                    <Home size={16} />
                  </span>
                  <input
                    type="text"
                    value={site.siteName}
                    onChange={(e) => handleChange(site.id, 'siteName', e.target.value)}
                    placeholder="เช่น โครงการ The Garden"
                    className="flex-1 bg-transparent text-white placeholder-white/50 py-3 px-3 focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          ))}

          {/* Add more sites Button */}
          <button
            type="button"
            onClick={handleAddSite}
            className="w-full py-4 border-2 border-dashed border-white/30 rounded-2xl flex items-center justify-center gap-2 text-white/70 hover:text-white hover:border-white/60 hover:bg-white/5 transition-all"
          >
            <Plus size={20} />
            <span className="font-semibold text-sm">เพิ่มโครงการใหม่</span>
          </button>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-3 text-red-100 text-sm md:text-base text-center break-words mt-4">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!isValid || loading}
            className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold text-lg transition-all 
              ${(!isValid || loading)
                ? 'bg-white/30 text-white/50 cursor-not-allowed'
                : 'bg-white text-[#4B39EF] hover:bg-gray-100 hover:scale-[1.02] shadow-[0_0_20px_rgba(255,255,255,0.3)]'
              }`}
          >
            {loading ? (
              <>
                <Loader2 size={24} className="animate-spin" />
                <span>กำลังบันทึกข้อมูล...</span>
              </>
            ) : (
              <>
                <Play size={20} className="fill-current" />
                <span>บันทึกข้อมูล และ เข้าสู่ระบบ</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Optional Page Background Element */}
      <div className="fixed bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-[#4B39EF]/50 to-transparent pointer-events-none z-0" />
    </div>
  );
};

export default AddSite;
