import { FormData } from "@/app/(private)/multi-step-form/page";
import client from "@/app/api/client";

export async function uploadImage(image: File) {
  return await client.storage.from("avatars").upload(image.name, image);
}

export async function updateProfile({
  name,
  username,
  email,
  profile_picture,
}: {
  name: string;
  username: string;
  email: string;
  profile_picture: string;
}) {
  return await client
    .from("users")
    .update({ name, username, email, profile_picture })
    .eq("email", email);
}

export async function updatePassword(password: string) {
  return await client.auth.updateUser({ password });
}

export async function updateUsername(username: string, email: string) {
  return await client.from("users").update({ username }).eq("email", email);
}

export async function saveFormData(formData: FormData) {
  return await client.from("forum").insert([formData]);
}

export async function updatePrediction(
  id: number,
  clinical: number,
  lifestyle: number,
  combined: number,
  percent: number,
) {
  return await client.from("pred").insert({
    user_id: id,
    clinical: clinical,
    lifestyle: lifestyle,
    combined: combined,
    percent: percent,
  });
}

export async function getUserWithPrediction(id: number) {
  console.log("Fetching latest prediction for user ID:", id);

  return await client
    .from("pred")
    .select("*")
    .eq("user_id", id)
    // Sort by created_at, descending (newest first)
    .order("created_at", { ascending: false })
    // Take the first one from that sorted list
    .limit(1)
    .maybeSingle();
}

export async function getAllUserPrediction(id: number) {
  console.log("Fetching latest prediction for user ID:", id);

  return await client
    .from("pred")
    .select("*")
    .eq("user_id", id)
    // Sort by created_at, descending (newest first)
    .order("created_at", { ascending: false });
}

export async function getUserFormData(id: number) {
  console.log("Fetching latest form_data for user ID:", id);

  return await client
    .from("user_formdata")
    .select("*")
    .eq("user_id", id)
    // Sort by created_at, descending (newest first)
    .order("created_at", { ascending: false })
    // Take the first one from that sorted list
    .limit(1)
    .maybeSingle();
}
export async function updateFormData(formData: FormData, id: number) {
  // 1. Remove username as you were doing
  const { username, ...rest } = formData;

  // 2. Convert values to floats ONLY if they aren't the exercise array
  const processedData = Object.fromEntries(
    Object.entries(rest).map(([key, value]) => {
      // If it's the exercise array, return it as-is without parsing
      if (key === "exercise_types") {
        return [key, Array.isArray(value) ? value : []];
      }

      // Safely convert other strings to numbers
      const num = parseFloat(value as string);
      return [key, isNaN(num) ? 0 : num];
    }),
  );

  console.log("Final data being sent to DB:", processedData);

  return await client
    .from("user_formdata")
    .insert([{ user_id: id, ...processedData }])
    .select();
}

export async function getLatestUserFormData(id: number) {
  console.log("Fetching latest form data for user ID:", id);

  return await client
    .from("user_formdata")
    .select("*")
    .eq("user_id", id)
    // Order by newest first
    .order("inserted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
}

export async function getCurrentUserAIReport(id: number) {
  return await client
    .from("ai_analysis")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
}
