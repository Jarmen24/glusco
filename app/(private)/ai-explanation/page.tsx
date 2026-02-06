"use client";

import React, { useEffect, useState, useRef } from "react";
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

export default function AIAnalysisPage() {
  const userDB = useGetUser();
  const [aiText, setAiText] = useState<GeminiResult | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);

  // Hooks for fetching
  const { fetchUserWithPrediction } = useGetUserWithPrediction();
  const { fetchUserFormData } = useGetUserFormData();

  const hasRun = useRef(false);

  useEffect(() => {
    // 1. STRICT LOCK: If it has run or no user, stop immediately.
    if (hasRun.current || !userDB?.id) return;

    // Set lock immediately before async work starts to prevent race conditions
    hasRun.current = true;

    const loadData = async () => {
      try {
        setAiLoading(true);
        setApiError(null);

        // 2. FETCH DATA LOCALLY (Don't store in global state to avoid UI jitter)
        const [formRes, predRes] = await Promise.all([
          fetchUserFormData(parseInt(userDB.id)),
          fetchUserWithPrediction(parseInt(userDB.id)),
        ]);

        if (formRes.error || !formRes.data)
          throw new Error("Could not retrieve clinical data.");
        if (predRes.error || !predRes.data)
          throw new Error("Could not retrieve prediction results.");

        // 3. COMBINE DATA
        const combinedData = { ...formRes.data, ...predRes.data };

        // 4. CALL GEMINI
        const response = await getUserGemini(combinedData);

        if (!response || !response.summary) {
          throw new Error("Gemini AI failed to generate a response.");
        }

        // 5. SAVE AND FINALIZE
        await insertAnalysisToDB(response, userDB.id);

        // Single state update at the very end to render the UI once
        setAiText(response);
      } catch (err: any) {
        console.error("Analysis Flow Error:", err);
        setApiError(err.message || "Something went wrong.");
        // If it failed, allow it to try again if the user refreshes or clicks retry
        hasRun.current = false;
      } finally {
        setAiLoading(false);
      }
    };

    loadData();

    // We strictly only depend on userDB.id.
    // fetch functions are omitted because they usually cause infinite loops in custom hooks.
  }, [userDB?.id]);

  // --- LOADING STATE ---
  if (aiLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1956] text-white">
        <Loader2 className="w-12 h-12 animate-spin mb-4 text-[#8EABFF]" />
        <p className="text-lg font-medium animate-pulse">
          Analyzing health data...
        </p>
      </div>
    );
  }

  // --- ERROR STATE ---
  if (apiError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#0B1956] px-6">
        <Card className="max-w-md w-full rounded-[2rem] p-8 text-center shadow-2xl">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2">Analysis Glitch</h2>
          <p className="text-gray-600 mb-6">{apiError}</p>
          <Button
            onClick={() => window.location.reload()}
            className="w-full rounded-full bg-[#0B1956]"
          >
            <RefreshCcw className="mr-2 h-4 w-4" /> Reset and Retry
          </Button>
        </Card>
      </div>
    );
  }

  if (!aiText) return null;

  return (
    <div className="max-w-2xl mx-auto w-full px-6 py-12 space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-center items-center gap-0.5">
        <span className="text-4xl font-black text-white tracking-tighter">
          glus
        </span>
        <span className="text-4xl font-black text-[#8EABFF] tracking-tighter">
          co
        </span>
      </div>

      <div className="flex flex-col items-center gap-3">
        <div className="bg-[#8EABFF]/20 p-3 rounded-full">
          <Sparkles className="text-[#8EABFF] w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-white">AI Health Analysis</h1>
      </div>

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

      <Card className="rounded-[2rem] border-none shadow-2xl bg-white/95 backdrop-blur-md">
        <CardContent className="p-8 space-y-8">
          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-500" /> Summary
            </h2>
            <p className="text-gray-600 leading-relaxed text-sm">
              {aiText.summary}
            </p>
          </section>

          <hr className="border-gray-100" />

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

          <section>
            <h2 className="text-lg font-extrabold text-[#0B1956] mb-4">
              Lifestyle Changes
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

      <div className="bg-[#FFF4E5]/90 rounded-2xl p-5 border border-[#FFD8A8]/50 text-xs text-[#92400E]">
        <div className="flex items-center gap-2 mb-2 font-bold uppercase">
          <AlertCircle className="w-4 h-4" /> Medical Disclaimer
        </div>
        {aiText.disclaimer}
      </div>

      <Link href="/dashboard" className="block">
        <Button className="w-full h-16 rounded-full bg-white hover:bg-gray-100 text-[#0B1956] font-bold text-lg shadow-xl border-none transition-all active:scale-95">
          Go to Dashboard
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </Link>
    </div>
  );
}
