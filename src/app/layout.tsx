import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "OMEGA-NET Data Terminal",
  description: "Secure corporate database. CLEARANCE LEVEL: OMEGA.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${jetbrainsMono.variable} antialiased custom-cursor min-h-screen relative`}
      >
        <div className="scanlines"></div>
        {children}
      </body>
    </html>
  );
}
