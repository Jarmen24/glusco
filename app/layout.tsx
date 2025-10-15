"use client";
import type { Metadata } from "next";
import "./globals.css";

import { AuthProvider } from "@/components/context/AuthProvider";

export const metadata: Metadata = {
  title: "Glusco",
  description: "Diabetes Prediction",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
