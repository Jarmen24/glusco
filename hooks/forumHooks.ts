import React, { use, useEffect, useState } from "react";

import client from "@/app/api/client";
import { toast } from "sonner";
import { useGetUser } from "./userHooks";
interface Forums {
  id: number;
  title: string;
  description: string;
  likes: number;
  comment_count: number;
  user: number;
  category: string;
  created_at: string;
  forum_likes: Forum_Likes[];
  users: User;
  comments: Comment[];
}

interface Forum_Likes {
  id: number;
  user: number;
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
  forum_likes: Forum_Likes[];
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
        .select(
          `*, users (id, name, username, profile_picture), comments (
      id,
      comment,
      created_at,
      user (id, name, username, profile_picture)
    ),
    forum_likes (id, user)`
        )
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

export function useTrendingForums(limit = 5) {
  const [forums, setForums] = useState<Forums[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      // Supabase query: fetch forums + their related likes
      const { data, error } = await client.from("forum")
        .select(`*, users (id, name, username, profile_picture), comments (
      id,
      comment,
      created_at,
      user (id, name, username, profile_picture)
    ),
    forum_likes (id, user)`);

      if (error) {
        toast.error(error.message);
        setLoading(false);
        return;
      }

      if (data) {
        // Sort by number of likes (forum_likes.length)
        const sorted = data
          .sort(
            (a, b) =>
              (b.forum_likes?.length || 0) - (a.forum_likes?.length || 0)
          )
          .slice(0, limit); // limit to top N trending

        setForums(sorted);
        setLoading(false);
      }
    };

    fetchTrending();
  }, [limit]);

  return { forums, loading };
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
    ),
    forum_likes (id, user)
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
export function useLikePost() {
  const toggleLike = async (forumID: number, userID: string | number) => {
    try {
      // Check if user already liked this post
      const { data: existing } = await client
        .from("forum_likes")
        .select("id")
        .eq("forum", forumID)
        .eq("user", userID)
        .maybeSingle();

      if (existing) {
        // Unlike (delete)
        await client
          .from("forum_likes")
          .delete()
          .eq("forum", forumID)
          .eq("user", userID);

        toast.success("Like removed");
        return { liked: false };
      } else {
        // Like (insert)
        const { error } = await client.from("forum_likes").insert([
          {
            forum: forumID,
            user: userID,
          },
        ]);

        if (error) throw error;
        toast.success("Post liked!");
        return { liked: true };
      }
    } catch (err: any) {
      toast.error(err.message || "Error liking post");
      return null;
    }
  };

  return { toggleLike };
}
