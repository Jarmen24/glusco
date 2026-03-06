"use client";

import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SidebarInset } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  IconHeart,
  IconMessageCircle,
  IconSearch,
  IconPlus,
  IconX,
} from "@tabler/icons-react";
import Link from "next/link";
import {
  createPost,
  useAllCategories,
  useAllForums,
  useTrendingForums,
} from "@/hooks/forumHooks";
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
import { useGetUser } from "@/hooks/userHooks";
import useAuth from "@/hooks/useAuth";
import { SyncLoader } from "react-spinners";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function Page() {
  const { user } = useAuth();
  const { userDB, loading: userLoading } = useGetUser();
  const { forums, loading: forumLoading } = useAllForums();
  const { categories } = useAllCategories();
  const { forums: trendingForums, loading: trendingLoading } =
    useTrendingForums(10);

  // States matching React Native logic
  const [activeTab, setActiveTab] = useState("Popular");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [categoryForm, setCategoryForm] = useState("");

  // --- FILTERING LOGIC ---
  const filteredPosts = useMemo(() => {
    if (!userDB?.id) return [];
    let posts = Array.isArray(forums) ? forums : [];

    if (activeTab === "My Posts") {
      posts = posts.filter(
        (post) => String(post.users?.id) === String(userDB?.id),
      );
    }

    if (selectedCategory !== "All") {
      posts = posts.filter((post) => post.category === selectedCategory);
    }

    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      posts = posts.filter(
        (post) =>
          post.title?.toLowerCase().includes(query) ||
          post.description?.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query),
      );
    }
    return posts;
  }, [forums, activeTab, selectedCategory, userDB, searchQuery]);

  const submitPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title");
    const content = formData.get("content");

    if (!title || !content || !categoryForm) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!userDB?.id) return [];
    const post = await createPost(
      title.toString(),
      content.toString(),
      categoryForm,
      parseInt(userDB.id),
    );

    if (post) {
      toast.success("Post created successfully!");
      setIsDialogOpen(false);
      window.location.reload();
    }
  };

  return (
    <SidebarInset className="bg-white">
      <SiteHeader title="Forum" />

      <div className="max-w-7xl mx-auto w-full px-4 py-4 space-y-6">
        {/* --- TOP SECTION (Search & Categories) --- */}
        <div className="space-y-4">
          <div className="flex items-center bg-[#F3F4F6] rounded-xl px-3 h-12 gap-2 w-full">
            <IconSearch size={20} className="text-[#A1A8B0]" />
            <input
              className="bg-transparent flex-1 outline-none text-sm placeholder-[#A1A8B0]"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <button onClick={() => setSearchQuery("")}>
                <IconX size={18} className="text-[#A1A8B0]" />
              </button>
            )}
          </div>

          <div className="flex gap-3">
            {["Popular", "My Posts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-full text-sm font-semibold transition cursor-pointer ${
                  activeTab === tab
                    ? "bg-[#0B1956] text-white"
                    : "bg-[#F3F4F6] text-[#666]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex overflow-x-auto pb-2 gap-2 no-scrollbar">
            {["All", ...(categories?.map((c) => c.category) || [])].map(
              (cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`whitespace-nowrap px-4 py-1.5 cursor-pointer rounded-lg text-xs font-medium border transition ${
                    selectedCategory === cat
                      ? "bg-[#EEF2FF] border-[#4338CA] text-[#4338CA] font-bold"
                      : "bg-white border-[#E5E7EB] text-[#6B7280]"
                  }`}
                >
                  {cat}
                </button>
              ),
            )}
          </div>
        </div>

        {/* --- MAIN CONTENT LAYOUT --- */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Feed */}
          <div className="flex-1 space-y-4">
            {forumLoading ? (
              <div className="flex justify-center py-20">
                <SyncLoader color="#0B1956" size={12} />
              </div>
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map((item) => (
                <Link href={`/forum/${item.id}`} key={item.id}>
                  <Card className="hover:bg-slate-50 transition cursor-pointer border-[#F3F4F6] shadow-sm rounded-2xl p-4 mb-4 gap-3">
                    <div className="flex items-center gap-3 mb-3">
                      <Image
                        src={
                          item.users?.profile_picture || "/default-avatar.png"
                        }
                        alt="User"
                        width={40}
                        height={40}
                        className="rounded-full object-cover w-10 h-10"
                      />
                      <div>
                        <p className="text-sm font-bold text-[#333]">
                          {item.users?.username}
                        </p>
                        <Badge className="bg-[#EEF2FF] text-[#4338CA] hover:bg-[#EEF2FF] text-[10px] uppercase font-extrabold px-2 py-0 border-none">
                          {item.category}
                        </Badge>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#0B1956] mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[#4B5563] line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <CardFooter className="flex justify-end p-0 mt-4 gap-4 text-[#666]">
                      <div className="flex items-center gap-1">
                        <IconHeart size={16} />
                        <span className="text-xs">
                          {item.forum_likes?.length || 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <IconMessageCircle size={16} />
                        <span className="text-xs">
                          {item.comments?.length || 0}
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center py-20 opacity-40">
                <Image
                  src="/noforum.svg"
                  alt="Empty"
                  width={180}
                  height={180}
                />
                <p className="mt-4 text-[#A1A8B0]">No posts found</p>
              </div>
            )}
          </div>

          {/* Right Column: Trending (Restored) */}
          <div className="hidden lg:block lg:w-[350px] space-y-4">
            <div className="bg-[#F3F4F6] p-4 rounded-xl">
              <h2 className="font-bold text-[#0B1956] text-lg">
                Trending Posts 📰
              </h2>
            </div>

            {trendingLoading ? (
              <div className="flex justify-center py-10">
                <SyncLoader color="#0B1956" size={8} />
              </div>
            ) : (
              trendingForums.map((forum) => (
                <Link href={`/forum/${forum.id}`} key={forum.id}>
                  <Card className="hover:bg-slate-50 transition border-[#F3F4F6] shadow-sm rounded-xl p-3 mb-3">
                    <div className="flex gap-3">
                      <Image
                        src={forum.users?.profile_picture}
                        alt="User"
                        width={32}
                        height={32}
                        className="rounded-full size-8 object-cover"
                      />
                      <div className="min-w-0 flex flex-col">
                        <Badge className="bg-[#EEF2FF] text-[#4338CA] text-[9px] font-bold px-1.5 py-0 mb-1 border-none uppercase">
                          {forum.category}
                        </Badge>
                        <h4 className="text-sm font-bold text-[#0B1956] line-clamp-2 leading-tight">
                          {forum.title}
                        </h4>
                        <h4 className="text-sm text-[#0B1956] line-clamp-2 leading-tight mt-3">
                          {forum.description}
                        </h4>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button className="fixed bottom-10 right-10 bg-[#0B1956] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-2 hover:scale-105 transition-transform z-50">
            <IconPlus size={20} />
            <span className="font-bold">New Post</span>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[600px] rounded-3xl">
          <form onSubmit={submitPost} className="space-y-4">
            <DialogHeader>
              <DialogTitle>Create Post</DialogTitle>
              <DialogDescription>
                Start a new discussion with the community.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Your title here"
                  className="rounded-xl"
                />
              </div>
              <div className="grid gap-2">
                <Label>Category</Label>
                <Select onValueChange={setCategoryForm}>
                  <SelectTrigger className="rounded-xl">
                    <SelectValue placeholder="Choose category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((c) => (
                      <SelectItem key={c.id} value={c.category}>
                        {c.category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <textarea
                  id="content"
                  name="content"
                  rows={5}
                  className="border rounded-xl p-3 outline-none focus:ring-2 focus:ring-primary/20 w-full"
                  placeholder="Your content here"
                />
              </div>
            </div>
            <DialogFooter className="gap-2">
              <DialogClose asChild>
                <Button variant="outline" className="rounded-full">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" className="bg-[#0B1956] rounded-full">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </SidebarInset>
  );
}
