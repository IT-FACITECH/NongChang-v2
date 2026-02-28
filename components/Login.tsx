"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff, Check } from 'lucide-react';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

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
      <div className="absolute top-10 right-0 z-20 w-[100px] md:w-[100px] lg:w-[100px] transition-transform duration-500 ease-out block">
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
        <div className="text-left mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            น้องช่างสวัสดีครับ
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            กรุณาเข้าสู่ระบบเพื่อใช้งานครับ
          </p>
        </div>

        {/* Form */}
        <form className="w-full space-y-4">
          
          {/* Username Input */}
          <div className="relative">
            <input
              type="text"
              placeholder="กรอกชื่อผู้ใช้ (Username)"
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="รหัสผ่าน"
              className="w-full bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          {/* Remember Me */}
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setRememberMe(!rememberMe)}>
            <div className={`w-5 h-5 rounded-full border-2 border-white flex items-center justify-center transition-colors ${rememberMe ? 'bg-white' : 'bg-transparent'}`}>
              {rememberMe && <Check size={14} className="text-[#5B4EFF]" strokeWidth={3} />}
            </div>
            <span className="text-white text-sm select-none">จดจำฉัน</span>
          </div>

          {/* Login Button */}
          <button
            type="button"
            className="w-full bg-[#4834d4] hover:bg-[#3c2bb5] text-white font-bold py-3 rounded-full shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 mt-6"
          >
            เข้าใช้งาน
          </button>

        </form>

        {/* Footer Links */}
        <div className="mt-6 w-full text-center text-white/80 text-xs space-y-2">
          <p>
            ยังไม่เคยสมัครใช้งาน?{' '}
            <Link href="/registerCompany" className="text-white font-bold underline hover:text-white/100 transition-colors">
              ลงทะเบียน
            </Link>
          </p>
          <p>หรือ</p>
          <Link href="/forgetPassword" className="text-white font-bold underline hover:text-white/100 transition-colors">
            ลืมรหัสผ่าน
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
