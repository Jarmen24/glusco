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
