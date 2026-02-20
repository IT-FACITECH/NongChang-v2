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

      {/* 1. Header with Logo */}
      <div className="flex justify-start items-center p-6 shrink-0 relative z-10 block">
        <div className="relative w-32 md:w-40 h-10">
          <Image
            src="/images/Logo_Color(B)-06.png"
            alt="FACITECH Logo"
            width={200}
            height={60}
            className="object-contain object-left block"
            priority
          />
        </div>
      </div>

      {/* 2. Carousel */}
      <div className="flex-1 min-h-0 w-full relative z-10 flex flex-col justify-center">
        <Carousel setApi={setApi} className="w-full h-full max-h-[600px]">
          <CarouselContent className="h-full">
            {data.map((item, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="flex flex-col items-center justify-center h-full px-8 md:px-12 text-center">
                  
                  {/* Image Area */}
                  <div className="relative w-full max-w-[280px] md:max-w-[280px] aspect-square mb-6 md:mb-8 p-4 flex items-center justify-center mix-blend-multiply">
                    <div className="relative w-full h-full">
                      <Image
                        src={`/images/${item.img}`}
                        alt={item.title}
                        fill
                        className="object-contain drop-shadow-lg"
                        priority={index === 0}
                      />
                    </div>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-extrabold text-slate-800 tracking-tight mb-4">
                    {item.title}
                  </h2>
                  <p className="text-slate-500 text-base md:text-lg whitespace-nowrap">
                    {item.desc}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* 3. Footer */}
      <div className="px-8 pb-10 pt-4 flex flex-col items-center gap-8 shrink-0 relative z-10">
        
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
          className="w-full max-w-[280px] bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white py-3 md:py-3.5 rounded-full font-bold text-base transition-all duration-300 shadow-[0_6px_15px_-5px_rgba(79,70,229,0.5)] hover:shadow-[0_10px_20px_-6px_rgba(79,70,229,0.6)] active:scale-[0.98] flex items-center justify-center gap-2 group mx-auto"
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