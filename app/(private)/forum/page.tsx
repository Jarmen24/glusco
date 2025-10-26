"use client";

import { SiteHeader } from "@/components/site-header";
import { Input } from "@/components/ui/input";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconMessageCircle } from "@tabler/icons-react";

export default function Page() {
  return (
    <>
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="px-5">
            <div className="lg:p-4 p-3">
              <div className="w-full justify-start items-start flex flex-col bg-slate-200 rounded-md p-6">
                <h1 className="font-bold lg:text-6xl md:text-3xl text-2xl text-primary">
                  Forum! 📰
                </h1>
                <p className="text-slate-600 pt-3">
                  Search trending topics and join the discussion.
                </p>
              </div>
              <div className="flex items-center justify-center mt-3 gap-2">
                <Input type="text" placeholder="Search"></Input>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="cursor-pointer bg-primary text-white hover:bg-primary/80 hover:text-white"
                    >
                      Start New Discussion
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Are you absolutely sure?</DialogTitle>
                      <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex gap-2 mt-2">
                <div className="flex-1 w-3/4">
                  <Card className="w-full h-32">
                    <CardHeader className="flex gap-4 items-center relative">
                      <img
                        src="https://placehold.co/70x70"
                        className="rounded-full"
                      ></img>
                      <div className="flex-auto">
                        <CardTitle className="mb-2">
                          Welcome to the Forum!
                        </CardTitle>
                        <CardDescription>
                          Guys, what are your recommended diet to prevent
                          diabetes?
                        </CardDescription>
                      </div>
                      <div className="flex-1 h-full items-end justify-end absolute right-5 bottom-1 flex ">
                        <IconMessageCircle className="mr-2 text-primary size-5" />
                        <p className="text-sm">20 likes</p>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
                <div className="lg:w-1/4 hidden">
                  <Card />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
