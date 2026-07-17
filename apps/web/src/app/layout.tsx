import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { NavBar } from "@/components/NavBar";
import { Footer } from "@/components/Footer";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Halaal — On-chain certificate verification",
  description:
    "Tamper-proof Halaal certificates issued as Polygon NFTs. Verify any certificate by token ID or QR scan.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-paper font-sans text-ink antialiased">
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
