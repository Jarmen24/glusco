"use client";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { SidebarInset } from "@/components/ui/sidebar";
import { useUploadImage } from "@/hooks/profileHooks";
import { useGetUser } from "@/hooks/userHooks";
import Link from "next/link";
import React from "react";
import { SyncLoader } from "react-spinners";

const page = () => {
  const userDB = useGetUser();
  const { handleUpload, loading, url } = useUploadImage();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fileInput = form.querySelector(
      'input[name="profileImage"]'
    ) as HTMLInputElement;
    const file = fileInput.files?.[0];

    if (file) {
      const uniqueName = `${Date.now()}-${file.name}`;
      console.log(uniqueName);
      const renamedFile = new File([file], uniqueName, { type: file.type });
      console.log(renamedFile);
      const url = await handleUpload(renamedFile);

      console.log(url);
    }
  };
  return (
    <>
      <SidebarInset>
        <SiteHeader title="Profile" />
        <div className="flex flex-1 flex-col">
          <div className="lg:px-5 px-2">
            {!userDB ? (
              <div className="flex justify-center items-center py-20">
                <SyncLoader color="#0B1956" size={12} />
              </div>
            ) : (
              <div className="lg:p-4 p-3 flex flex-col items-center justify-center">
                <div className="w-full mt-5 lg:max-w-[900px]">
                  <form onSubmit={handleSubmit}>
                    <div className="flex w-full items-center justify-start gap-3 lg:mb-8 mb-6">
                      <img
                        src={userDB?.profile_picture}
                        alt="Profile Picture"
                        className="lg:size-32 size-20 rounded-full"
                      />
                      <div>
                        <h1 className="text-4xl font-bold">{userDB?.name}</h1>
                        <p className="text-gray-500">{userDB?.email}</p>
                        <p className="text-gray-500">@{userDB?.username}</p>
                        <div className="flex flex-col gap-3 mt-5">
                          <Label className="ml-2">Change Profile Picture</Label>
                          <Input
                            type="file"
                            accept="image/*"
                            name="profileImage"
                          />
                        </div>
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
                              disabled
                              className="lg:text-base text-sm"
                              value={userDB?.email || ""}
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
                              disabled
                              value={userDB?.username || ""}
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
                              disabled
                              value={userDB?.name || ""}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label>Password</Label>
                            <Link href="#">
                              <Button
                                className="lg:text-base text-sm font-normal cursor-pointer"
                                variant="outline"
                              >
                                Change Password
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </Card>
                    <div className="flex justify-end gap-2 mt-5">
                      <Button className="px-10" type="submit">
                        Save
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </>
  );
};

export default page;
