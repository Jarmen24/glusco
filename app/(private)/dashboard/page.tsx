"use client";

import client from "@/app/api/client";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import SplitText from "@/components/SplitText";

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
import { useGetUser } from "@/hooks/userHooks";
import { useGetUserWithPrediction } from "@/hooks/profileHooks";
import { SyncLoader } from "react-spinners";

export default function Page() {
  const userDB = useGetUser();
  console.log(userDB);
  const user = useContext(AuthContext);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [riskLabel, setRiskLabel] = useState<string>("");
  const [color, setColor] = useState<string>("#0B1956"); // default color

  const { fetchUserWithPrediction, loading, error } = useGetUserWithPrediction(
    userDB ? parseInt(userDB.id) : 0
  );

  useEffect(() => {
    const syncUser = async () => {
      const {
        data: { user },
      } = await client.auth.getUser();
      if (!user) return;

      const { data: existingUser } = await client
        .from("users")
        .select("id")
        .eq("email", user.email)
        .maybeSingle();

      if (!existingUser) {
        await useSaveUser(
          user.user_metadata.email,
          user.user_metadata.full_name,
          user.user_metadata.email.split("@")[0],
          user.user_metadata.avatar_url
        );
      }
    };

    syncUser();
  }, []);
  const handleLoadPrediction = async () => {
    if (!userDB) return;

    const { data, error } = await fetchUserWithPrediction();
    if (error) return console.error(error);

    if (data && data.pred && data.pred.length > 0) {
      const percent = Math.round(data.pred[0].percent);
      setPrediction(percent);

      // Determine risk level and color
      if (percent < 30) {
        setRiskLabel("Low Risk");
        setColor("#4CAF50"); // green
      } else if (percent < 70) {
        setRiskLabel("Moderate Risk");
        setColor("#FF9800"); // orange
      } else {
        setRiskLabel("High Risk");
        setColor("#F44336"); // red
      }
    }
  };

  useEffect(() => {
    handleLoadPrediction();
  }, [userDB]);

  const handleAnimationComplete = () => {
    console.log("All letters have animated!");
  };
  return (
    <>
      <SidebarInset>
        <SiteHeader title="Dashboard" />
        <div className="px-5">
          <div className="lg:p-4 p-3">
            {userDB ? (
              <SplitText
                text={`Welcome back, ${userDB?.username}! 👋`}
                className="font-bold lg:text-4xl md:text-3xl text-2xl text-primary p-4 pl-0"
                delay={100}
                duration={0.6}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="start"
                onLetterAnimationComplete={handleAnimationComplete}
              />
            ) : null}

            <p className="text-slate-600 pt-3">
              Here’s your current health summary based on your latest analysis.
            </p>
          </div>
          <div className="@container/main flex justify-center w-full gap-2 lg:mt-4 md:mt-5 mt-3">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] items-center justify-center gap-10 col-span-1">
                {/* Left side: fixed width for circular progress */}
                <div className="h-40 w-40">
                  {loading || prediction === null ? (
                    <div className="flex items-center justify-center h-full">
                      <SyncLoader color={color} />
                    </div>
                  ) : (
                    <CircularProgressbar
                      value={prediction}
                      text={`${prediction}%`}
                      strokeWidth={15}
                      styles={buildStyles({
                        textSize: "20px",
                        textColor: color,
                        pathColor: color,
                        trailColor: "#E0E0E0",
                      })}
                    />
                  )}
                </div>

                {/* Right side: fills remaining space */}
                <div className="w-full">
                  <p className="lg:text-lg md:text-md">
                    Your current risk level:
                  </p>
                  <h1
                    className="font-bold text-4xl lg:text-5xl"
                    style={{ color: color }}
                  >
                    {riskLabel}
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
