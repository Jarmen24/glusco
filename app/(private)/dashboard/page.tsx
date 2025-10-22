"use client";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { IconArrowBigRightFilled, IconStethoscope } from "@tabler/icons-react";

import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function Page() {
  const percentage = 66;
  return (
    <>
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="px-5">
          <div className="@container/main flex justify-center w-full gap-2 lg:mt-10 md:mt-5 mt-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center justify-center gap-10 col-span-1">
                {/* Left side: fixed width for circular progress */}
                <div className="h-40 w-40">
                  <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    strokeWidth={15}
                    styles={buildStyles({
                      textSize: "20px",
                      textColor: "#0B1956",
                      pathColor: "#0B1956",
                    })}
                  />
                </div>

                {/* Right side: fills remaining space */}
                <div className="w-full">
                  <p className="lg:text-lg md:text-md">
                    Your current risk level:
                  </p>
                  <h1 className="font-bold text-4xl lg:text-5xl text-primary">
                    Medium Risk
                  </h1>
                  <Button className="mt-4 cursor-pointer">
                    <IconArrowBigRightFilled />
                    View my Prediction Summary
                  </Button>
                </div>
              </div>

              <div className="col-span-1 flex gap-3 grid grid-cols-2 md:grid-cols-4">
                <Card className="w-full bg-primary px-4 relative overflow-hidden rounded-2xl">
                  <div className="bg-purple-100 lg:p-3 p-2 rounded-full flex absolute lg:top-4 lg:right-4 top-2 right-2">
                    <IconStethoscope size={20} className="" />
                  </div>
                  <div className="justify-end flex flex-col gap-2 h-full">
                    <h1 className="text-slate-300 font-semibold text-sm lg:text-md">
                      Blood Pressure
                    </h1>
                    <h1 className="text-slate-100 font-bold text-3xl">
                      120/80
                    </h1>
                  </div>
                </Card>
                <Card className="w-full bg-primary px-4 relative overflow-hidden rounded-2xl">
                  <div className="bg-purple-100 lg:p-3 p-2 rounded-full flex absolute lg:top-4 lg:right-4 top-2 right-2">
                    <IconStethoscope size={20} className="" />
                  </div>
                  <div className="justify-end flex flex-col gap-2 h-full">
                    <h1 className="text-slate-300 font-semibold text-sm lg:text-md">
                      BMI
                    </h1>
                    <h1 className="text-slate-100 font-bold text-3xl">
                      120/80
                    </h1>
                  </div>
                </Card>
                <Card className="w-full bg-primary px-4 relative overflow-hidden rounded-2xl">
                  <div className="bg-purple-100 lg:p-3 p-2 rounded-full flex absolute lg:top-4 lg:right-4 top-2 right-2">
                    <IconStethoscope size={20} className="" />
                  </div>
                  <div className="justify-end flex flex-col gap-2 h-full">
                    <h1 className="text-slate-300 font-semibold text-sm lg:text-md">
                      Blood Pressure
                    </h1>
                    <h1 className="text-slate-100 font-bold text-3xl">
                      120/80
                    </h1>
                  </div>
                </Card>
                <Card className="w-full bg-primary px-4 relative overflow-hidden rounded-2xl">
                  <div className="bg-purple-100 lg:p-3 p-2 rounded-full flex absolute lg:top-4 lg:right-4 top-2 right-2">
                    <IconStethoscope size={20} className="" />
                  </div>
                  <div className="justify-end flex flex-col gap-2 h-full">
                    <h1 className="text-slate-300 font-semibold text-sm lg:text-md">
                      Blood Pressure
                    </h1>
                    <h1 className="text-slate-100 font-bold text-3xl">
                      120/80
                    </h1>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </>
  );
}
