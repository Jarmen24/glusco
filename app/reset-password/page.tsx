"use client";

import React from "react";
import client from "@/app/api/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ResetPassword() {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);

  const handleReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // --- Validation Defense ---
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      setLoading(false);
      return;
    }
    // --------------------------

    const { error } = await client.auth.updateUser({
      password: password,
    });

    if (error) {
      toast.error(
        `You are not authorized to perform this action. Please log in again.`,
      );
      setLoading(false);
      return;
    }

    toast.success("Password updated!");

    // Signing out ensures the user logs back in with the fresh credentials
    await client.auth.signOut();
    router.push("/onboarding");
  };

  return (
    <form onSubmit={handleReset} className="max-w-md mx-auto mt-20 space-y-4">
      <Image
        src={"/glusco-logo.png"}
        alt={"glusco-logo"}
        width={150}
        height={50}
        className="object-cover mx-auto"
      />
      <h1 className="text-2xl font-bold mb-5">Reset Password</h1>

      <div className="space-y-2">
        <label className="text-sm font-medium">New Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Enter new password"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Confirm Password</label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Repeat new password"
          required
        />
      </div>

      <Button
        type="submit"
        className="w-full cursor-pointer"
        disabled={loading}
      >
        {loading ? "Updating..." : "Update Password"}
      </Button>
    </form>
  );
}
