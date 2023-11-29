import type { Metadata } from "next";
import { Inter } from "next/font/google";
import QueryProvider from "@/components/QueryProvider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Academic Assist",
  description: "Get help with all your academic probelms, Academic Assist is the solution to all your problem for managing your courses, planning them to registering your courses. Academic Assist is your way to success.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
