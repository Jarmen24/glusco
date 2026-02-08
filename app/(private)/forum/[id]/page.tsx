"use client";

import { SiteHeader } from "@/components/site-header";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import TextareaAutosize from "react-textarea-autosize";
import { SidebarInset } from "@/components/ui/sidebar";
import { useGetForum, useLikePost, usePostComment } from "@/hooks/forumHooks";
import {
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import useAuth from "@/hooks/useAuth";
import { useGetUser } from "@/hooks/userHooks";
import { SyncLoader } from "react-spinners";

import { Button } from "@/components/ui/button";
import { set } from "zod";

export default function Page() {
  const { user, loading } = useAuth();
  const params = useParams();
  const id = parseInt(params.id as string);
  const { userDB, loading: userLoading } = useGetUser();
  const { forum, loading: forumLoading, refetch } = useGetForum(id);
  const { postComment, loading: posting } = usePostComment(); // ✅ use the hook
  const { toggleLike } = useLikePost();
  const [like, setLike] = React.useState<boolean | null>(false);
  React.useEffect(() => {
    if (forum && userDB) {
      const hasLiked = forum.forum_likes?.some(
        (like) => like.user?.toString() === userDB.id?.toString(),
      );
      setLike(!!hasLiked);
    }
  }, [forum, userDB]);

  const handleLike = async () => {
    if (!userDB || !forum) return;

    const userID = userDB.id; // uuid or bigint, depending on your schema
    const result = await toggleLike(forum.id, userDB.id);
    if (!result) {
      return;
    }
    setLike(result.liked);
    if (result) {
      await refetch(); // refresh the forum data to update like count & state
    }
  };

  const submitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const comment = formData.get("comment")?.toString().trim();

    // Convert userID and forumID to integers safely
    const userID = userDB ? parseInt(userDB.id.toString()) : null;
    const forumID = forum ? parseInt(forum.id.toString()) : null;
    console.log(userID, forumID);
    if (!comment) {
      toast.error("Please enter a comment.");
      return;
    }

    if (!userID || !forumID) {
      toast.error("Error creating comment. Try again.");
      return;
    }
    const result = await postComment(comment, userID, forumID);

    if (result) {
      toast.success("Comment created successfully!"); // clear textarea
      await refetch();
    }
  };

  return (
    <>
      <SidebarInset>
        <SiteHeader title="Forum" />
        <div className="lg:px-5 px-2">
          <div className="lg:p-4 p-3 lg:max-w-3/4 w-full">
            {forumLoading && (
              <div className="flex justify-center items-center py-20">
                <SyncLoader color="#0B1956" size={12} />
              </div>
            )}
            {forum && !forumLoading && (
              <div className="flex flex-col gap-4">
                {/* Forum content */}
                <div className="border-b-2 min-h-[200px] pb-5 flex flex-col">
                  <div className="flex gap-2 items-center">
                    <img
                      src={forum.users.profile_picture}
                      alt={forum?.title}
                      className="rounded-full size-15 shadow-lg"
                    />
                    <div className="flex flex-col">
                      <p className="text-lg font-semibold m-0">
                        {forum.users.name}
                      </p>
                      <p className="text-sm m-0">@{forum.users.username}</p>
                    </div>
                  </div>

                  <div className="lg:mt-8 mt-4 flex flex-col">
                    <Badge className="bg-primary font-semibold lg:text-sm md:text-[12px] text-[10px]">
                      {forum.category}
                    </Badge>
                    <h1 className="lg:text-2xl text-lg font-semibold wrap-break-word line-clamp break-all">
                      {forum?.title}
                    </h1>
                    <p className="line-clamp wrap-break-word break-all whitespace-pre-wrap mt-4">
                      {forum.description}
                    </p>
                  </div>

                  <div className="flex justify-between pt-5">
                    <div className="text-sm font-semibold text-primary">
                      {new Date(forum.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center">
                        <IconMessageCircle className="mr-1 text-primary size-5" />
                        <span>{forum.comments.length ?? 0}</span>
                      </div>
                      <div className="flex items-center">
                        <Button
                          variant="ghost"
                          onClick={handleLike}
                          className="cursor-pointer"
                        >
                          {like ? (
                            <IconHeartFilled className="mr-1 text-primary size-5" />
                          ) : (
                            <IconHeart className="mr-1 text-primary size-5" />
                          )}
                        </Button>
                        <span>{forum.forum_likes.length ?? 0}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Comment input */}
                <h3 className="text-lg font-semibold mb-3">Comment</h3>
                <div className="flex items-start gap-3">
                  <img
                    src={forum.users.profile_picture}
                    alt={forum?.title}
                    className="rounded-full size-10 shadow-lg"
                  />
                  <div className="w-full">
                    <div className="grid w-full lg:max-w-3/4 max-w-full gap-2">
                      <span className="flex items-start text-sm font-semibold">
                        {forum.users.name}
                      </span>
                      <form onSubmit={submitComment}>
                        <InputGroup className="w-full">
                          <TextareaAutosize
                            name="comment"
                            data-slot="input-group-control"
                            className="flex field-sizing-content min-h-16 w-full resize-none rounded-md bg-transparent px-3 py-2.5 text-base transition-[color,box-shadow] outline-none md:text-sm"
                            placeholder="Make a comment..."
                          />
                          <InputGroupAddon align="block-end">
                            <InputGroupButton
                              className="ml-auto"
                              size="sm"
                              variant="default"
                              type="submit"
                            >
                              Submit
                            </InputGroupButton>
                          </InputGroupAddon>
                        </InputGroup>
                      </form>
                      {forum &&
                        forum.comments.length > 0 &&
                        forum.comments.map((comment) => (
                          <div
                            className="flex items-start gap-3 border-b-2 py-3"
                            key={comment.id}
                          >
                            <img
                              src={comment.user.profile_picture}
                              alt={comment.user.name}
                              className="rounded-full size-10 shadow-lg"
                            />
                            <div className="w-full">
                              <div className="flex flex-col">
                                <p className="text-sm font-semibold m-0">
                                  {comment.user.name}
                                </p>
                                <p className="text-xs m-0">
                                  @{comment.user.username}
                                </p>
                              </div>
                              <div>
                                <p className="lg:text-sm text-xs m-0 line-clamp wrap-break-word break-all whitespace-pre-wrap mt-2">
                                  {comment.comment}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
