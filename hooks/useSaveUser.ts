"use client";

import { useEffect } from "react";
import client from "@/app/api/client";

export function useSaveUser(user?: any, ...props: any) {
  useEffect(() => {
    const saveUserToDatabase = async () => {
      if (!user) return;

      const { username } = props;
      const { user_metadata } = user;

      const { avatar_url, email, full_name } = user_metadata;

      const { error } = await client.from("users").upsert(
        {
          email: email,
          name: full_name,
          profile_picture: avatar_url,
          username: username,
        },
        { onConflict: "username" }
      );

      if (error) console.error("Error saving user:", error);
      else console.log("✅ User saved to database:");
    };

    saveUserToDatabase();
  }, []);
}
