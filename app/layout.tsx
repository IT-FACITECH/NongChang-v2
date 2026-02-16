import type { Metadata } from "next";
import "./globals.css";
import { Noto_Sans_Thai } from "next/font/google";

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-NotoSansThai",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "แจ้งซ่อม น้องช่าง",
  description: "แจ้งซ่อม น้องช่าง",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSansThai.variable} ${notoSansThai.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
