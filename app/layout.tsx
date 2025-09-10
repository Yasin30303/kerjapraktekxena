import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import Header from "@/components/header"; // Import Header
import Footer from "@/components/footer"; // Import Footer

export const metadata: Metadata = {
  title: "XENA TEKNO",
  description: "Created with XENA",
  generator: "XENA TEKNO",
};

const InterFont = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${InterFont.className}`}>
        <body>
          <div className="min-h-screen bg-white flex flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
