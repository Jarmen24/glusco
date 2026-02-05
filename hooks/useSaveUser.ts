"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import client from "@/app/api/client";
import { toast } from "sonner";

export async function useSaveUser({
  email,
  name,
  profile_picture,
}: {
  email: string;
  name?: string;
  profile_picture?: string;
}) {
  if (!email) return null;

  const { data, error } = await client.from("users").upsert(
    {
      email,
      name,
      profile_picture,
    },
    { onConflict: "email" }
  );

  if (error) {
    toast.error(error.message);
    return null;
  }

  return data;
}
