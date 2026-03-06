"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Montserrat } from "next/font/google";
import { useGetUser } from "@/hooks/userHooks";
import { HealthDataProvider } from "@/components/context/DataContext";
import { Loader2 } from "lucide-react";

interface PrivatePagesLayoutProps {
  children: React.ReactNode;
}
const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4">
      <Loader2 className="h-12 w-12 text-[#0B1956] animate-spin" />
      <h3 className="text-xl font-bold text-gray-900">
        Processing Health Data
      </h3>
      <p className="text-gray-500 text-sm">{message}... Please wait.</p>
    </div>
  </div>
);

const PrivatePagesLayout: React.FC<PrivatePagesLayoutProps> = ({
  children,
}) => {
  const router = useRouter();
  const { userDB, loading } = useGetUser();

  useEffect(() => {
    if (!loading && !userDB) {
      router.push("/onboarding");
    }
  }, [loading, userDB, router]);

  if (loading) {
    return <LoadingOverlay message={"Checking user authentication..."} />;
  }

  if (!userDB) {
    return null;
  }

  return <HealthDataProvider userDB={userDB}>{children}</HealthDataProvider>;
};

export default PrivatePagesLayout;
