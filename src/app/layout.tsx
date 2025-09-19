import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/components/layout/ThemeProvider";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "نائبك.كوم - منصة التواصل مع النواب والمرشحين",
  description: "منصة تفاعلية تربط المواطنين المصريين بنوابهم ومرشحيهم في البرلمان، مما يعزز الشفافية والمشاركة المدنية",
  keywords: "نواب، مرشحين، برلمان، مصر، سياسة، تواصل، مواطنين",
  authors: [{ name: "فريق نائبك.كوم" }],
  openGraph: {
    title: "نائبك.كوم - منصة التواصل مع النواب والمرشحين",
    description: "منصة تفاعلية تربط المواطنين المصريين بنوابهم ومرشحيهم في البرلمان",
    url: "https://naebak.com",
    siteName: "نائبك.كوم",
    locale: "ar_EG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "نائبك.كوم - منصة التواصل مع النواب والمرشحين",
    description: "منصة تفاعلية تربط المواطنين المصريين بنوابهم ومرشحيهم في البرلمان",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${geist.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
