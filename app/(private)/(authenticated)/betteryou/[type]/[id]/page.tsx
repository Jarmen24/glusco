"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  IconArrowLeft,
  IconClock,
  IconTarget,
  IconListCheck,
  IconFlame,
  IconActivity,
} from "@tabler/icons-react";

// Import your data
import lightData from "@/components/workouts/light_exercises.json";
import moderateData from "@/components/workouts/moderate_exercises.json";
import vigorousData from "@/components/workouts/vigorous_workouts.json";

export default function WorkoutDetailPage() {
  const params = useParams();
  const router = useRouter();

  const { type, id } = params;

  // 1. Find the specific workout based on type and ID/Index
  let workout: any = null;

  const normalizedType = type?.toString().toLowerCase();

  if (normalizedType === "light") {
    // Light exercises use the array index
    workout = lightData.Light_Exercises[Number(id)];
  } else if (normalizedType === "moderate") {
    // Moderate exercises: Use == to ignore string/number differences
    workout = moderateData.Moderate_Exercises.find(
      (ex: any) => ex.id?.toString() === id?.toString(),
    );
  } else if (normalizedType === "vigorous") {
    // Vigorous exercises: Use == to ignore string/number differences
    workout = vigorousData.Vigorous_Exercises.find(
      (ex: any) => ex.id?.toString() === id?.toString(),
    );
  }

  if (!workout) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold">Workout not found</h1>
        <Button onClick={() => router.back()} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  // 2. Data Normalization
  const title = workout.name || workout.title;
  // This extracts the 'exercises' array from your JSON
  const exerciseSteps = workout.exercises || [];

  return (
    <SidebarInset className="bg-[#FAFAFA]">
      <SiteHeader title="Exercise Details" />

      <div className="max-w-3xl mx-auto w-full px-6 py-10 md:py-16">
        {/* Back Navigation */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors font-bold text-sm mb-8 group"
        >
          <IconArrowLeft
            size={20}
            className="group-hover:-translate-x-1 transition-transform"
          />
          BACK TO TRAINING
        </button>

        {/* Header Section */}
        <div className="space-y-4 mb-12">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest">
              {workout.intensity || type} Intensity
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-blue-950 uppercase tracking-tighter italic leading-[0.9]">
            {title}
          </h1>
          <p className="text-slate-400 font-bold uppercase text-xs tracking-widest">
            {workout.label}
          </p>

          <div className="flex gap-8 pt-4">
            <div className="flex items-center gap-2">
              <IconClock className="text-blue-600" size={20} />
              <span className="font-black text-blue-950">
                {workout.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {normalizedType !== "light" && (
                <>
                  <IconTarget className="text-orange-500" size={20} />
                  <span className="font-black text-blue-950 uppercase text-sm">
                    Rest: {workout.rest}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Exercise Steps */}
        <section className="space-y-4">
          <div className="flex items-center gap-3 mb-6">
            <IconActivity size={24} className="text-blue-600" />
            <h2 className="text-2xl font-black text-blue-950 tracking-tight">
              Routine Steps
            </h2>
          </div>

          <div className="grid gap-3">
            {exerciseSteps.map((step: any, index: number) => (
              <Card
                key={index}
                className="p-5 border-none shadow-[0_4px_20px_rgb(0,0,0,0.02)] rounded-[1.5rem] flex-row items-center justify-between bg-white group hover:bg-blue-50 transition-colors"
              >
                <div className="flex gap-5 items-center">
                  <span className="w-8 h-8 rounded-xl bg-slate-100 group-hover:bg-white flex items-center justify-center font-black text-xs text-blue-950">
                    {index + 1}
                  </span>
                  <p className="text-slate-700 font-bold capitalize">
                    {normalizedType === "light" ? step.name : step.activity}
                  </p>
                </div>

                {/* Displaying the time for each specific activity */}
                <div className="px-3 py-1 rounded-lg bg-slate-50 group-hover:bg-blue-600 group-hover:text-white transition-colors text-[10px] font-black text-slate-400">
                  {step.time}
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Footer Tip */}
        <div className="mt-12 p-8 rounded-[2.5rem] bg-blue-950 text-white relative overflow-hidden">
          <IconFlame
            className="absolute -right-4 -bottom-4 text-white/10"
            size={120}
          />
          <h3 className="text-xl font-bold mb-2 relative z-10 italic uppercase">
            Start at your own pace
          </h3>
          <p className="text-blue-200 text-sm font-medium relative z-10 leading-relaxed">
            Listen to your body and take breaks as needed. Consistency is key,
            so focus on making this a regular part of your routine rather than
            pushing too hard in one session.
          </p>
        </div>
      </div>
    </SidebarInset>
  );
}
