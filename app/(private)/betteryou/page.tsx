"use client";

import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import React, { useEffect, useState } from "react";

export default function Page() {
  return (
    <>
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            BETTER YOU
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
