import React from "react";
import "../styles/global.css";
import Navigation from "@/components/navigation";
import { Inter, Ubuntu_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ubuntuSans = Ubuntu_Sans({
  subsets: ["latin"],
  variable: "--font-ubuntu-sans",
  display: "swap",
});

export async function generateMetadata() {
  const isDev = process.env.NODE_ENV === "development";

  return {
    title: isDev ? "qBlog - Dev" : "qBlog - Quantimatica",
    description: "Insights and practical thinking on culture, capability, and how work actually gets done",
    icons: { icon: "/favicon.ico" },
  };
}
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${ubuntuSans.variable}`}>
      <body>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
