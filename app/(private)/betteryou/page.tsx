"use client";

import React from "react";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import {
  IconFlame,
  IconClock,
  IconTarget,
  IconChevronRight,
  IconActivity,
  IconBolt,
} from "@tabler/icons-react";
import Link from "next/link";

// Mock imports - ensure these paths are correct in your project
import light_exercises from "@/components/workouts/light_exercises.json";
import moderate_exercises from "@/components/workouts/moderate_exercises.json";
import vigorous_exercises from "@/components/workouts/vigorous_workouts.json";

interface ExerciseCardProps {
  title: string;
  intensity: string;
  duration: string;
  label?: string;
  count?: number | string;
  href: string;
  themeColor: string;
  bgColor: string;
  icon: React.ElementType;
}

const ExerciseCard = ({
  title,
  intensity,
  duration,
  label,
  count,
  href,
  themeColor,
  bgColor,
  icon: Icon,
}: ExerciseCardProps) => (
  <Link href={href} className="group">
    <Card className="h-full bg-white border-none rounded-[2rem] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2 flex flex-col justify-between">
      <div>
        <div
          style={{ backgroundColor: bgColor }}
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-500"
        >
          <Icon size={24} color={themeColor} />
        </div>

        <h2 className="text-xl font-black text-blue-950 tracking-tight leading-tight mb-2 group-hover:text-blue-700 transition-colors">
          {title}
        </h2>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
            <IconTarget size={14} />
            <span>{intensity}</span>
          </div>
          {label && (
            <p className="text-sm text-slate-500 line-clamp-2 font-medium">
              {label}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-slate-50 px-3 py-1 rounded-full">
          <IconClock size={14} className="text-slate-400" />
          <span className="text-xs font-black text-blue-950">{duration}</span>
        </div>
        {count && (
          <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            {count} Steps
          </span>
        )}
        <IconChevronRight
          size={18}
          className="text-slate-300 group-hover:translate-x-1 transition-transform"
        />
      </div>
    </Card>
  </Link>
);

export function LightExercises() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {light_exercises.Light_Exercises.map((ex, index) => (
        <ExerciseCard
          key={index}
          title={ex.title}
          intensity={ex.for}
          duration={ex.duration}
          count={ex.total_exercises}
          href={`/workouts/${index}`}
          themeColor="#EAB308" // Yellow-500
          bgColor="#FEFCE8" // Yellow-50
          icon={IconActivity}
        />
      ))}
    </div>
  );
}

export function ModerateExercises() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {moderate_exercises.Moderate_Exercises.map((ex, index) => (
        <ExerciseCard
          key={index}
          title={ex.name}
          intensity={ex.intensity}
          duration={ex.duration}
          label={ex.label}
          href={`/workouts/moderate/${ex.id}`}
          themeColor="#F97316" // Orange-500
          bgColor="#FFF7ED" // Orange-50
          icon={IconBolt}
        />
      ))}
    </div>
  );
}

export function VigorousExercises() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {vigorous_exercises.Vigorous_Exercises.map((ex, index) => (
        <ExerciseCard
          key={index}
          title={ex.name}
          intensity={ex.intensity}
          duration={ex.duration}
          label={ex.label}
          href={`/workouts/vigorous/${ex.id}`}
          themeColor="#EF4444" // Red-500
          bgColor="#FEF2F2" // Red-50
          icon={IconFlame}
        />
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <SidebarInset className="bg-[#FAFAFA]">
      <SiteHeader title="Training" />
      <div className="max-w-7xl mx-auto w-full px-6 py-10 md:p-12 space-y-12">
        {/* Header Section */}
        <header className="space-y-2">
          <h1 className="text-5xl font-black text-blue-950 tracking-tighter">
            Better You{" "}
            <span className="inline-block hover:rotate-12 transition-transform">
              🍎
            </span>
          </h1>
          <p className="text-slate-400 text-lg font-medium">
            Personalized movement recommendations for your health profile.
          </p>
        </header>

        {/* Light Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-yellow-400 rounded-full" />
            <h2 className="text-2xl font-black text-blue-950 tracking-tight">
              Light Recovery
            </h2>
          </div>
          <LightExercises />
        </section>

        {/* Moderate Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-orange-400 rounded-full" />
            <h2 className="text-2xl font-black text-blue-950 tracking-tight">
              Moderate Active
            </h2>
          </div>
          <ModerateExercises />
        </section>

        {/* Vigorous Section */}
        <section className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="h-8 w-1.5 bg-red-500 rounded-full" />
            <h2 className="text-2xl font-black text-blue-950 tracking-tight">
              Vigorous Intensity
            </h2>
          </div>
          <VigorousExercises />
        </section>
      </div>
    </SidebarInset>
  );
}
