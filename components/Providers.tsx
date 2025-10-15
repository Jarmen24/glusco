// components/Providers.tsx
"use client";
import React from "react";
import { Toaster } from "@/components/ui/sonner";
import { AuthProvider } from "@/components/context/AuthProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <Toaster />
    </AuthProvider>
  );
}
export default Providers;
