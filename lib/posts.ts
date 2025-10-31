import client from "@/app/api/client";

export async function uploadImage(image: File) {
  return await client.storage.from("avatars").upload(image.name, image);
}
