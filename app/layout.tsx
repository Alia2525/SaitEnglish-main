import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SaitEnglish — тренажери з англійської",
  description:
    "Інтерактивні вправи з граматики, словника та артиклів. Український інтерфейс, рівні A1–B2.",
  openGraph: {
    title: "SaitEnglish",
    description: "Вивчай англійську з інтерактивними тренажерами",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="uk">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased gradient-bg`}>
        <Header />
        <main className="mx-auto min-h-[calc(100vh-128px)] max-w-6xl px-4 py-7 sm:py-10">
          {children}
        </main>
        <footer className="border-t border-[var(--color-border)] bg-[var(--color-background)]/70 py-8 text-center text-sm text-[var(--color-muted)]">
          <p>SaitEnglish</p>
          <p className="mt-1 text-xs">Навчайся у своєму темпі · без реєстрації</p>
        </footer>
      </body>
    </html>
  );
}
