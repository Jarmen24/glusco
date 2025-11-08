import client from "@/app/api/client";
import {
  getUserWithPrediction,
  updateFormData,
  updatePassword,
  updatePrediction,
  updateProfile,
  updateUsername,
  uploadImage,
} from "@/lib/posts";
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

export function useUpdatePassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function handleUpdatePassword(password: string) {
    setLoading(true);
    setError(null);

    const { data, error } = await updatePassword(password);

    setLoading(false);

    if (error) {
      setError(error);
      toast.error("Failed to update password");
      return null;
    }

    toast.success("Password updated successfully");
    return data;
  }

  return { handleUpdatePassword, loading, error };
}

export function useUpdateUsername() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function handleUpdateUsername(username: string, email: string) {
    setLoading(true);
    setError(null);

    const { data, error } = await updateUsername(username, email);
    setLoading(false);

    return { data, error };
  }

  return { handleUpdateUsername, loading, error };
}

export function useUpdateFormData() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function handleUpdateUserForm(data: Object, id: number) {
    setLoading(true);
    setError(null);

    const { data: dataObject, error } = await updateFormData(data, id);
    setLoading(false);

    return { dataObject, error };
  }

  return { handleUpdateUserForm, loading, error };
}

export function useInsertPrediction() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  async function handleInsertPrediction(
    id: number,
    clinical: number,
    lifestyle: number,
    combined: number,
    percent: number
  ) {
    setLoading(true);
    setError(null);

    const { data: predData, error } = await updatePrediction(
      id,
      clinical,
      lifestyle,
      combined,
      percent
    );
    setLoading(false);

    return { predData, error };
  }

  return { handleInsertPrediction, loading, error };
}

export function useGetUserWithPrediction(id: number) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  const fetchUserWithPrediction = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await getUserWithPrediction(id);
      if (error) throw error;
      return { data, error: null };
    } catch (err) {
      setError(err);
      return { data: null, error: err };
    } finally {
      setLoading(false);
    }
  };

  return { fetchUserWithPrediction, loading, error };
}
