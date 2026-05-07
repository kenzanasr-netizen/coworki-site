import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CoWorki | Coworking moderne et flexible",
  description:
    "Réservez l'espace de travail idéal, découvrez les offres flash et profitez d'une expérience coworking intelligente.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900 selection:bg-blue-200 selection:text-slate-900">
        <SiteHeader />
        <main className="min-h-[calc(100vh-124px)]">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
