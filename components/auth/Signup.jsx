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

const Signup = () => {
  const handleSignup = async (e) => {
    e.preventDefault();
    const email = e.target[0]?.value;
    const password = e.target[1]?.value;
    console.log(email, password);

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    const { data, error } = await client.auth.signUp({
      email,
      password,
    });

    if (data) {
      toast.success("Signup successful! Please login now.");
    }

    if (error) {
      toast.error("Unable to signup. Please try again.");
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
              <Input id="email" type="email" placeholder="example@gmail.com" />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input id="password" type="password" placeholder="" />
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;
