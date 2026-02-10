"use client";

import * as React from "react";
import {
  IconCamera,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconHelp,
  IconInnerShadowTop,
  IconReport,
  IconSearch,
  IconSettings,
  IconChartBarPopular,
  IconMessages,
  IconApple,
  IconUser,
} from "@tabler/icons-react";

import { NavDocuments } from "@/components/nav-documents";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { User } from "@supabase/supabase-js";
import client from "@/app/api/client";
import { toast } from "sonner";
import { useGetUser } from "@/hooks/userHooks";
import { UserDB } from "./types/UserDB";

interface DBUser {
  id: string;
  email: string;
  username: string;
  name: string;
  profile_picture: string;
}

// Static nav data
const data = {
  navMain: [
    { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    { title: "Insights", url: "/insights", icon: IconChartBarPopular },
    { title: "Forum", url: "/forum", icon: IconMessages },
    { title: "Better You", url: "/betteryou", icon: IconApple },
  ],
  documents: [{ name: "View Profile", url: "/profile", icon: IconUser }],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: User | null; // ✅ accept user
  variant: any;
}

export function AppSidebar({ user, variant, ...props }: AppSidebarProps) {
  const { userDB, loading } = useGetUser();
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      {/* HEADER */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="size-5" />
                <span className="text-base font-semibold">Glusco</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* MAIN CONTENT */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
      </SidebarContent>

      {/* FOOTER — show user info here */}
      <SidebarFooter>
        <NavUser
          user={
            user
              ? {
                  name: userDB?.name || "User",
                  email: userDB?.email || "",
                  avatar: userDB?.profile_picture || "/default-avatar.png",
                }
              : { name: "Guest", email: "", avatar: "/default-avatar.png" }
          }
        />
      </SidebarFooter>
    </Sidebar>
  );
}
