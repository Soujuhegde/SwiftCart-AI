import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { DemoProvider } from "@/providers/DemoProvider";
import { CartProvider } from "@/providers/CartContext";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "SwiftCart AI",
  description: "AI Powered Shopping Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}
      >
        <DemoProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </DemoProvider>
      </body>
    </html>
  );
}
