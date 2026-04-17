import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Island Jam Copilot 2026 🏝️",
  description: "Tu compañero de crunch para la Gran Canaria Game Island JAM 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${orbitron.variable} ${jetbrains.variable} antialiased`}>
        <div className="min-h-screen bg-background text-foreground selection:bg-island-orange selection:text-white">
          {children}
        </div>
      </body>
    </html>
  );
}
