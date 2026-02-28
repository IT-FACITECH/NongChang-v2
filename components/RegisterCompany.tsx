"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Building2, User, Mail, Lock, Eye, EyeOff, Check, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const RegisterCompany = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    companyName: '',
    companyCode: '',
    adminName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isValid =
    formData.companyName.trim() !== '' &&
    formData.companyCode.trim() !== '' &&
    formData.adminName.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.username.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    formData.password === formData.confirmPassword &&
    consent;

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/auth/register-company', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ formData })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'เกิดข้อผิดพลาดในการลงทะเบียน');
      }

      // Success, redirect to add-site step with tenantId
      router.push(`/addNewsite?tenantId=${data.tenantId}`);
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

  const passwordStrength = (() => {
    const p = formData.password;
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[^A-Za-z0-9]/.test(p)) score++;
    return score;
  })();

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

      {/* Character Top Right */}
      <div className="absolute top-10 right-0 z-10 w-[100px]">
        <Image
          src="/images/character_facitech_(1)-04.png"
          alt="Nong Chang Character"
          width={500}
          height={100}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="z-20 w-full max-w-md px-4 py-8 mt-16 md:mt-0 flex flex-col items-center">

        {/* Header */}
        <div className="text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">ยินดีที่ได้รู้จัก</h1>
          <p className="text-white/80 text-sm md:text-base">
            ขอข้อมูลสำหรับสร้างบริษัทบน NongChang Platform
          </p>
        </div>

        <form className="w-full space-y-5" onSubmit={e => e.preventDefault()}>

          {/* ─── Section 1: ข้อมูลบริษัท ─── */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold text-base">
              <Building2 size={18} />
              <span>ข้อมูลบริษัท (Tenant)</span>
            </div>

            {/* Company Name */}
            <div>
              <label className="block text-white/80 text-sm mb-1">ชื่อบริษัท</label>
              <div className="relative flex items-center rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors">
                <span className="pl-4 text-white/60">
                  <Building2 size={16} />
                </span>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="เช่น บริษัท ABC จำกัด"
                  className="flex-1 bg-transparent text-white placeholder-white/50 py-3 px-3 focus:outline-none text-sm"
                />
              </div>
            </div>
            {/* Company Code */}
            <div>
              <label className="block text-white/80 text-sm mb-1">รหัสบริษัท</label>
              <div className="relative flex items-center rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors">
                <span className="pl-4 text-white/60">
                  <Building2 size={16} />
                </span>
                <input
                  type="text"
                  name="companyCode"
                  value={formData.companyCode}
                  onChange={handleChange}
                  placeholder="เช่น FT ชื่อย่อบริษัท Facitech"
                  maxLength={10}
                  className="flex-1 bg-transparent text-white placeholder-white/50 py-3 px-3 focus:outline-none text-sm uppercase"
                />
              </div>
              <p className="text-white/70 text-xs mt-1">ตัวอักษรภาษาอังกฤษและตัวเลข ไม่เกิน 10 ตัวอักษร</p>
            </div>

          </div>


          {/* ─── Section 3: ข้อมูลผู้ดูแลระบบ ─── */}
          <div className="rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 space-y-4">
            <div className="flex items-center gap-2 text-white font-semibold text-base">
              <User size={18} />
              <span>ข้อมูลผู้ดูแลระบบ (Admin)</span>
            </div>

            {/* Admin Name */}
            <div>
              <label className="block text-white/80 text-sm mb-1">ชื่อที่ต้องการให้แสดงในระบบ</label>
              <div className="relative flex items-center rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors">
                <span className="pl-4 text-white/60"><User size={16} /></span>
                <input
                  type="text"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  placeholder="คุณสมชาย"
                  className="flex-1 bg-transparent text-white placeholder-white/30 py-3 px-3 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-white/80 text-sm mb-1">อีเมล</label>
              <div className="relative flex items-center rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors">
                <span className="pl-4 text-white/60"><Mail size={16} /></span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="flex-1 bg-transparent text-white placeholder-white/30 py-3 px-3 focus:outline-none text-sm"
                />
              </div>
            </div>

            {/* username Input */}
            <div>
              <label className="block text-white/80 text-sm mb-1">ชื่อผู้ใช้สำหรับเข้าสู่ระบบ</label>
              <div className="flex items-stretch rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors overflow-hidden">
                <div className="flex-1 relative flex items-center">
                  <span className="pl-4 text-white/60"><User size={16} /></span>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="username"
                    className="w-full bg-transparent text-white placeholder-white/30 py-3 px-3 focus:outline-none text-sm"
                  />
                </div>
                {formData.companyCode && (
                  <div className="flex items-center px-4 bg-white/10 border-l border-white/20 text-white font-bold text-sm whitespace-nowrap">
                    @{formData.companyCode}
                  </div>
                )}
              </div>
            </div>

            {/* Password + Confirm (side by side) */}
            <div className="grid grid-cols-2 gap-3">
              {/* Password */}
              <div>
                <label className="block text-white/80 text-sm mb-1">รหัสผ่าน</label>
                <div className="relative flex items-center rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors">
                  <span className="pl-3 text-white/60"><Lock size={15} /></span>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="········"
                    className="flex-1 bg-transparent text-white placeholder-white/50 py-3 px-2 pr-8 focus:outline-none text-sm w-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 text-white/60 hover:text-white transition-colors"
                  >
                    {showPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-white/80 text-sm mb-1">ยืนยันรหัสผ่าน</label>
                <div className="relative flex items-center rounded-xl bg-white/20 border border-white/30 focus-within:border-white transition-colors">
                  <span className="pl-3 text-white/60"><Lock size={15} /></span>
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="········"
                    className="flex-1 bg-transparent text-white placeholder-white/50 py-3 px-2 focus:outline-none text-sm w-0"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2 text-white/40 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <Eye size={15} /> : <EyeOff size={15} />}
                  </button>
                </div>
              </div>
            </div>

            {/* Password strength bar */}
            {formData.password.length > 0 && (
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4].map(i => (
                  <div
                    key={i}
                    className={`h-1 flex-1 rounded-full transition-colors ${
                      i <= passwordStrength
                        ? passwordStrength <= 1 ? 'bg-red-400' : passwordStrength <= 2 ? 'bg-yellow-400' : 'bg-green-400'
                        : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Consent */}
            <div
              className="flex items-start gap-3 cursor-pointer pt-1"
              onClick={() => setConsent(!consent)}
            >
              <div
                className={`w-5 h-5 min-w-[1.25rem] rounded-full border-2 flex items-center justify-center transition-colors mt-0.5 ${
                  consent ? 'bg-white border-white' : 'border-white bg-transparent'
                }`}
              >
                {consent && <Check size={12} className="text-[#5B4EFF]" strokeWidth={3} />}
              </div>
              <span className="text-white text-sm select-none font-medium">
                ยอมรับ{' '}
                <a
                  href="https://faci.tech/letter-of-consent"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-white/80 transition-colors"
                  onClick={e => e.stopPropagation()}
                >
                  นโยบายการให้บริการ
                </a>
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            disabled={!isValid || loading}
            onClick={handleSubmit}
            className={`w-full py-3 rounded-full shadow-lg transition-all transform mt-2 backdrop-blur-md border flex items-center justify-center gap-2
              ${isValid && !loading
                ? 'bg-[#4834d4] hover:bg-[#3c2bb5] text-white font-bold hover:scale-[1.02] active:scale-95 border-transparent'
                : 'bg-white/30 text-white/50 font-medium cursor-not-allowed border-white/20'
              }`}
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                กำลังสร้างบัญชี...
              </>
            ) : (
              'สร้างบริษัทและสมัครสมาชิก'
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-3 rounded-xl bg-red-500/20 border border-red-400/40 px-4 py-3 text-red-200 text-sm text-center">
              {error}
            </div>
          )}

        </form>

        {/* Footer */}
        <div className="mt-6 text-center text-white/50 text-sm mb-10">
          <p>
            มีบัญชีอยู่แล้ว?{' '}
            <Link href="/login" className="text-white font-bold underline hover:text-white/100 transition-colors">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};

export default RegisterCompany;
