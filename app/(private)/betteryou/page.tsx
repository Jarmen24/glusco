"use client";

import { useEffect, useState } from "react";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { Card } from "@/components/ui/card";
import light_exercises from "@/components/workouts/light_exercises.json";
import moderate_exercises from "@/components/workouts/moderate_exercises.json";
import vigorous_exercises from "@/components/workouts/vigorous_workouts.json";
import Link from "next/link";

export function LightExercises() {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {light_exercises.Light_Exercises.map((exerciseGroup, index) => (
        <Link href={`/workouts/${index}`} key={index}>
          <div
            key={index}
            className="bg-gradient-to-b from-white to-yellow-50 p-4 rounded-xl shadow h-full border-t-4 border-yellow-200 
                 transition-all duration-300 ease-in-out 
                 hover:outline hover:outline-2 hover:outline-yellow-400 hover:outline-offset-2 hover:shadow-lg"
          >
            <h2 className="font-bold text-md text-yellow-600">
              {exerciseGroup.title}
            </h2>
            <p className="text-sm text-gray-600">
              For: {exerciseGroup.for} | Duration: {exerciseGroup.duration}
            </p>
            <p className="text-sm text-gray-600 mb-3">
              Total Exercises: {exerciseGroup.total_exercises}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export function ModerateExercises() {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {moderate_exercises.Moderate_Exercises.map((workout, index) => (
        <Link href={`/workouts/moderate/${workout.id}`} key={index}>
          <div className="bg-gradient-to-b from-white to-orange-50 p-4 rounded-xl shadow h-full border-t-4 border-orange-200 transition-all duration-300 ease-in-out hover:outline hover:outline-2 hover:outline-orange-400 hover:outline-offset-2 hover:shadow-lg hover:scale-[1.02]">
            <h2 className="font-bold text-lg text-orange-500">
              {workout.name}
            </h2>
            <p className="text-sm text-gray-600">
              For: {workout.intensity} | Duration: {workout.duration}
            </p>
            <p className="text-sm text-gray-600 mb-3">{workout.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
export function VigorousExercises() {
  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {vigorous_exercises.Vigorous_Exercises.map((workout, index) => (
        <Link href={`/workouts/vigorous/${workout.id}`} key={index}>
          <div
            className="bg-gradient-to-b from-white to-red-100 p-4 rounded-xl shadow h-full border-t-4 border-red-200
                       transition-all duration-300 ease-in-out
                       hover:outline hover:outline-2 hover:outline-red-400 hover:outline-offset-2 hover:shadow-lg hover:scale-[1.02]"
          >
            <h2 className="font-bold text-lg text-blue-800">{workout.name}</h2>
            <p className="text-sm text-gray-600">
              For: {workout.intensity} | Duration: {workout.duration}
            </p>
            <p className="text-sm text-gray-600 mb-3">{workout.label}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default function Page() {
  return (
    <SidebarInset>
      <SiteHeader title="Dashboard" />
      <div className="flex flex-1 flex-col p-5">
        <h1 className="text-2xl font-bold  text-primary">Better You 🍎</h1>
        <p>Recommended exercises you can do.</p>
        <div className="mt-4">
          <h1 className="text-xl font-bold text-primary">Light Exercises</h1>
          <div className="text-lg">{LightExercises()}</div>
        </div>
        <div className="mt-4">
          <h1 className="text-xl font-bold text-primary">Moderate Exercises</h1>
          <div className="text-lg">{ModerateExercises()}</div>
        </div>
        <div className="mt-4">
          <h1 className="text-xl font-bold text-primary">Moderate Exercises</h1>
          <div className="text-lg">{VigorousExercises()}</div>
        </div>
      </div>
    </SidebarInset>
  );
}
