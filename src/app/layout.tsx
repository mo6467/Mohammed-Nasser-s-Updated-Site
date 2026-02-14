import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammed Nasser Ibrahim | Senior Backend Engineer",
  description: "Senior Backend Engineer specializing in Java, distributed systems, AML/FinTech, AI/ML platforms, and quantitative mathematics. Expert in building enterprise-grade systems at scale.",
  keywords: [
    "Backend Engineer",
    "Java",
    "Distributed Systems",
    "AML",
    "FinTech",
    "AI/ML",
    "Spring Boot",
    "Microservices",
    "Python",
    "Machine Learning",
    "LLM Engineering",
    "Software Architect"
  ],
  authors: [{ name: "Mohammed Nasser Ibrahim" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Mohammed Nasser Ibrahim | Senior Backend Engineer",
    description: "Senior Backend Engineer specializing in Java, distributed systems, AML/FinTech, and AI/ML platforms.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Nasser Ibrahim | Senior Backend Engineer",
    description: "Senior Backend Engineer specializing in Java, distributed systems, AML/FinTech, and AI/ML platforms.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#0a0a0f] text-white`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
