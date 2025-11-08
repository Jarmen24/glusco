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
  percent: number
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
  return await client
    .from("users")
    .select(
      `
            *,
            pred(*)
          `
    )
    .eq("id", id)
    .maybeSingle();
}

export async function updateFormData(
  formData: Record<string, any>,
  id: number
) {
  // remove username
  const { username, ...rest } = formData;

  // safely convert all values to floats
  const floatData = Object.fromEntries(
    Object.entries(rest).map(([key, value]) => {
      const num = parseFloat(value as string);
      return [key, isNaN(num) ? 0 : num];
    })
  );
  console.log(floatData);
  console.log(id);

  return await client
    .from("user_formdata")
    .upsert([{ user_id: id, ...floatData }])
    .select();
}
