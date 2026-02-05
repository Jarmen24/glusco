import { useEffect, useState } from "react";
import client from "@/app/api/client";
import { toast } from "sonner";

// --- Interfaces ---

export interface User {
  id: number;
  name: string;
  username: string;
  profile_picture: string;
}

export interface Forum_Likes {
  id: number;
  user: number;
}

export interface Comment {
  id: number;
  comment: string;
  created_at: string;
  user: User;
}

export interface Forum {
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

export interface Categories {
  id: number;
  category: string;
}

// --- Hooks ---

export function useAllForums() {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchForums = async () => {
    setLoading(true);
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
      `,
      )
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
    } else if (data) {
      setForums(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchForums();
  }, []);

  return { forums, loading, refetch: fetchForums };
}

export function useTrendingForums(limit = 5) {
  const [forums, setForums] = useState<Forum[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      const { data, error } = await client.from("forum").select(`
          *, 
          users (id, name, username, profile_picture), 
          comments (
            id,
            comment,
            created_at,
            user (id, name, username, profile_picture)
          ),
          forum_likes (id, user)
        `);

      if (error) {
        toast.error(error.message);
      } else if (data) {
        const sorted = data
          .sort(
            (a, b) =>
              (b.forum_likes?.length || 0) - (a.forum_likes?.length || 0),
          )
          .slice(0, limit);

        setForums(sorted);
      }
      setLoading(false);
    };

    fetchTrending();
  }, [limit]);

  return { forums, loading };
}

export function useGetForum(id: number) {
  const [forum, setForum] = useState<Forum | null>(null);
  const [loading, setLoading] = useState(true);

  const getForum = async () => {
    if (!id) return;
    setLoading(true);
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
      `,
      )
      .eq("id", id)
      .order("created_at", { foreignTable: "comments", ascending: false })
      .single();

    if (error) {
      toast.error(error.message);
    } else {
      setForum(data);
    }
    setLoading(false);
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
    forumID: number,
  ) => {
    setLoading(true);
    const { data, error } = await client
      .from("comments")
      .insert([{ comment, user: userID, forum: forumID }])
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
  userID: number | null,
) {
  const { data, error } = await client
    .from("forum")
    .insert([{ title, description: content, category, user: userID }])
    .select("id");

  if (error || !data) {
    toast.error("Error creating post");
    return null;
  }
  return data;
}

export function useAllCategories() {
  const [categories, setCategories] = useState<Categories[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data, error } = await client.from("category").select("*");
      if (error) {
        toast.error(error.message);
      } else {
        setCategories(data || []);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  return { categories, loading };
}

export function useLikePost() {
  const toggleLike = async (forumID: number, userID: string | number) => {
    try {
      const { data: existing } = await client
        .from("forum_likes")
        .select("id")
        .eq("forum", forumID)
        .eq("user", userID)
        .maybeSingle();

      if (existing) {
        await client
          .from("forum_likes")
          .delete()
          .eq("forum", forumID)
          .eq("user", userID);

        toast.success("Like removed");
        return { liked: false };
      } else {
        const { error } = await client
          .from("forum_likes")
          .insert([{ forum: forumID, user: userID }]);

        if (error) throw error;
        toast.success("Post liked!");
        return { liked: true };
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error liking post";

      toast.error(errorMessage);
    }
  };

  return { toggleLike };
}
