import React from "react";
import { Inter } from "next/font/google";
import "../styles/global.css";
import Head from "next/head";
import Link from "next/link";
import Navigation from "@/components/navigation";

const inter = Inter({ subsets: ["latin"] });

const siteTitle = 'Quantimatica Blog'

export const metadata = {
  title: "qBlog - Quantimatica Blog",
  description: "Finding solutions for complex problems",
};

export default function RootLayout({ children }) {

    return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Sharing ideas and research"
        />
        <title>{siteTitle}</title>
      </Head>
      <body>
      <header>
        <Navigation />
      </header>
      <main className={inter.className} >{children}</main>
      </body>
    </html>
  );
}
