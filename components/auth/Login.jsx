import React from "react";
import { useRouter } from "next/navigation";
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
import { set } from "zod";
import { router } from "next/router";

const Login = () => {
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    const { data: authData, error: authError } =
      await client.auth.signInWithPassword({
        email,
        password,
      });

    if (authError) {
      toast.error(authError.message);
      return;
    }
    if (authData) {
      toast.success("Login successful");
      router.push("/dashboard");
      return;
    }
    setLoading(false);
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
            <Button
              type="submit"
              className="w-full cursor-pointer flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin h-4 w-4 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    磨d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
        {/* <GoogleLoginButton /> */}
      </CardContent>
    </Card>
  );
};

export default Login;
