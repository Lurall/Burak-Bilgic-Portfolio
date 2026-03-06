import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Burak Bilgiç | SDET & Geliştirici Portfolyo",
  description: "Burak Bilgiç - SDET & Geliştirici. Test otomasyonu, yazılım geliştirme, AI sistemleri ve multimedya projelerim.",
};

import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr">
      <body className="antialiased">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
