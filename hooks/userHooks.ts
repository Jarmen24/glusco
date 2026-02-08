"use client";
import { useEffect, useState } from "react";
import client from "@/app/api/client";
import { toast } from "sonner";
import { UserDB } from "@/components/types/UserDB";

export function useGetUser() {
  const [userDB, setUserDB] = useState<UserDB | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Get Supabase auth user
        const {
          data: { user },
          error: authError,
        } = await client.auth.getUser();

        if (authError || !user) {
          setLoading(false);
          return;
        }

        // Get matching user record from your database
        const { data, error } = await client
          .from("users")
          .select("*")
          .eq("email", user.email)
          .maybeSingle();

        if (error) {
          toast.error("Error fetching user from DB");
        } else {
          setUserDB(data);
        }
      } catch (err) {
        console.error(err);
        toast.error("Unexpected error fetching user");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { userDB, loading };
}
