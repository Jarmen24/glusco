"use client";

import React, { useEffect, useState } from "react";
import client from "@/app/api/client";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SidebarInset } from "@/components/ui/sidebar";
import SplitText from "@/components/SplitText";
import {
  IconArrowRight,
  IconDropletFilled,
  IconDropletsFilled,
  IconScaleOutline,
  IconStethoscope,
} from "@tabler/icons-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useGetUser } from "@/hooks/userHooks";
import { useGetUserWithPrediction } from "@/hooks/profileHooks";
import { SyncLoader } from "react-spinners";
import Link from "next/link";
import { PredData } from "@/components/types/UserDB";
import { FormData } from "@/app/(private)/multi-step-form/page";

// Interface for form data

// Helper function to fetch latest form data
export async function getLatestUserFormData(id: number) {
  return await client
    .from("user_formdata")
    .select("*")
    .eq("user_id", id)
    .order("inserted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
}

export default function Page() {
  const userDB = useGetUser();
  const [predictionData, setPredictionData] = useState<PredData | null>(null);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [riskConfig, setRiskConfig] = useState({
    label: "Calculating...",
    color: "#0B1956",
  });

  const { fetchUserWithPrediction, loading: predictionLoading } =
    useGetUserWithPrediction();
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      // Only run if we have a valid user ID
      if (!userDB?.id) return;

      setIsLocalLoading(true);
      const userId = parseInt(userDB.id);

      try {
        const [predRes, formRes] = await Promise.all([
          fetchUserWithPrediction(userId),
          getLatestUserFormData(userId),
        ]);

        if (predRes?.data) {
          setPredictionData(predRes.data);
          const percent = Math.round(predRes.data.percent);
          if (percent < 30)
            setRiskConfig({ label: "Low Risk", color: "#22c55e" });
          else if (percent < 70)
            setRiskConfig({ label: "Moderate Risk", color: "#f59e0b" });
          else setRiskConfig({ label: "High Risk", color: "#ef4444" });
        }

        if (formRes?.data) {
          console.log(formRes);
          setFormData(formRes.data);
        }
      } catch (err) {
        console.error("Dashboard data load error:", err);
      } finally {
        setIsLocalLoading(false);
      }
    };

    loadAllData();
    // Dependency on userDB.id specifically to prevent infinite loops
  }, [userDB?.id]);

  // Combined loading state
  // Combined loading state
  if (isLocalLoading || predictionLoading || !userDB) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-white z-50">
        <SyncLoader color="#0B1956" size={15} margin={5} />
        <p className="mt-4 text-[#0B1956] font-bold animate-pulse uppercase tracking-widest text-xs">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  // Stat Card Component
  const StatCard = ({
    title,
    value,
    unit,
    icon: Icon,
    colorClass,
  }: {
    title: string;
    value: string | number | null | undefined;
    unit: string;
    icon: React.ElementType;
    colorClass: string;
  }) => (
    <Card className="bg-white border border-slate-100 rounded-[2rem] p-4 md:p-6 shadow-sm flex flex-col items-center text-center gap-2 active:scale-95 transition-transform">
      <div className={`p-3 md:p-4 rounded-2xl ${colorClass} bg-opacity-10`}>
        <Icon size={24} className={colorClass.replace("bg-", "text-")} />
      </div>
      <div>
        <p className="text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-widest leading-none mb-1">
          {title}
        </p>
        <h2 className="text-lg md:text-2xl font-black text-blue-950">
          {value ?? "--"}
          <span className="text-[10px] ml-0.5 text-slate-400 uppercase">
            {unit}
          </span>
        </h2>
      </div>
    </Card>
  );

  return (
    <SidebarInset className="bg-white">
      <SiteHeader title="Dashboard" />

      <div className="max-w-6xl mx-auto w-full px-4 py-6 md:p-10">
        <header className="mb-8 md:mb-12">
          <SplitText
            text={`Welcome, ${userDB.username}!`}
            className="text-3xl md:text-6xl font-black text-blue-950 tracking-tighter"
            delay={40}
            onLetterAnimationComplete={() => {}}
          />
          <div className="h-1 w-12 bg-blue-950 rounded-full mt-2" />
        </header>

        <div className="space-y-6 md:space-y-8">
          <Card className="bg-[#F8F9FA] border-none rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-12 flex flex-col lg:flex-row items-center gap-8 md:gap-12">
            <div className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 bg-white p-5 md:p-6 rounded-[2.5rem] md:rounded-[3rem] shadow-xl shadow-slate-200/50">
              <CircularProgressbar
                value={predictionData?.percent || 0}
                text={`${Math.round(predictionData?.percent || 0)}%`}
                strokeWidth={10}
                styles={buildStyles({
                  textSize: "16px",
                  textColor: "#0B1956",
                  pathColor: riskConfig.color,
                  trailColor: "#F1F5F9",
                  strokeLinecap: "round",
                })}
              />
            </div>

            <div className="flex-1 text-center lg:text-left space-y-4 md:space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-widest mx-auto lg:mx-0">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: riskConfig.color }}
                />
                Latest Analysis
              </div>

              <h1
                className="text-4xl md:text-7xl font-black tracking-tighter"
                style={{ color: riskConfig.color }}
              >
                {riskConfig.label}
              </h1>

              <p className="text-slate-500 font-medium text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Your health data indicates a{" "}
                <span className="text-blue-950 font-bold">
                  {riskConfig.label.toLowerCase()}
                </span>
                .
              </p>

              <Link href="/prediction" className="block w-full sm:w-fit">
                <Button className="w-full rounded-2xl px-8 py-6 md:py-8 bg-blue-950 text-white font-bold text-base md:text-lg gap-3 shadow-xl shadow-blue-950/20 active:scale-95">
                  View Full Report <IconArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </Card>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            <StatCard
              title="Blood Pressure"
              value={
                formData ? `${formData.systolic}/${formData.diastolic}` : "--"
              }
              unit="mmHg"
              icon={IconStethoscope}
              colorClass="bg-blue-500"
            />
            <StatCard
              title="Cholesterol"
              value={formData ? `${formData.cholesterol}` : "--"}
              unit="mg/dL"
              icon={IconScaleOutline}
              colorClass="bg-purple-500"
            />
            <StatCard
              title="HbA1C"
              value={formData?.hba1c}
              unit="%"
              icon={IconDropletFilled}
              colorClass="bg-rose-500"
            />
            <StatCard
              title="FBS Glucose"
              value={formData?.fbs}
              unit="mg/dL"
              icon={IconDropletsFilled}
              colorClass="bg-orange-500"
            />
          </div>
        </div>
      </div>
    </SidebarInset>
  );
}
