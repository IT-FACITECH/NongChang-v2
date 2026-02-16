"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#4B39EF] to-[#8f94fb]">
      {/* Background Gradient */}
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
      <div className="absolute top-10 right-0 z-10 w-[80px] md:w-[120px] lg:w-[160px] transition-transform duration-500 ease-out block">
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
      <div className="z-20 w-full max-w-md px-6 flex flex-col items-center mt-32 md:mt-0">
        
        {/* Header Text */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            เปลี่ยนรหัสผ่าน
          </h1>
          <p className="text-white/80 text-sm md:text-base">
            สร้างรหัสผ่านใหม่
          </p>
        </div>

        {/* Form */}
        <form className="w-full space-y-4">
          
          {/* New Password Input */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="รหัสผ่านใหม่"
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
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

          {/* Submit Button */}
          <button
            type="button"
            className="w-full bg-[#4834d4] hover:bg-[#3c2bb5] text-white font-bold py-3 rounded-full shadow-lg transition-all transform hover:scale-[1.02] active:scale-95 mt-6 backdrop-blur-md border border-transparent"
          >
            เปลี่ยนรหัสผ่าน
          </button>

        </form>

        {/* Footer Links */}
        <div className="mt-6 text-center text-white/80 text-sm">
          <Link href="/login" className="text-white hover:text-white/100 transition-colors">
            ยกเลิก
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ChangePassword;
