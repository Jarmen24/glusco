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
      if (!loading) {
        if (user) {
          const { data: pred } = await getAllUserPredictionUsingUUID(user.id);
          console.log(pred);
          if (pred && pred.length > 0) {
            router.replace("/dashboard");
          } else {
            router.replace("/multi-step-form");
          }
          setPredLoading(false);
          return;
        } else {
          await client.auth.signOut(); // Clear the session
          router.replace("/onboarding");
          setPredLoading(false);
          return;
        }
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
