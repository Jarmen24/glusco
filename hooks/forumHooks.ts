import React, { useEffect, useState } from "react";

import client from "@/app/api/client";
import { toast } from "sonner";
import { useGetUser } from "./userHooks";
interface Forums {
  id: number;
  title: string;
  description: string;
  likes: number;
  comments: number;
  user: number;
  users: {
    id: number;
    name: string;
    profile_picture: string;
  };
}

interface Forum {
  title: string;
  description: string;
  user: number;
  category?: string;
}

interface Categories {
  id: number;
  category: string;
}

export function getAllForums() {
  const [forums, setForums] = useState<Forums[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllForums = async () => {
      const { data, error } = await client
        .from("forum")
        .select("*, users (id, name, profile_picture)")
        .order("created_at", { ascending: false });

      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        setForums(data);
        setLoading(false);
      }
    };
    getAllForums();
  }, []);

  return { forums, loading, refetch: getAllForums };
}

export async function createPost(
  title: string,
  content: string,
  category: string,
  userID: number | null
) {
  const { data, error } = await client
    .from("forum")
    .insert([
      {
        title,
        description: content,
        category,
        user: userID,
      },
    ])
    .select("id");

  if (error || !data) {
    toast.error("Error creating post");
    return null;
  }

  return data;
}

export function getAllCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);

  useEffect(() => {
    const getAllCategories = async () => {
      const { data, error } = await client.from("category").select("*");
      if (error) {
        toast.error(error.message);
      } else {
        setCategories(data || []);
      }
    };
    getAllCategories();
  }, []);

  return { categories };
}
