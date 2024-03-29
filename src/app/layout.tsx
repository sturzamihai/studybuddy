import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import twx from "@/utils/twx";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twx(inter.className, "bg-stone-100 dark:bg-stone-900 text-gray-950 dark:text-gray-50")}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
