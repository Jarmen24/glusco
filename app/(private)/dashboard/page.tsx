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
  IconSparkles,
  IconCalendarEvent,
} from "@tabler/icons-react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { DayPicker, ModifiersStyles } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useGetUser } from "@/hooks/userHooks";
import { useGetUserWithPrediction } from "@/hooks/profileHooks";
import { SyncLoader } from "react-spinners";
import Link from "next/link";
import { PredData } from "@/components/types/UserDB";
import { FormData } from "@/app/(private)/multi-step-form/page";
import Image from "next/image";

interface StatCardProps {
  title: string;
  value: string | number | null | undefined;
  unit: string;
  icon: React.ElementType;
  iconColor: string;
  bgColor: string;
}

async function getPredictionHistory(id: number) {
  return await client
    .from("pred")
    .select("*")
    .eq("user_id", id)
    .order("created_at", { ascending: false });
}

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
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());

  const [historyDays, setHistoryDays] = useState<{
    low: Date[];
    moderate: Date[];
    high: Date[];
  }>({ low: [], moderate: [], high: [] });

  const [riskConfig, setRiskConfig] = useState({
    label: "Calculating...",
    color: "#0B1956",
  });

  const { fetchUserWithPrediction, loading: predictionLoading } =
    useGetUserWithPrediction();
  const [isLocalLoading, setIsLocalLoading] = useState(true);

  useEffect(() => {
    const loadAllData = async () => {
      if (!userDB?.id) return;
      setIsLocalLoading(true);
      const userId = parseInt(userDB.id);
      try {
        const [predRes, formRes, historyRes] = await Promise.all([
          fetchUserWithPrediction(userId),
          getLatestUserFormData(userId),
          getPredictionHistory(userId),
        ]);

        if (predRes?.data) {
          setPredictionData(predRes.data);
          const percent = Math.floor(predRes.data.percent);
          // Sync with Native logic: <31 Green, <61 Amber
          if (percent < 31)
            setRiskConfig({ label: "Low Risk", color: "#10B981" });
          else if (percent < 61)
            setRiskConfig({ label: "Moderate Risk", color: "#F59E0B" });
          else setRiskConfig({ label: "High Risk", color: "#EF4444" });
        }

        if (historyRes?.data) {
          const low: Date[] = [];
          const moderate: Date[] = [];
          const high: Date[] = [];

          historyRes.data.forEach((entry: PredData) => {
            // Using split logic from Native to avoid timezone offsets
            const dateString = entry.created_at.split("T")[0];
            const dateObj = new Date(dateString);
            const p = Math.floor(entry.percent);

            if (p < 31) low.push(dateObj);
            else if (p < 61) moderate.push(dateObj);
            else high.push(dateObj);
          });
          setHistoryDays({ low, moderate, high });
        }

        if (formRes?.data) setFormData(formRes.data);
      } catch (err) {
        console.error("Dashboard error:", err);
      } finally {
        setIsLocalLoading(false);
      }
    };
    loadAllData();
  }, [userDB?.id]);

  const modifiers = {
    lowRisk: historyDays.low,
    modRisk: historyDays.moderate,
    highRisk: historyDays.high,
  };

  const modifiersStyles: ModifiersStyles = {
    lowRisk: {
      backgroundColor: "#10B981",
      color: "white",
      borderRadius: "10px",
    },
    modRisk: {
      backgroundColor: "#F59E0B",
      color: "white",
      borderRadius: "10px",
    },
    highRisk: {
      backgroundColor: "#EF4444",
      color: "white",
      borderRadius: "10px",
    },
  };

  if (isLocalLoading || predictionLoading || !userDB) {
    return (
      <div className="fixed inset-0 flex flex-col justify-center items-center bg-[#FDFCFB] z-50">
        <SyncLoader color="#0B1956" size={12} margin={4} />
      </div>
    );
  }

  const StatCard = ({
    title,
    value,
    unit,
    icon: Icon,
    iconColor,
    bgColor,
  }: StatCardProps) => (
    <Card className="bg-white border-none rounded-[2rem] gap-2 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:-translate-y-1">
      <div
        style={{ backgroundColor: bgColor }}
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110"
      >
        <Icon size={24} color={iconColor} />
      </div>
      <p className="text-slate-400 text-lg uppercase mb-1">{title}</p>
      <div className="flex items-baseline gap-1">
        <h2 className="text-2xl font-black text-blue-950">{value ?? "--"}</h2>
        <span className="text-sm font-bold text-slate-300 uppercase">
          {unit}
        </span>
      </div>
    </Card>
  );

  return (
    <SidebarInset className="bg-[#FAFAFA]">
      <SiteHeader title="Overview" />

      <div className="max-w-6xl mx-auto w-full px-5 py-8 md:p-12 space-y-8">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <SplitText
              text={`Hello, ${userDB.username ? userDB.username.split(" ")[0] : "User"}!`}
              className="text-4xl font-black text-blue-950 tracking-tighter"
              onLetterAnimationComplete={() => {}}
            />
            <p className="text-slate-400 text-sm font-medium">
              Your health vitals are up to date.
            </p>
          </div>
          <div className="hidden lg:block">
            <Link href="/profile">
              <Image
                src={userDB.profile_picture!}
                alt="Avatar"
                width={120}
                height={120}
                quality={90}
                className="size-30 object-cover rounded-full border border-4 border-blue-900"
              />
            </Link>
          </div>
        </header>

        {/* Risk Card */}
        <Card className="bg-white border-none rounded-[3.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-10 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.04)]">
          <div className="w-48 h-48 md:w-60 md:h-60 flex-shrink-0 bg-slate-50 p-6 rounded-[3rem]">
            <CircularProgressbar
              value={predictionData?.percent || 0}
              text={`${Math.round(predictionData?.percent || 0)}%`}
              strokeWidth={10}
              styles={buildStyles({
                textSize: "22px",
                textColor: "#0B1956",
                pathColor: riskConfig.color,
                trailColor: "#f1f5f9",
                strokeLinecap: "round",
              })}
            />
          </div>
          <div className="flex-1 text-center lg:text-left space-y-6">
            <h1
              className="text-5xl md:text-7xl font-black tracking-[-0.05em]"
              style={{ color: riskConfig.color }}
            >
              {riskConfig.label}
            </h1>
            <p>
              Keep tracking your daily habits to improve your diet, activity,
              and sleep for better health.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Link href="/ai-explanation-view">
                <Button className="rounded-2xl px-15 py-7 bg-[#0B1956] hover:bg-blue-900 text-white font-bold text-base transition-all active:scale-95">
                  View AI Summary <IconArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
              <Link href="/multi-step-form-retake">
                <Button className="rounded-2xl px-15 py-7 bg-[#f5f7ff] hover:bg-[#d5dcf5] border-2 border-blue-800 text-blue-800 font-bold text-base transition-all active:scale-95">
                  Update your data
                  <IconArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        {/* Vitals Grid with Aesthetically Pleasing Colors */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-2 gap-6">
            <StatCard
              title="Blood Pressure"
              value={
                formData ? `${formData.systolic}/${formData.diastolic}` : "--"
              }
              unit="mmHg"
              icon={IconStethoscope}
              iconColor="#EF4444"
              bgColor="#FEF2F2"
            />
            <StatCard
              title="HbA1C Level"
              value={formData?.hba1c}
              unit="%"
              icon={IconDropletFilled}
              iconColor="#3B82F6"
              bgColor="#EFF6FF"
            />
            <StatCard
              title="Glucose (FBS)"
              value={formData?.fbs}
              unit="mg/dL"
              icon={IconDropletsFilled}
              iconColor="#C972D1"
              bgColor="#F8E7FF"
            />
            <StatCard
              title="Total Cholesterol"
              value={formData?.cholesterol}
              unit="mg/dL"
              icon={IconScaleOutline}
              iconColor="#3AC241"
              bgColor="#C4FACD"
            />
          </div>

          {/* Calendar History */}
          <Card className="lg:col-span-1 bg-white border-none rounded-[2.5rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col items-center">
            <h3 className="text-lg  uppercase  text-blue-950 flex items-center gap-2">
              <IconCalendarEvent size={18} /> Activity Tracker
            </h3>
            <div className="custom-calendar">
              <DayPicker
                mode="single"
                selected={selectedDay}
                onSelect={setSelectedDay}
                modifiers={modifiers}
                modifiersStyles={modifiersStyles}
                styles={{
                  caption: { color: "#0B1956", fontWeight: "800" },
                  head_cell: {
                    color: "#94a3b8",
                    fontSize: "12px",
                    fontWeight: "800",
                  },
                  day: { fontWeight: "600" },
                }}
              />
            </div>
          </Card>
        </div>
      </div>

      <style jsx global>{`
        .rdp-day {
          margin: 2px;
        }
        .rdp-day_selected:not(.rdp-day_outside) {
          background-color: #0b1956 !important;
          color: white !important;
          border-radius: 10px;
        }
        .rdp-button:hover:not([disabled]) {
          border-radius: 10px !important;
        }
        .custom-calendar .rdp {
          --rdp-cell-size: 40px;
        }
      `}</style>
    </SidebarInset>
  );
}
