"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";
import { SyncLoader } from "react-spinners";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      //router.push("/dashboard");
      return;
    }
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center h-screen px-5">
      {loading ? <SyncLoader color="#0B1956" /> : <h1>WELCOME TO GLUSCO!</h1>}
    </div>
  );
}
