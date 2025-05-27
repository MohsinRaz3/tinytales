import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";

const geistSans = localFont({
  src: "./fonts/balootamma/BalooTamma2-Medium.ttf",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-baloo-tamma",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "TinyTales",
  description: "Unleash your imagination! Write your story type below, and watch it come to life!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}  font-[family-name:var(--font-baloo-tamma)] antialiased bg-[#1A1A1A]`}
      >
        <Navbar />
        <Toaster position="top-center" />
        {children}
      </body>
    </html>
  );
}
