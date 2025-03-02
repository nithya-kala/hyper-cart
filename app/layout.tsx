import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "@/app/globals.css";
import { cn } from "@/lib/utils";
import { MyFirebaseProvider } from "@/components/firebase-providers";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { NavBar } from "@/components/navbar/navbar";

const font = Work_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HyperCart",
  description: "Welcome to HyperCart Ecommerce Store",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={cn(font.className)}>
        <MyFirebaseProvider>
          <div className="flex flex-col min-h-screen animate-in fade-in">
            <NavBar />
            <div className="flex flex-col grow h-full">{children}</div>
            <div className="pt-[100px]"></div>
          </div>
          <Toaster />
        </MyFirebaseProvider>
      </body>
    </html>
  );
}
