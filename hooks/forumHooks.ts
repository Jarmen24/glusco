import React, { use, useEffect, useState } from "react";

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
  category: string;
  created_at: string;
  users: {
    id: number;
    name: string;
    username: string;
    profile_picture: string;
  };
}

interface User {
  id: number;
  name: string;
  username: string;
  profile_picture: string;
}

interface Forum {
  id: number;
  title: string;
  description: string;
  likes: number;
  comment_count: number;
  user: number;
  category: string;
  created_at: string;
  users: User;
  comments: Comment[];
}

interface Categories {
  id: number;
  category: string;
}

interface Comment {
  id: number;
  comment: string;
  created_at: string;
  user: User;
}

export function getAllForums() {
  const [forums, setForums] = useState<Forums[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllForums = async () => {
      const { data, error } = await client
        .from("forum")
        .select("*, users (id, name, username, profile_picture)")
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

export function useGetForum(id: number) {
  const [forum, setForum] = useState<Forum | null>(null);
  const [loading, setLoading] = useState(true);

  const getForum = async () => {
    const { data, error } = await client
      .from("forum")
      .select(
        `
    *,
    users (id, name, username, profile_picture),
    comments (
      id,
      comment,
      created_at,
      user (id, name, username, profile_picture)
    )
    `
      )
      .eq("id", id)
      .order("created_at", { foreignTable: "comments", ascending: false }) // 👈 newest comments first
      .single();

    if (error) {
      toast.error(error.message);
      return;
    }

    if (data) {
      setForum(data);
      setLoading(false);
    }
  };
  useEffect(() => {
    getForum();
  }, [id]);

  return { forum, loading, refetch: getForum };
}
export function usePostComment() {
  const [loading, setLoading] = useState(false);

  const postComment = async (
    comment: string,
    userID: number | null,
    forumID: number
  ) => {
    setLoading(true);

    const { data, error } = await client
      .from("comments")
      .insert([
        {
          comment,
          user: userID,
          forum: forumID,
        },
      ])
      .select("id");

    setLoading(false);

    if (error || !data) {
      toast.error("Error creating comment. Try again.");
      return null;
    }

    return data;
  };

  return { postComment, loading };
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

export function useGetComments() {}
