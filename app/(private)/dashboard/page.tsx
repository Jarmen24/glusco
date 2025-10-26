"use client";

import client from "@/app/api/client";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  IconArrowBigRightFilled,
  IconDropletFilled,
  IconDropletsFilled,
  IconScaleOutline,
  IconStethoscope,
} from "@tabler/icons-react";

import React, { useContext, useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { User } from "@supabase/supabase-js";
import { useSaveUser } from "@/hooks/useSaveUser";
import useAuth from "@/hooks/useAuth";
import { AuthContext } from "@/components/context/AuthProvider";

export default function Page() {
  const user = useContext(AuthContext);
  console.log(user);
  const [prediction, setPrediction] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrediction = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            Age: 21,
            Gender: 2,
            Height_cm: 160,
            Weight_kg: 50,
            Waist_cm: 100,
            Hip_cm: 83,
            Systolic_BP: 120,
            Diastolic_BP: 80,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        setPrediction(result.probability);
      } catch (error) {
        console.error("Error fetching prediction:", error);
        setPrediction("Error fetching prediction");
      }
    };

    fetchPrediction();
  }, []);
  const percentage = prediction ? parseFloat(prediction) * 100 : 0;

  return (
    <>
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="px-5">
          <div className="lg:p-4 p-3">
            <h1 className="font-bold lg:text-6xl md:text-3xl text-2xl text-primary">
              Welcome back, Jarmen! 👋
            </h1>
            <p className="text-slate-600 pt-3">
              Here’s your current health summary based on your latest analysis.
            </p>
          </div>
          <div className="@container/main flex justify-center w-full gap-2 lg:mt-4 md:mt-5 mt-3">
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

              <div className="col-span-1 gap-3 grid grid-cols-2 md:grid-cols-4">
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
                    <IconScaleOutline size={20} className="" />
                  </div>
                  <div className="justify-end flex flex-col gap-2 h-full">
                    <h1 className="text-slate-300 font-semibold text-sm lg:text-md">
                      BMI
                    </h1>
                    <h1 className="text-slate-100 font-bold text-3xl">120</h1>
                  </div>
                </Card>
                <Card className="w-full bg-primary px-4 relative overflow-hidden rounded-2xl">
                  <div className="bg-purple-100 lg:p-3 p-2 rounded-full flex absolute lg:top-4 lg:right-4 top-2 right-2">
                    <IconDropletFilled size={20} />
                  </div>
                  <div className="justify-end flex flex-col gap-2 h-full">
                    <h1 className="text-slate-300 font-semibold text-sm lg:text-md">
                      HbA1C
                    </h1>
                    <h1 className="text-slate-100 font-bold text-3xl">18</h1>
                  </div>
                </Card>
                <Card className="w-full bg-primary px-4 relative overflow-hidden rounded-2xl">
                  <div className="bg-purple-100 lg:p-3 p-2 rounded-full flex absolute lg:top-4 lg:right-4 top-2 right-2">
                    <IconDropletsFilled size={20} className="" />
                  </div>
                  <div className="justify-end flex flex-col gap-2 h-full">
                    <h1 className="text-slate-300 font-semibold text-sm lg:text-md">
                      FBS
                    </h1>
                    <h1 className="text-slate-100 font-bold text-3xl">
                      169.80
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
