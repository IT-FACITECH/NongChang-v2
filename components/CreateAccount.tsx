"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const CreateAccount = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [consent, setConsent] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const isValid = 
    formData.name.trim() !== '' &&
    formData.email.trim() !== '' &&
    formData.phone.trim() !== '' &&
    formData.username.trim() !== '' &&
    formData.password.trim() !== '' &&
    formData.confirmPassword.trim() !== '' &&
    consent;

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4B39EF] to-[#8f94fb]">
      {/* Background Gradient - approximate match to design */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#5B4EFF] to-[#8884FF] -z-10" />

      {/* Logo Top Left */}
      <div className="absolute top-6 left-6 z-20 w-32 md:w-30 lg:w-40">
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
      <div className="absolute top-10 right-0 z-10 w-[100px] md:w-100px] lg:w-[100px] transition-transform duration-500 ease-out block">
        <Image
          src="/images/character_facitech_(1)-04.png"
          alt="Nong Chang Character"
          width={500}
          height={100}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Main Content Container */}
      <div className="z-20 w-full max-w-md px-6 flex flex-col items-start mt-32 md:mt-0">
        
        {/* Header Text */}
        <div className="text-left mt-30 mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            ยินดีที่ได้รู้จัก
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            ขอข้อมูลให้น้องช่างทำความรู้จักหน่อยนะครับ
          </p>
        </div>

        {/* Form */}
        <form className="w-full space-y-4">
          
          {/* Name Input */}
          {/* <div className="relative">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ชื่อที่อยากให้น้องเรียก"
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-sm"
            />
          </div> */}

          {/* Email Input */}
          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="อีเมลที่ทำงาน"
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-sm"
            />
          </div>

          {/* Phone Input */}
          <div className="relative">
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="เบอร์ติดต่อ"
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-sm"
            />
          </div>

          <div className="w-full h-0.5 bg-black opacity-10 my-8" />
          

          {/* username Input */}
          <div className="relative">
            <input
              type="tel"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="ชื่อผู้ใช้สำหรับเข้าสู่ระบบ"
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-sm"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="โปรดใช้อักษร 8 ตัวขึ้นไปสำหรับรหัสผ่าน"
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="ยืนยันรหัสผ่าน"
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all shadow-sm"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-3 cursor-pointer mt-4" onClick={() => setConsent(!consent)}>
            <div className={`w-5 h-5 min-w-[1.25rem] rounded-full border-2 border-white flex items-center justify-center transition-colors mt-0.5 ${consent ? 'bg-white' : 'bg-transparent'}`}>
              {consent && <Check size={14} className="text-[#5B4EFF]" strokeWidth={3} />}
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm select-none font-medium">
                ยินยอมให้เปิดเผยข้อมูลส่วนบุคคลกับ บริษัท แฟคซิเทค จำกัด
              </span>
            </div>
          </div>

          {/* Privacy Policy Text */}
           <p className="text-white/70 text-[10px] md:text-xs leading-relaxed pl-8">
              ข้าพเจ้ารับทราบนโยบายคุ้มครองข้อมูลส่วนบุคคลของบริษัท แฟคซิเทค จำกัด และ ยินยอมให้บริษัท เก็บ ใช้ และเปิดเผยข้อมูลของข้าพเจ้าเพื่อรับทราบข้อมูลต่างๆ ของบริษัท ตรวจสอบรายละเอียดเพิ่มเติมได้ที่{' '}
              <a href="https://faci.tech/letter-of-consent" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
                https://faci.tech/letter-of-consent
              </a>
            </p>


          {/* Confirm Button */}
          <button
            type="button"
            disabled={!isValid}
            onClick={() => router.push('/login')}
            className={`w-full py-3 rounded-full shadow-lg transition-all transform mt-6 backdrop-blur-md border 
              ${isValid 
                ? 'bg-[#4834d4] hover:bg-[#3c2bb5] text-white font-bold hover:scale-[1.02] active:scale-95 border-transparent' 
                : 'bg-white/30 text-white/50 font-medium cursor-not-allowed border-white/20'
              }
            `}
          >
            ยืนยัน
          </button>

        </form>

        {/* Footer Links */}
        <div className="mt-8 text-center text-white/80 text-sm mb-10">
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

export default CreateAccount;
