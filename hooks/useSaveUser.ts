"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import client from "@/app/api/client";
import { toast } from "sonner";

export async function useSaveUser(
  email: string,
  name: string,
  username: string,
  profile_picture: string
) {
  if (!email) return null;

  const { data, error } = await client.from("users").upsert(
    {
      email,
      name,
      username,
      profile_picture,
    },
    { onConflict: "email" }
  );

  if (error) {
    toast.error("Error saving user to database");
    return null;
  }

  return data;
}
