import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import { BackgroundDecorations } from "@/components/ui/BackgroundDecorations";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Island Jam Copilot 2026 🏝️ | GC Game Island Jam",
  description: "Tu asistente de alto rendimiento para la Gran Canaria Game Island JAM 2026. Optimiza tu crunch de 48h con IA multimodal.",
  openGraph: {
    title: "Island Jam Copilot 2026 🏝️",
    description: "IA Multimodal para equipos de alto rendimiento en la GC Game Island Jam.",
    images: [{ url: "/gcgamejam26.webp", width: 1200, height: 630, alt: "Island Jam Copilot 2026" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Island Jam Copilot 2026 🏝️",
    description: "IA Multimodal para el crunch de 48 horas.",
    images: ["/gcgamejam26.webp"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${orbitron.variable} ${jetbrains.variable} antialiased relative island-gradient overflow-x-hidden`}>
        {/* Official Background Overlay */}
        <div 
          className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] bg-center bg-cover bg-no-repeat grayscale-[0.5]"
          style={{ backgroundImage: 'url("/gcgamejam26.webp")' }}
        />
        
        <BackgroundDecorations />
        
        <div className="relative z-10 min-h-screen text-foreground selection:bg-island-magenta selection:text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
