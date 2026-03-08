"use client";
import { useHealthData } from "@/components/context/DataContext";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  useUpdatePassword,
  useUpdateProfile,
  useUploadImage,
} from "@/hooks/profileHooks";
import { useGetUser } from "@/hooks/userHooks";
import Link from "next/link";
import React from "react";
import { SyncLoader } from "react-spinners";
import { toast } from "sonner";

const Profile = () => {
  const { userDB, isDataLoading } = useHealthData();
  const { handleUpload, loading, url } = useUploadImage();
  const {
    handleUpdateProfile,
    loading: updateLoading,
    error,
  } = useUpdateProfile();
  const {
    handleUpdatePassword,
    loading: passwordLoading,
    error: passwordError,
  } = useUpdatePassword();

  const [editing, setEditing] = React.useState(false);

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleUpdatePasswordForm = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    const new_password = e.currentTarget.new_password.value;
    const confirm_password = e.currentTarget.confirm_password.value;

    if (!new_password || !confirm_password) {
      toast.error("Please enter a new password and confirm it.");
      return;
    }

    if (new_password !== confirm_password) {
      toast.error("Passwords do not match.");
      return;
    }

    const data = await handleUpdatePassword(new_password);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    const form = e.currentTarget;
    const fileInput = form.querySelector(
      'input[name="profileImage"]',
    ) as HTMLInputElement;
    const formData = new FormData(form);
    const file = fileInput.files?.[0];
    const name = formData.get("name") as string;
    const username = formData.get("username") as string;
    const email = formData.get("email") as string;
    let profilePicture = userDB?.profile_picture || "";
    if (file) {
      const uniqueName = `${Date.now()}-${file.name}`;
      const renamedFile = new File([file], uniqueName, { type: file.type });

      const url = await handleUpload(renamedFile);

      if (!url) {
        toast.error("Error uploading image");
        return;
      }
      console.log(url);
      profilePicture = url;
    }

    const data = await handleUpdateProfile({
      name,
      username,
      email,
      profile_picture: profilePicture,
    });

    if (!updateLoading) {
      if (error) {
        toast.error(error.message);
        return;
      }

      if (data) {
        toast.success("Profile updated successfully");
      }
      handleEdit();
    }
  };

  return (
    <>
      <SidebarInset>
        <SiteHeader title="Profile" />
        <div className="flex flex-1 flex-col">
          <div className="lg:px-5 px-2">
            <div className="lg:p-4 p-3 flex flex-col items-center justify-center">
              <div className="w-full mt-5 lg:max-w-[900px]">
                <form onSubmit={handleSubmit}>
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col lg:flex-row w-full items-start justify-start gap-3 lg:mb-8 mb-6">
                      <img
                        src={userDB?.profile_picture}
                        alt="Profile Picture"
                        className="lg:size-32 size-30 rounded-full"
                      />
                      <div>
                        <h1 className="text-4xl font-bold">{userDB?.name}</h1>
                        <p className="text-gray-500">{userDB?.email}</p>
                        <p className="text-gray-500">@{userDB?.username}</p>
                        {editing && (
                          <div className="flex flex-col gap-3 mt-5">
                            <Label className="ml-2">
                              Change Profile Picture
                            </Label>
                            <Input
                              type="file"
                              accept="image/*"
                              name="profileImage"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <div>
                      <Button
                        onClick={handleEdit}
                        type="button"
                        className="cursor-pointer"
                      >
                        {editing ? "Cancel" : "Edit"}
                      </Button>
                    </div>
                  </div>
                  <Card className="p-4 space-y-2">
                    {/* Section title */}
                    <Label className="text-lg font-semibold">
                      Basic Information
                    </Label>

                    {/* Two-column layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                      {/* Left side */}
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label>Email</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="example@gmail.com"
                            className="lg:text-base text-sm"
                            defaultValue={userDB?.email || ""}
                            disabled={!editing}
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Username</Label>
                          <Input
                            id="username"
                            name="username"
                            type="text"
                            placeholder="username"
                            className="lg:text-base text-sm"
                            disabled={!editing}
                            defaultValue={userDB?.username || ""}
                          />
                        </div>
                      </div>

                      {/* Right side */}
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <Label>Name</Label>
                          <Input
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Your Name"
                            className="lg:text-base text-sm"
                            disabled={!editing}
                            defaultValue={userDB?.name || ""}
                          />
                        </div>

                        <div className="grid gap-2">
                          <Label>Password</Label>
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                className="cursor-pointer outline"
                              >
                                Change Password
                              </Button>
                            </DialogTrigger>

                            <DialogContent className="sm:max-w-[700px]">
                              <form onSubmit={handleUpdatePasswordForm}>
                                <DialogHeader>
                                  <DialogTitle>Change Password</DialogTitle>
                                  <DialogDescription>
                                    Make sure you remember it this time.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 my-4">
                                  <div className="grid gap-3">
                                    <Label htmlFor="title">New Password</Label>
                                    <Input
                                      id="new_password"
                                      name="new_password"
                                      placeholder="Enter your new password here"
                                      type="password"
                                    />
                                  </div>
                                  <div className="grid gap-3">
                                    <Label htmlFor="title">
                                      Confirm Password
                                    </Label>
                                    <Input
                                      id="confirm_password"
                                      name="confirm_password"
                                      placeholder="Confirm your new password here"
                                      type="password"
                                    />
                                  </div>
                                </div>
                                <DialogFooter>
                                  <DialogClose asChild>
                                    <Button
                                      variant="outline"
                                      className="cursor-pointer"
                                    >
                                      Cancel
                                    </Button>
                                  </DialogClose>
                                  <Button
                                    type="submit"
                                    className="cursor-pointer"
                                  >
                                    Save changes
                                  </Button>
                                </DialogFooter>
                              </form>
                            </DialogContent>
                          </Dialog>
                        </div>
                      </div>
                    </div>
                  </Card>
                  {editing && (
                    <div className="flex justify-end gap-2 mt-5">
                      <Button
                        className="px-10 cursor-pointer"
                        type="submit"
                        disabled={updateLoading}
                      >
                        {updateLoading ? "Saving..." : "Save"}
                      </Button>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
};

export default Profile;
