"use client";

import React, { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Montserrat } from "next/font/google";

interface PrivatePagesLayoutProps {
  children: React.ReactNode;
}
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-montserrat", // Use this CSS variable
});
const PrivatePagesLayout: React.FC<PrivatePagesLayoutProps> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // ✅ Check if sidebar should be hidden
  const hideSidebar =
    pathname?.startsWith("/multi-step-form") ||
    pathname?.startsWith("/ai-explanation") ||
    pathname?.startsWith("/prediction");

  useEffect(() => {
    if (!loading && !user) {
      router.push("/onboarding"); // redirect to login or homepage
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
      className={montserrat.className}
    >
      {/* ✅ Only show sidebar when not on multi-step form */}
      {!hideSidebar && <AppSidebar variant="inset" user={user} />}
      {children}
    </SidebarProvider>
  );
};

export default PrivatePagesLayout;
