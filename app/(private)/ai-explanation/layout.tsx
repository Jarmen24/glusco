"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";

interface PrivatePagesLayoutProps {
  children: React.ReactNode;
}

const PrivatePagesLayout: React.FC<PrivatePagesLayoutProps> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) {
      router.push("/"); // redirect to login or homepage
    }
  }, [user, loading, router]);

  if (!user) return null;

  return <div className="w-full bg-primary py-6">{children}</div>;
};

export default PrivatePagesLayout;
