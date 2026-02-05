import client from "@/app/api/client";
import {
  getAllUserPrediction,
  getCurrentUserAIReport,
  getLatestUserFormData,
  getUserFormData,
  getUserWithPrediction,
  updateFormData,
  updatePassword,
  updatePrediction,
  updateProfile,
  updateUsername,
  uploadImage,
} from "@/lib/posts";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { FormData } from "@/app/(private)/multi-step-form/page";
import { AIReport } from "@/components/types/GeminiTypes";

// --- TYPES ---
export interface ProfileUpdateData {
  name: string;
  username: string;
  email: string;
  profile_picture: string;
}

export interface PredictionData {
  id: number;
  clinical: number;
  lifestyle: number;
  combined: number;
  percent: number;
}

// Standardizing the Error type
export interface ApiError {
  message: string;
  details?: string;
  hint?: string;
  code?: string;
}

// --- HOOKS ---

export function useUploadImage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  async function handleUpload(image: File): Promise<string | null> {
    setLoading(true);
    setError(null);

    const { data, error: uploadError } = await uploadImage(image);

    if (uploadError) {
      setError(uploadError as ApiError);
      setLoading(false);
      return null;
    }

    if (data) {
      const { data: publicData } = client.storage
        .from("avatars")
        .getPublicUrl(data.path);

      setUrl(publicData.publicUrl);
      setLoading(false);
      return publicData.publicUrl;
    }

    setLoading(false);
    return null;
  }

  return { handleUpload, loading, error, url };
}

export function useUpdateProfile() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleUpdateProfile(updateData: ProfileUpdateData) {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await updateProfile(updateData);
    setLoading(false);

    if (apiError) {
      setError(apiError as ApiError);
      toast.error("Failed to update profile");
      return null;
    }

    toast.success("Profile updated successfully");
    return data;
  }

  return { handleUpdateProfile, loading, error };
}

export function useUpdatePassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleUpdatePassword(password: string) {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await updatePassword(password);
    setLoading(false);

    if (apiError) {
      setError(apiError as ApiError);
      toast.error("Failed to update password");
      return null;
    }

    toast.success("Password updated successfully");
    return data;
  }

  return { handleUpdatePassword, loading, error };
}

export function useUpdateUsername() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleUpdateUsername(username: string, email: string) {
    setLoading(true);
    setError(null);

    const { data, error: apiError } = await updateUsername(username, email);
    setLoading(false);

    return { data, error: apiError as ApiError | null };
  }

  return { handleUpdateUsername, loading, error };
}

export function useUpdateFormData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleUpdateUserForm(formData: FormData, id: number) {
    setLoading(true);
    setError(null);
    console.log(formData);
    const { data: dataObject, error: apiError } = await updateFormData(
      formData,
      id,
    );
    console.log(dataObject);
    console.log(apiError);
    setLoading(false);

    return { dataObject, error: apiError as ApiError | null };
  }

  return { handleUpdateUserForm, loading, error };
}

export function useInsertPrediction() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  async function handleInsertPrediction(
    id: number,
    clinical: number,
    lifestyle: number,
    combined: number,
    percent: number,
  ) {
    setLoading(true);
    setError(null);

    const { data: predData, error: apiError } = await updatePrediction(
      id,
      clinical,
      lifestyle,
      combined,
      percent,
    );
    setLoading(false);

    return { predData, error: apiError as ApiError | null };
  }

  return { handleInsertPrediction, loading, error };
}

export function useGetUserWithPrediction() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUserWithPrediction = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await getUserWithPrediction(id);
      if (apiError) {
        console.log(apiError);
      }
      return { data, error: null };
    } catch (err) {
      // Cast the error or use a fallback message
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";

      const formattedError: ApiError = {
        message: errorMessage,
      };

      setError(formattedError);
      return { data: null, error: formattedError };
    } finally {
      setLoading(false);
    }
  };

  return { fetchUserWithPrediction, loading, error };
}

export function useGetAllUserPrediction() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUserAllPrediction = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await getAllUserPrediction(id);
      if (apiError) {
        console.log(apiError);
      }
      return { data, error: null };
    } catch (err) {
      // Cast the error or use a fallback message
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";

      const formattedError: ApiError = {
        message: errorMessage,
      };

      setError(formattedError);
      return { data: null, error: formattedError };
    } finally {
      setLoading(false);
    }
  };

  return { fetchUserAllPrediction, loading, error };
}

export function useGetUserFormData() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchUserFormData = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await getLatestUserFormData(id);
      if (apiError) {
        console.log(apiError);
      }
      return { data, error: null };
    } catch (err) {
      // Cast the error or use a fallback message
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";

      const formattedError: ApiError = {
        message: errorMessage,
      };

      setError(formattedError);
      return { data: null, error: formattedError };
    } finally {
      setLoading(false);
    }
  };

  return { fetchUserFormData, loading, error };
}

export function useUserAnalysis() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ApiError | null>(null);

  const fetchAnalysis = async (id: number) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: apiError } = await getCurrentUserAIReport(id);
      if (apiError) {
        console.log(apiError);
      }
      return { data, error: null };
    } catch (err) {
      // Cast the error or use a fallback message
      const errorMessage =
        err instanceof Error ? err.message : "An unknown error occurred";

      const formattedError: ApiError = {
        message: errorMessage,
      };

      setError(formattedError);
      return { data: null, error: formattedError };
    } finally {
      setLoading(false);
    }
  };

  return { fetchAnalysis, loading, error };
}
