"use client";

import React, { useContext, useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import QuestionForm from "@/components/form/QuestionForm";
import ClinicalForm from "@/components/form/ClinicalForm";
import DietForm from "@/components/form/Diet_Form";
import ExerciseForm from "@/components/form/ExerciseForm";
import SleepForm from "@/components/form/SleepForm";
import FamilyForm from "@/components/form/FamilyForm";
import { toast } from "sonner";
import {
  useInsertPrediction,
  useUpdateFormData,
  useUpdateUsername,
} from "@/hooks/profileHooks";
import client from "@/app/api/client";
import { useGetUser } from "@/hooks/userHooks";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/components/context/AuthProvider";
import GeminiResult from "@/components/types/GeminiTypes";

export type FormData = {
  username: string;
  age: string;
  gender: string;
  height: string;
  weight: string;
  waist: string;
  hip: string;
  systolic: string;
  diastolic: string;
  hba1c?: string;
  fbs?: string;
  cholesterol?: string;
  hdl?: string;
  fruits: string;
  vegetables: string;
  fried: string;
  sweets: string;
  fastfood: string;
  processed: string;
  softdrink: string;
  weight_concern: string;
  doesExercise: string;
  exercise_times: string;
  exercise_duration: string;
  sitting: string;
  main_activity: string;
  mode_of_transpo: string;
  exercise_types?: string[];
  fh_father: string;
  fh_mother: string;
  fh_sister: string;
  fh_brother: string;
  fh_extended: string;
  sleep_hours: string;
  sleep_cigarette: string;
  sleep_alcohol: string;
};

const INITIAL_DATA: FormData = {
  username: "",
  age: "",
  gender: "",
  height: "",
  weight: "",
  waist: "",
  hip: "",
  systolic: "",
  diastolic: "",
  hba1c: "",
  fbs: "",
  cholesterol: "",
  hdl: "",
  fruits: "",
  vegetables: "",
  fried: "",
  sweets: "",
  fastfood: "",
  processed: "",
  softdrink: "",
  weight_concern: "",
  doesExercise: "",
  exercise_times: "4",
  exercise_duration: "5",
  sitting: "",
  main_activity: "",
  mode_of_transpo: "",
  exercise_types: [],
  fh_father: "",
  fh_mother: "",
  fh_sister: "",
  fh_brother: "",
  fh_extended: "",
  sleep_hours: "",
  sleep_cigarette: "",
  sleep_alcohol: "",
};

const MultiForm = () => {
  // 1. ALL HOOKS MUST BE AT THE TOP
  const auth = useContext(AuthContext);
  const userDB = useGetUser();
  const router = useRouter();

  const [data, setData] = useState(INITIAL_DATA);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [aiText, setAiText] = useState<GeminiResult | null>(null);
  const [aiLoading, setAiLoading] = useState(false);

  const { handleUpdateUsername, loading: usernameLoading } =
    useUpdateUsername();
  const { handleUpdateUserForm, loading: formDataLoading } =
    useUpdateFormData();
  const { handleInsertPrediction, loading: predictionLoading } =
    useInsertPrediction();

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
    console.log(data);
  }

  // Define steps inside the hook call
  const { steps, step, currentStepIndex, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([
      <ClinicalForm key="step1" {...data} updateFields={updateFields} />,
      <DietForm key="step2" {...data} updateFields={updateFields} />,
      <ExerciseForm key="step3" {...data} updateFields={updateFields} />,
      <SleepForm key="step4" {...data} updateFields={updateFields} />,
      <FamilyForm key="step5" {...data} updateFields={updateFields} />,
    ]);

  // 2. CONDITIONAL RENDERS MUST HAPPEN AFTER ALL HOOKS
  if (!auth) {
    return (
      <div className="p-10 text-center">
        <p>
          Auth context not found. Make sure AuthProvider wraps this component.
        </p>
      </div>
    );
  }

  const { user, loading: authLoading } = auth;

  if (authLoading)
    return <div className="p-10 text-center">Loading User...</div>;

  // --- Logic Functions ---

  const fetchPrediction = async () => {
    try {
      if (!data.height || !data.weight) return 0;

      const payload = Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          // Skip parsing for the array field
          console.log(key);
          if (key === "exercise_types" || key === "username") {
            return [key, value]; // Keep as string[]
          }

          // Parse everything else as a float for your ML model
          return [key, parseFloat(value as string) || 0];
        }),
      );
      console.log(payload);
      const response = await fetch("http://192.168.100.6:8000/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (response.status === 422) {
        const errorJson = await response.json();
        console.log("VALIDATION ERROR:", errorJson.detail);
        // This will show you exactly which field (e.g., ["body", "age"]) is the problem.
      }
      const result = await response.json();

      if (!response.ok || !userDB) {
        console.error("Prediction error or no userDB");
        return 0;
      }

      const { predData, error } = await handleInsertPrediction(
        parseInt(userDB.id),
        result.clinical,
        result.lifestyle,
        result.combined,
        result.percent,
      );

      if (error) {
        console.error("Error inserting prediction:", error);
        return 0;
      }

      setPrediction(result.percent);
      return 1;
    } catch (err) {
      console.error("Error fetching prediction:", err);
      return 0;
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Validation logic per step
    if (currentStepIndex === 0) {
      const required = [
        "username",
        "age",
        "gender",
        "height",
        "weight",
        "waist",
        "hip",
        "systolic",
        "diastolic",
      ];
      if (required.some((field) => !data[field as keyof FormData])) {
        return toast.error("Please fill in all required fields.");
      }

      // Numeric validation
      const nums = [
        "age",
        "height",
        "weight",
        "waist",
        "hip",
        "systolic",
        "diastolic",
      ];
      if (nums.some((f) => isNaN(Number(data[f as keyof FormData])))) {
        return toast.error("Please enter valid numbers.");
      }

      // Username check
      setCheckUsername(true);
      const { data: exists } = await client
        .from("users")
        .select("id")
        .eq("username", data.username.toLowerCase())
        .maybeSingle();
      setCheckUsername(false);

      if (exists) return toast.error("Username is already taken.");
    }

    if (currentStepIndex === 1) {
      const required = [
        "fruits",
        "vegetables",
        "fried",
        "sweets",
        "fastfood",
        "processed",
        "softdrink",
        "weight_concern",
      ];
      if (required.some((f) => !data[f as keyof FormData]))
        return toast.error("Please fill all fields.");
    }

    // Move to next step if not last
    if (!isLastStep) return next();

    // Final Submission Logic
    if (!userDB) return toast.error("User profile not found.");

    const { error: nameErr } = await handleUpdateUsername(
      data.username,
      userDB.email,
    );
    if (nameErr) return toast.error("Failed to update username.");

    const { error: formErr } = await handleUpdateUserForm(
      data,
      parseInt(userDB.id),
    );
    if (formErr) return toast.error("Failed to update form data.");

    const success = await fetchPrediction();
    if (!success) return toast.error("Failed to get prediction.");

    setSubmitted(true);
    toast.success("Form submitted successfully!");
    router.push("/prediction");
  }

  return (
    <div className="flex items-center justify-center w-full">
      <Card className="w-full max-w-[1000px] p-4 px-6 bg-[#F8F3ED] shadow-none border-0">
        <form onSubmit={handleSubmit}>
          <div className="w-full flex flex-col justify-between items-start">
            <p className="font-bold lg:text-lg text-sm bg-blue-950 lg:px-5 py-2 px-2 rounded-2xl text-white shrink-0">
              {currentStepIndex + 1} / {steps.length}
            </p>
            <div className="w-full">{step}</div>
          </div>

          <div className="flex justify-between items-center mt-3">
            {!isFirstStep ? (
              <Button
                className="lg:text-lg text-sm bg-blue-950 cursor-pointer"
                onClick={back}
                type="button"
              >
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              className="lg:text-lg text-sm bg-blue-950 cursor-pointer"
              type="submit"
              disabled={checkUsername || usernameLoading || formDataLoading}
            >
              {checkUsername ? "Validating..." : isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MultiForm;
