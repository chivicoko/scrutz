import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Scrutz | Campaign Manager",
  description: "Campaign management services at its possible best",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body className="relative flex">
        <Sidebar/>
        <main className="w-full lg:w-4/5 min-h-screen pb-16">
          <Navbar />
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
