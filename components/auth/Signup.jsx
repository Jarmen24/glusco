import React, { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import client from "@/app/api/client";
import GoogleLoginButton from "./GoogleAuth";
import { useSaveUser } from "@/hooks/useSaveUser";

const profile_images = [
  "https://gvaujsnaspqbtqusdoio.supabase.co/storage/v1/object/public/avatars/01.png",
  "https://gvaujsnaspqbtqusdoio.supabase.co/storage/v1/object/public/avatars/02.png",
  "https://gvaujsnaspqbtqusdoio.supabase.co/storage/v1/object/public/avatars/03.png",
  "https://gvaujsnaspqbtqusdoio.supabase.co/storage/v1/object/public/avatars/04.png",
  "https://gvaujsnaspqbtqusdoio.supabase.co/storage/v1/object/public/avatars/05.png",
];

const Signup = () => {
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email").trim();
    const name = formData.get("name").trim();
    const password = formData.get("password").trim();
    const confirm_password = formData.get("confirm_password").trim();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    if (password != confirm_password) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      try {
        // 1️⃣ Check if email already exists
        const { data: emailExists, error: emailError } = await client
          .from("users")
          .select("id")
          .eq("email", email)
          .maybeSingle();

        if (emailError) throw emailError;
        if (emailExists) {
          toast.error("Email is already taken.");
          return;
        }
      } catch (error) {
        toast.error("Email is already taken.");
        return;
      }
      /**
      try {
        // 2️⃣ Check if username already exists
        const { data: usernameExists, error: usernameError } = await client
          .from("users")
          .select("id")
          .eq("username", username.toLowerCase())
          .maybeSingle();

        if (usernameError) throw usernameError;
        if (usernameExists) {
          toast.error("Username is already taken.");
          return;
        }
      } catch (error) {
        toast.error("Username already taken.");
        return;
      } */

      const { data: authData, error: authError } = await client.auth.signUp({
        email,
        password,
      });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      const save = useSaveUser({
        email: email,
        name: name,
        profile_picture: profile_images[Math.floor(Math.random() * 5)],
      });

      if (!save) {
        toast.error("Failed to sign up");
        return;
      }
      toast.success("RegistrationSuccessful");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create an account to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSignup}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@gmail.com"
              />
            </div>
            <div className="grid gap-2">
              <Label>Name</Label>
              <Input id="name" name="name" type="name" placeholder="John Doe" />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Sign Up
            </Button>
          </div>
        </form>
        {/* <GoogleLoginButton /> */}
      </CardContent>
    </Card>
  );
};

export default Signup;
