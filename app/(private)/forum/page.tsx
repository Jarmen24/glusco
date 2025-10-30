"use client";

import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconHeart, IconMessageCircle } from "@tabler/icons-react";
import Link from "next/link";
import { createPost, getAllCategories, getAllForums } from "@/hooks/forumHooks";
import { int, number, string } from "zod";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import client from "@/app/api/client";
import { useGetUser } from "@/hooks/userHooks";
import useAuth from "@/hooks/useAuth";
import { SyncLoader } from "react-spinners";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const { user, loading } = useAuth();
  const userDB = useGetUser();
  const { forums, loading: forumLoading } = getAllForums();
  const [category, setCategory] = useState("");
  const { categories } = getAllCategories();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    ///const formData = new FormData(e.target);
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");
    const categoryform = category;

    if (!title || !content || !categoryform) {
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create a post.");
      return;
    }
    if (!userDB || !userDB.id) {
      toast.error("User data not loaded yet. Please wait.");
      return;
    }

    const post = await createPost(
      title.toString(),
      content.toString(),
      categoryform.toString(),
      parseInt(userDB.id)
    );
    if (post) {
      toast.success("Post created successfully!");
      setIsDialogOpen(false); // ✅ Close modal
      window.location.reload();
    }
  };

  return (
    <>
      <SidebarInset>
        <SiteHeader title="Forum" />
        <div className="flex flex-1 flex-col">
          <div className="lg:px-5 px-2">
            <div className="lg:p-4 p-3">
              <div className="flex items-center justify-center mb-2 gap-2">
                <Input
                  type="text"
                  placeholder="Search"
                  className="text-sm sm:text-xs"
                ></Input>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer bg-primary text-white hover:bg-primary/80 hover:text-white"
                    >
                      <span className="hidden sm:inline">
                        Start New Discussion
                      </span>
                      <span className="inline sm:hidden">+</span>
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-[700px]">
                    <form onSubmit={submitPost}>
                      <DialogHeader>
                        <DialogTitle>Create Post</DialogTitle>
                        <DialogDescription>
                          Start a new discussion with the community.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4">
                        <div className="grid gap-3">
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            name="title"
                            placeholder="Your title here"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label>Category</Label>
                          <Select onValueChange={(value) => setCategory(value)}>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Choose category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories &&
                                categories.map((category) => {
                                  return (
                                    <SelectItem
                                      key={category.id}
                                      value={category.category}
                                    >
                                      {category.category}
                                    </SelectItem>
                                  );
                                })}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="content">Content</Label>
                          <textarea
                            id="content"
                            name="content"
                            className="outline border rounded-md p-2 focus:outline-none focus:ring-2 "
                            placeholder="Your content here"
                            rows={7}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="outline" className="cursor-pointer">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" className="cursor-pointer">
                          Save changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="w-full justify-start items-start flex flex-col bg-slate-200 rounded-md lg:p-6 p-3">
                <h1 className="font-bold lg:text-6xl md:text-3xl text-2xl text-primary">
                  Forum! 📰
                </h1>
                <p className="text-slate-600 pt-3">
                  Search trending topics and join the discussion.
                </p>
              </div>
              {forumLoading ? (
                // 🌀 Show loader when loading
                <div className="flex justify-center items-center py-20">
                  <SyncLoader color="#0B1956" size={12} />
                </div>
              ) : forums.length > 0 ? (
                // ✅ Forums loaded successfully
                <div className="flex gap-2 mt-2">
                  <div className="flex flex-col lg:w-3/4 w-full gap-2">
                    {forums.map((forum) => (
                      <Link href={`/forum/${forum.id}`} key={forum.id}>
                        <Card className="w-full hover:bg-slate-100 transition ease-in-out duration-300 px-3 py-3 pt-5 gap-2">
                          <CardHeader className="flex gap-4 items-start relative px-3 lg:px-6 pb-0">
                            <img
                              src={forum.users.profile_picture}
                              className="rounded-full size-15"
                            />
                            <div className="flex-auto min-w-0">
                              <CardTitle className="mb-2 flex flex-col gap-1 wrap-break-word">
                                <Badge className="bg-primary font-semibold lg:text-sm md:text-[12px] text-[10px]">
                                  {forum.category}
                                </Badge>
                                <span className="sm:line-clamp-2 text-base leading-tight sm:whitespace-normal sm:wrap-break-word font-semibold">
                                  {forum.title}
                                </span>
                                <span className="text-xs opacity-50">
                                  {forum.users.name}
                                </span>
                              </CardTitle>
                              <CardDescription className="lg:text-sm text-xs text-slate-600 wrap-break-word whitespace-pre-wrap">
                                <p className="line-clamp-2 wrap-break-word whitespace-pre-wrap">
                                  {forum.description}
                                </p>
                              </CardDescription>
                            </div>
                          </CardHeader>
                          <CardFooter className="flex justify-end gap-4 px-6 text-sm text-slate-500">
                            <div className="flex items-center">
                              <IconMessageCircle className="mr-1 text-primary size-5" />
                              <span>{forum.comments ?? 0}</span>
                            </div>
                            <div className="flex items-center">
                              <IconHeart className="mr-1 text-primary size-5" />
                              <span>{forum.likes ?? 0}</span>
                            </div>
                          </CardFooter>
                        </Card>
                      </Link>
                    ))}
                  </div>
                  <div className="lg:w-1/3 lg:block hidden">
                    <Card />
                  </div>
                </div>
              ) : (
                // ❌ No forums found
                <div className="flex justify-center items-center py-9">
                  <h1 className="font-bold text-lg text-slate-600 flex flex-col gap-3 justify-center items-center">
                    <img src="/noforum.svg" className="size-45" />
                    No forums found. Start posting today.
                  </h1>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
