"use client"

import * as React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel"

const data = [
  { 
    title: "แจ้งซ่อม", 
    desc: 'กดที่ปุ่ม "แจ้งซ่อม" แล้วสแกน QR Code ที่อยู่บริเวณนั้น พร้อมระบุปัญหาและส่งรูปถ่ายให้น้องช่างได้เลย', 
    img: "vnimc_1.png" 
  },
  { 
    title: "สถานะงาน", 
    desc: 'ติดตามความคืบหน้าได้จากเมนู "สถานะงาน" สามารถตรวจสอบรายละเอียดงานได้ตลอดเวลา', 
    img: "49svh_2.png" 
  },
  { 
    title: "ติดต่อน้องช่าง", 
    desc: 'หากพบปัญหาในการใช้งาน หรือต้องการสอบถามวิธีการใช้งานเพิ่มเติม สามารถแจ้งน้องช่างได้ที่เมนู "ติดต่อ"', 
    img: "fijek_4.png" 
  },
]

export function Onboarding() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const router = useRouter()

  React.useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <div className="w-full h-[100dvh] flex flex-col bg-gradient-to-b from-slate-50 to-white overflow-hidden font-sans relative">
      {/* Decorative background blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-violet-100/60 blur-3xl" />
        <div className="absolute top-[20%] -left-[10%] w-[40%] h-[40%] rounded-full bg-indigo-100/60 blur-3xl" />
      </div>

      {/* 1. Header with Logo — same size as Login page */}
      <div className="absolute top-6 left-6 z-20 w-32 md:w-30 lg:w-40">
        <Image
          src="/images/Logo_Color(B)-06.png"
          alt="FACITECH Logo"
          width={200}
          height={60}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* 2. Carousel — centered vertically */}
      <div className="flex-1 min-h-0 w-full relative z-10 flex flex-col items-center justify-center">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {data.map((item, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col items-center px-6 sm:px-8 md:px-16 text-center gap-4 py-4">
                  
                  {/* Image Area */}
                  <div className="relative w-[180px] sm:w-[220px] md:w-[260px] aspect-square mix-blend-multiply">
                    <Image
                      src={`/images/${item.img}`}
                      alt={item.title}
                      fill
                      className="object-contain drop-shadow-lg"
                      priority={index === 0}
                    />
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight leading-tight">
                    {item.title}
                  </h2>
                  <p className="text-slate-500 text-sm sm:text-base md:text-lg leading-relaxed max-w-xs sm:max-w-sm md:max-w-md">
                    {item.desc}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 3. Footer */}
      <div className="px-6 pb-6 sm:pb-10 pt-2 sm:pt-4 flex flex-col items-center gap-4 sm:gap-6 shrink-0 relative z-10">
        
        {/* Pagination Dots */}
        <div className="flex gap-2.5">
          {data.map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-500 ease-out cursor-pointer ${
                current === i 
                  ? "w-10 bg-indigo-600 shadow-md shadow-indigo-200" 
                  : "w-2.5 bg-indigo-100 hover:bg-indigo-300"
              }`}
            />
          ))}
        </div>

        {/* Action Button */}
        <button
          onClick={() => (current === data.length - 1 ? router.push("/login") : api?.scrollNext())}
          className="w-full max-w-[280px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 rounded-full font-bold text-base transition-all duration-300 shadow-[0_6px_15px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_10px_20px_-6px_rgba(79,70,229,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 group mx-auto"
        >
          {current === data.length - 1 ? "เริ่มต้นใช้งาน" : "ถัดไป"}
          {current !== data.length - 1 && (
            <svg 
              className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          )}
        </button>
      </div>
    </div>
  )
}