import client from "@/app/api/client";
import { uploadImage } from "@/lib/posts";
import { useState } from "react";

export function useUploadImage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [url, setUrl] = useState<string | null>(null);
  async function handleUpload(image: File) {
    const { data, error } = await uploadImage(image);

    if (error) {
      setError(error);
    } else {
      // Optionally get the public URL
      const { data: publicData } = client.storage
        .from("images")
        .getPublicUrl(data.fullPath);

      setUrl(publicData.publicUrl);
      return publicData.publicUrl;
    }

    setLoading(false);
    return url;
  }

  return { handleUpload, loading, error, url };
}
