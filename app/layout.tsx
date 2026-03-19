import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/LayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Softlien - Software Development & Digital Solutions",
    template: "%s | Softlien",
  },
  description:
    "Transform your digital vision. We craft innovative software solutions that drive business growth.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Softlien - Software Development & Digital Solutions",
    description:
      "Transform your digital vision. We craft innovative software solutions that drive business growth.",
    siteName: "Softlien",
  },
  twitter: {
    card: "summary_large_image",
    title: "Softlien - Software Development & Digital Solutions",
    description:
      "Transform your digital vision. We craft innovative software solutions that drive business growth.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          <LayoutShell>{children}</LayoutShell>
        </div>
      </body>
    </html>
  );
}
