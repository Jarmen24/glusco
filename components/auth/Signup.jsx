import React from "react";
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

const Signup = () => {
  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email").trim();
    const username = formData.get("username").trim();
    const name = formData.get("name").trim();
    const password = formData.get("password").trim();
    const confirm_password = formData.get("confirm_password").trim();
    console.log(username.toLowerCase());
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
      }

      const { data: authData, error: authError } = await client.auth.signUp({
        email,
        password,
      });

      if (authError) {
        toast.error(authError.message);
        return;
      }

      // ✅ only insert if login succeeded
      const { data: insertData, error: insertError } = await client
        .from("users")
        .upsert(
          {
            email,
            username,
            name,
            profile_picture: "sdasdasd",
          },
          { onConflict: "email" } // prevents duplicates if user already exists
        );

      if (insertError) {
        toast.error(insertError.message);
        return;
      } else {
        toast.success("Login Successful");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during signup.");
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
              <Label>Username</Label>
              <Input
                id="username"
                name="username"
                type="username"
                placeholder="yourusername"
              />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="********"
              />
            </div>
            <div className="grid gap-2">
              <Label>Confirm Password</Label>
              <Input
                id="confirm_password"
                name="confirm_password"
                type="password"
                placeholder="********"
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Sign Up
            </Button>
          </div>
        </form>
        <GoogleLoginButton />
      </CardContent>
    </Card>
  );
};

export default Signup;
