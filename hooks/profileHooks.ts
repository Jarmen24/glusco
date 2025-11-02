import client from "@/app/api/client";
import { updateProfile, uploadImage } from "@/lib/posts";
import { useState } from "react";
import { toast } from "sonner";

export function useUploadImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [url, setUrl] = useState<string | null>(null);

  async function handleUpload(image: File) {
    const { data, error } = await uploadImage(image);

    console.log(data);
    if (error) {
      setError(error);
    } else {
      console.log(data);
      // Optionally get the public URL
      const { data: publicData } = client.storage
        .from("avatars")
        .getPublicUrl(data.path);

      setUrl(publicData.publicUrl);
      console.log(publicData.publicUrl);
      return publicData.publicUrl;
    }

    setLoading(false);
    return url;
  }

  return { handleUpload, loading, error, url };
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function handleUpdateProfile({
    name,
    username,
    email,
    profile_picture,
  }: {
    name: string;
    username: string;
    email: string;
    profile_picture?: string;
  }) {
    setLoading(true);
    setError(null);

    const updateData: any = { name, username, email };
    if (profile_picture) updateData.profile_picture = profile_picture;

    const { data, error } = await updateProfile(updateData);
    setLoading(false);

    if (error) {
      setError(error);
      toast.error("Failed to update profile");
      return null;
    }

    toast.success("Profile updated successfully");
    return data;
  }

  return { handleUpdateProfile, loading, error };
}
