"use client";

import React from "react";
import client from "@/app/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;

    const { error } = await client.auth.updateUser({
      password: password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    toast.success("Password updated!");
    router.push("/login");
  };

  return (
    <form onSubmit={handleReset} className="max-w-md mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-5">Reset Password</h1>

      <Input
        type="password"
        name="password"
        placeholder="New Password"
        required
      />

      <Button className="mt-4 w-full" disabled={loading}>
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
