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

const Login = () => {
  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target[0]?.value;
    const password = e.target[1]?.value;
    console.log(email, password);

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    const { data, error } = await client.auth.signInWithPassword({
      email,
      password,
    });

    if (data) {
      toast.success("Login successful! Please login now.");
    }

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
              <Input id="email" type="email" placeholder="example@gmail.com" />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input id="password" type="password" placeholder="" />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
