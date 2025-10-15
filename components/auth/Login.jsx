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

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error("Unable to login. Please try again.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>Login to get started</CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleLogin}>
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
              <Label>Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder=""
              />
            </div>
            <Button type="submit" className="w-full cursor-pointer">
              Login
            </Button>
            <GoogleLoginButton />
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
