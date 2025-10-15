"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";

export default function Home() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
      return null;
    }
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center px-5">
      {loading ? <h1>Loading..</h1> : <Auth />}
    </div>
  );
}
