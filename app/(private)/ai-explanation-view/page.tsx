"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sparkles,
  Zap,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Loader2,
  Activity,
} from "lucide-react";
import Link from "next/link";
import GeminiResult from "@/components/types/GeminiTypes";
import { useGetUser } from "@/hooks/userHooks";
import { useUserAnalysis } from "@/hooks/profileHooks";

// 2. TOGGLE THIS TO TEST BOTH STATES
const isLoading = false;

export default function AIAnalysisPage() {
  const userDB = useGetUser();

  const [aiText, setAiText] = React.useState<GeminiResult>();
  const [aiLoading, setAiLoading] = React.useState<boolean>(isLoading);

  const {
    fetchAnalysis,
    loading: analysisLoading,
    error: analysisError,
  } = useUserAnalysis();
  const hasRun = React.useRef(false);
  useEffect(() => {
    if (hasRun.current) return;
    const loadData = async () => {
      if (!userDB?.id) {
        console.log("User not logged in");
        return;
      }

      try {
        setAiLoading(true);
        // 2. Fetch the prediction (which likely includes the AI analysis)

        const { data, error } = await fetchAnalysis(parseInt(userDB.id));

        if (!data || error) {
          // Assuming your hook/API returns the AI analysis in the data
          console.log("Error fetching analysis:", error);
          return;
        }

        setAiText(data);
        setAiLoading(false);
      } catch (err) {
        console.error("Error fetching analysis:", err);
      } finally {
        setAiLoading(false);
      }
    };

    loadData();
  }, [userDB?.id]);

  // Loading State UI
  if (aiLoading || !aiText) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0B1956] to-[#2E4B8F] text-white">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-lg font-medium animate-pulse">
          Analyzing your health data...
        </p>
      </div>
    );
  }

  // Loaded State UI
  return (
    <div className="max-w-2xl mx-auto w-full px-6 py-12 space-y-8">
      {/* Logo Section */}
      <div className="flex justify-center items-center gap-0.5">
        <span className="text-4xl font-black text-white tracking-tighter">
          glus
        </span>
        <span className="text-4xl font-black text-[#8EABFF] tracking-tighter">
          co
        </span>
      </div>

      {/* AI Title */}
      <div className="flex flex-col items-center gap-3">
        <div className="bg-[#8EABFF]/20 p-3 rounded-full">
          <Sparkles className="text-[#8EABFF] w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">AI Health Analysis</h1>
      </div>

      {/* Daily Action Plan */}
      <div className="space-y-4">
        <p className="text-[10px] font-black text-[#8EABFF] uppercase tracking-[0.2em]">
          Daily Action Plan
        </p>
        <div className="grid gap-3">
          {aiText.daily_tasks?.slice(0, 5).map((task, index) => (
            <div
              key={index}
              className="flex items-center bg-white/10 border border-white/15 rounded-2xl p-4 backdrop-blur-sm"
            >
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0">
                <Zap className="text-[#0B1956] w-4 h-4" />
              </div>
              <div className="flex flex-col gap-3">
                <span className="text-white font-semibold">{task.label}</span>
                <span className="text-white opacity-80 text-sm">
                  {task.reasoning}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="rounded-[2rem] border-none shadow-2xl bg-white/95 backdrop-blur-md">
        <CardContent className="p-8 space-y-6">
          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-3">
              Summary
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {aiText.summary}
            </p>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-3">
              Key Factors
            </h2>
            <div className="space-y-4">
              {aiText.top_drivers?.map((driver, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#0B1956] mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">
                      {driver.feature}
                    </p>
                    <p className="text-gray-600 text-sm">{driver.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-3">
              Specific Changes
            </h2>
            <div className="space-y-3">
              {aiText.specific_changes?.map((change, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-700 font-medium"
                >
                  <Activity className="w-4 h-4 text-[#446CC3]" />
                  {change}
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100" />

          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-3">
              Advice
            </h2>
            <div className="space-y-3">
              {aiText.advice?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-700"
                >
                  <CheckCircle className="w-4 h-4 text-green-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </section>
        </CardContent>
      </Card>

      {/* Disclaimer */}
      <div className="bg-[#FFF4E5]/90 rounded-2xl p-5 border border-[#FFD8A8]/50">
        <div className="flex items-center gap-2 mb-2">
          <AlertCircle className="w-4 h-4 text-[#B45309]" />
          <h3 className="font-bold text-[#B45309] text-sm tracking-tight">
            Disclaimer
          </h3>
        </div>
        <p className="text-xs leading-relaxed text-[#92400E] opacity-90">
          {aiText.disclaimer}
        </p>
      </div>

      {/* Dashboard Button */}
      <Link href="/dashboard" className="block cursor-pointer">
        <Button className="w-full h-16 rounded-full bg-white hover:bg-gray-50 text-[#0B1956] font-bold text-lg shadow-xl border-none transition-transform active:scale-95">
          Go to Dashboard
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}
