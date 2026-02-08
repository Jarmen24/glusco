"use client";

import useAuth from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Auth from "@/components/auth/Auth";
import {
  getAllUserPrediction,
  getAllUserPredictionUsingUUID,
} from "@/lib/posts";
import client from "../api/client";

export default function Home() {
  const { user, loading } = useAuth();
  const [predLoading, setPredLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      setPredLoading(true);

      // 1. Logic for Authenticated Users
      if (!loading && user) {
        const { data: pred } = await getAllUserPredictionUsingUUID(user.id);

        if (!pred || pred.length === 0) {
          router.replace("/multi-step-form");
        } else {
          router.replace("/dashboard");
        }
        setPredLoading(false);
        return;
      }

      // 2. Logic for Unauthenticated Users (Logout)
      if (!loading && !user) {
        await client.auth.signOut(); // Clear the session
        router.replace("/onboarding");
        setPredLoading(false);
        return;
      }
    };

    checkUser();
  }, [user, loading]);

  return (
    <div className="flex items-center justify-center h-screen px-5">
      {predLoading ? <h1>Loading..</h1> : <Auth />}
    </div>
  );
}
