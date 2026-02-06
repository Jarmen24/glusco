"use client";

import React, { useEffect, useState, useRef } from "react";
import { SidebarInset } from "@/components/ui/sidebar";
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
  AlertTriangle,
  RefreshCcw,
} from "lucide-react";
import Link from "next/link";
import GeminiResult from "@/components/types/GeminiTypes";
import { useGetUser } from "@/hooks/userHooks";
import {
  useGetUserFormData,
  useGetUserWithPrediction,
} from "@/hooks/profileHooks";
import { getUserGemini, insertAnalysisToDB } from "@/hooks/userGemini";
import { PredData } from "@/components/types/UserDB";

export default function AIAnalysisPage() {
  const userDB = useGetUser();
  const [prediction, setPrediction] = useState<PredData>();
  const [formData, setFormData] = useState<any>();
  const [aiText, setAiText] = useState<GeminiResult | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  const { fetchUserWithPrediction } = useGetUserWithPrediction();
  const { fetchUserFormData } = useGetUserFormData();

  const hasRun = useRef(false);

  useEffect(() => {
    // Prevent double execution in Strict Mode and ensure user exists
    if (hasRun.current || !userDB?.id) return;

    const loadData = async () => {
      try {
        setAiLoading(true);
        setApiError(null);

        // 1. Fetch Form Data (Clinical/Lifestyle)
        const { data: fData, error: fError } = await fetchUserFormData(
          parseInt(userDB.id),
        );
        if (!fData || fError)
          throw new Error("Could not retrieve your clinical data.");
        setFormData(fData);

        // 2. Fetch Prediction Result
        const { data: pData, error: pError } = await fetchUserWithPrediction(
          parseInt(userDB.id),
        );
        if (!pData || pError)
          throw new Error("Could not retrieve your health prediction.");
        setPrediction(pData);

        // 3. Combine and Call Gemini
        const combinedData = { ...fData, ...pData };
        const response = await getUserGemini(combinedData);

        if (!response || !response.summary) {
          throw new Error(
            "Gemini AI failed to generate a response. Please check your connection.",
          );
        }

        // 4. Save to Database
        const insertSuccess = await insertAnalysisToDB(response, userDB.id);
        if (!insertSuccess) {
          console.warn("Analysis generated but failed to save to history.");
        }

        setAiText(response);
        hasRun.current = true; // Mark as successful
      } catch (err: any) {
        console.error("Analysis Flow Error:", err);
        setApiError(
          err.message || "Something went wrong while analyzing your health.",
        );
      } finally {
        setAiLoading(false);
      }
    };

    loadData();
  }, [userDB?.id, fetchUserFormData, fetchUserWithPrediction]);

  // --- LOADING STATE ---
  if (aiLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0B1956] to-[#2E4B8F] text-white">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#8EABFF]" />
        <p className="text-lg font-medium animate-pulse text-center px-6">
          Analyzing your health data with Gemini AI...
        </p>
      </div>
    );
  }

  // --- ERROR STATE (Prevents User from being stuck) ---
  if (apiError && !aiText) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1956] px-6">
        <Card className="max-w-md w-full rounded-[2rem] border-none bg-white/95 p-8 text-center shadow-2xl">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-[#0B1956] mb-2">
            Analysis Failed
          </h2>
          <p className="text-gray-600 mb-6">{apiError}</p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => window.location.reload()}
              className="w-full h-12 rounded-full bg-[#0B1956] hover:bg-[#1a2b7a] transition-all"
            >
              <RefreshCcw className="mr-2 w-4 h-4" /> Try Again
            </Button>
            <Link href="/dashboard" className="w-full">
              <Button
                variant="outline"
                className="w-full h-12 rounded-full border-[#0B1956] text-[#0B1956]"
              >
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    );
  }

  // --- FINAL CHECK ---
  if (!aiText) return null;

  // --- SUCCESS STATE ---
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
              <div className="bg-white w-8 h-8 rounded-full flex items-center justify-center mr-4 shrink-0 shadow-lg">
                <Zap className="text-[#0B1956] w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-semibold">{task.label}</span>
                <span className="text-white opacity-80 text-sm">
                  {task.reasoning}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Analysis Card */}
      <Card className="rounded-[2rem] border-none shadow-2xl bg-white/95 backdrop-blur-md">
        <CardContent className="p-8 space-y-8">
          {/* Summary */}
          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Summary
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {aiText.summary}
            </p>
          </section>

          <hr className="border-gray-100" />

          {/* Key Factors */}
          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-4">
              Key Risk Drivers
            </h2>
            <div className="space-y-4">
              {aiText.top_drivers?.map((driver, index) => (
                <div
                  key={index}
                  className="flex gap-3 items-start p-3 rounded-xl bg-gray-50"
                >
                  <div className="w-2 h-2 rounded-full bg-[#446CC3] mt-2 shrink-0" />
                  <div>
                    <p className="font-bold text-gray-800 text-sm">
                      {driver.feature}
                    </p>
                    <p className="text-gray-600 text-xs mt-0.5">
                      {driver.impact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <hr className="border-gray-100" />

          {/* Specific Changes */}
          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-4">
              Specific Lifestyle Changes
            </h2>
            <div className="grid gap-3">
              {aiText.specific_changes?.map((change, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 text-sm text-gray-700 font-medium bg-blue-50/50 p-3 rounded-xl"
                >
                  <Activity className="w-4 h-4 text-[#446CC3] shrink-0" />
                  {change}
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
          <h3 className="font-bold text-[#B45309] text-sm uppercase tracking-tight">
            Medical Disclaimer
          </h3>
        </div>
        <p className="text-[11px] leading-relaxed text-[#92400E] opacity-90 italic">
          {aiText.disclaimer ||
            "This AI-generated analysis is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment."}
        </p>
      </div>

      {/* Navigation */}
      <Link href="/dashboard" className="block cursor-pointer">
        <Button className="w-full h-16 rounded-full bg-white hover:bg-gray-100 text-[#0B1956] font-bold text-lg shadow-xl border-none transition-transform active:scale-95 group">
          Go to Dashboard
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </div>
  );
}
