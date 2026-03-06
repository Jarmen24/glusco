"use client";

import React, { useContext, useState, useEffect, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import ClinicalForm from "@/components/form-retake/ClinicalForm";
import DietForm from "@/components/form-retake/Diet_Form";
import ExerciseForm from "@/components/form-retake/ExerciseForm";
import SleepForm from "@/components/form-retake/SleepForm";
import FamilyForm from "@/components/form-retake/FamilyForm";
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
import { Loader2 } from "lucide-react";
import Image from "next/image";

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

// --- LOADING OVERLAY COMPONENT ---
const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4">
      <Loader2 className="h-12 w-12 text-[#0B1956] animate-spin" />
      <h3 className="text-xl font-bold text-gray-900">
        Processing Health Data
      </h3>
      <p className="text-gray-500 text-sm">
        {message}... Please wait while we process your assessment.
      </p>
    </div>
  </div>
);

export async function getLatestUserFormData(id: number) {
  return await client
    .from("user_formdata")
    .select("*")
    .eq("user_id", id)
    .order("inserted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
}

const MultiFormRetake = () => {
  const auth = useContext(AuthContext);
  const { userDB, loading: userLoading } = useGetUser();
  const router = useRouter();

  const [data, setData] = useState(INITIAL_DATA);
  const [fetchingInitial, setFetchingInitial] = useState(true);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [aiText, setAiText] = useState<GeminiResult | null>(null);

  const { handleUpdateUsername, loading: usernameLoading } =
    useUpdateUsername();
  const { handleUpdateUserForm, loading: formDataLoading } =
    useUpdateFormData();
  const { handleInsertPrediction, loading: predictionLoading } =
    useInsertPrediction();

  // --- FETCH INITIAL DATA ON MOUNT ---
  useEffect(() => {
    const loadFormData = async () => {
      if (userDB?.id) {
        try {
          const { data: latest, error } = await getLatestUserFormData(
            parseInt(userDB.id),
          );
          if (error) throw error;

          if (latest) {
            // Map the database response back to our FormData string-based structure
            const mergedData: FormData = { ...INITIAL_DATA };
            (Object.keys(latest) as Array<keyof FormData>).forEach((key) => {
              if (Object.prototype.hasOwnProperty.call(INITIAL_DATA, key)) {
                const val = latest[key];

                if (key === "exercise_types") {
                  // TypeScript now knows exercise_types must be a string array
                  mergedData[key] = Array.isArray(val) ? val : [];
                } else {
                  // TypeScript now knows all other keys expect a string
                  mergedData[key] =
                    val !== null && val !== undefined ? String(val) : "";
                }
              }
            });
            setData(mergedData);
          }
        } catch (err) {
          console.error("Failed to fetch initial data:", err);
          toast.error("Could not load previous data.");
        } finally {
          setFetchingInitial(false);
        }
      }
    };

    loadFormData();
  }, [userDB?.id]);

  useEffect(() => {
    const checkUserStatus = async () => {
      // Only run if loading is finished
      if (!auth?.loading && !userLoading) {
        console.log("Auth Check:", { user: auth?.user, db: userDB });

        if (!auth?.user || !userDB) {
          console.warn("User session invalid, redirecting...");
          await client.auth.signOut();
          router.push("/onboarding");
        }
      }
    };

    checkUserStatus();
  }, [auth?.user, auth?.loading, userDB, userLoading, router]);

  const isGlobalLoading =
    usernameLoading && formDataLoading && predictionLoading;

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  const { steps, step, currentStepIndex, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([
      <ClinicalForm key="step1" {...data} updateFields={updateFields} />,
      <DietForm key="step2" {...data} updateFields={updateFields} />,
      <ExerciseForm key="step3" {...data} updateFields={updateFields} />,
      <SleepForm key="step4" {...data} updateFields={updateFields} />,
      <FamilyForm key="step5" {...data} updateFields={updateFields} />,
    ]);

  if (!auth) {
    return (
      <div className="p-10 text-center">
        <p>Auth context not found.</p>
      </div>
    );
  }

  if (auth.loading || fetchingInitial) {
    return (
      <div className="p-10 text-center flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-blue-950" />
        <p>Loading your profile data...</p>
      </div>
    );
  }

  const fetchPrediction = async () => {
    try {
      if (!data.height || !data.weight) return 0;

      const payload = Object.fromEntries(
        Object.entries(data).map(([key, value]) => {
          if (key === "exercise_types" || key === "username") {
            return [key, value];
          }
          return [key, parseFloat(value as string) || 0];
        }),
      );

      const response = await fetch(
        "https://predictive-model-diabetes.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      if (response.status === 422) {
        const errorJson = await response.json();
        console.log("VALIDATION ERROR:", errorJson.detail);
        return 0;
      }

      const result = await response.json();

      if (!response.ok || !userDB) {
        console.error("Prediction error or no userDB");
        return 0;
      }

      const { error } = await handleInsertPrediction(
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

    if (currentStepIndex === 0) {
      const allFieldsFilled =
        data.username.trim() !== "" &&
        data.age.trim() !== "" &&
        data.gender !== "" &&
        data.height.trim() !== "" &&
        data.weight.trim() !== "" &&
        data.waist.trim() !== "" &&
        data.hip.trim() !== "" &&
        data.systolic.trim() !== "" &&
        data.diastolic.trim() !== "";

      if (!allFieldsFilled) {
        toast.error("Please fill in all fields.");
        return false;
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/;
      // Numbers: Allows only digits and a single decimal point

      // --- 3. Validate Username ---
      if (!usernameRegex.test(data.username)) {
        return toast.error(
          "Username can only contain letters, numbers, and underscores.",
        );
      }

      setCheckUsername(true);
      const { data: exists } = await client
        .from("users")
        .select("id")
        .eq("username", data.username.toLowerCase())
        .maybeSingle();
      setCheckUsername(false);

      if (exists && exists.id !== userDB?.id)
        return toast.error("Username is already taken.");
    }

    const numericValidation = {
      age: { label: "Age", min: 1, max: 120 },
      height: { label: "Height (cm)", min: 50, max: 250 },
      weight: { label: "Weight (kg)", min: 20, max: 300 },
      waist: { label: "Waist (cm)", min: 30, max: 200 },
      hip: { label: "Hip (cm)", min: 30, max: 200 },
      systolic: { label: "Systolic", min: 70, max: 250 },
      diastolic: { label: "Diastolic", min: 40, max: 150 },
      hba1c: { label: "HbA1c", min: 3, max: 20 },
      fbs: { label: "FBS", min: 40, max: 600 },
      cholesterol: { label: "Cholesterol", min: 50, max: 500 },
      hdl: { label: "HDL", min: 10, max: 150 },
    };
    const numericRegex = /^\d*\.?\d+$/;
    for (const key in numericValidation) {
      const typedKey = key as keyof typeof numericValidation;

      const field = numericValidation[typedKey];
      const value = data[typedKey];

      if (!value || value.trim() === "") {
        toast.error(`${field.label} is required`);
        return false;
      }

      const num = Number(value);

      if (isNaN(num)) {
        toast.error(`${field.label} must be a number`);
        return false;
      }

      if (num < field.min || num > field.max) {
        toast.error(
          `${field.label} must be between ${field.min} and ${field.max}`,
        );
        return false;
      }
    }
    const isDietaryHabitsValid = () => {
      return (
        data.fruits !== "" &&
        data.vegetables !== "" &&
        data.fried !== "" &&
        data.sweets !== "" &&
        data.fastfood !== "" &&
        data.processed !== "" &&
        data.softdrink !== "" &&
        data.weight_concern !== ""
      );
    };

    const isPhysicalActivityValid = () => {
      return (
        data.exercise_times !== "0" &&
        data.exercise_duration !== "0" &&
        data.sitting !== "0" &&
        data.main_activity !== "0" &&
        data.mode_of_transpo !== "0"
      );
    };

    const isSleepSubstanceValid = () => {
      return (
        data.sleep_hours !== "0" &&
        data.sleep_cigarette !== "0" &&
        data.sleep_alcohol !== "0"
      );
    };

    const isFamilyHistoryValid = () => {
      return (
        data.fh_father !== "0" &&
        data.fh_mother !== "0" &&
        data.fh_sister !== "0" &&
        data.fh_brother !== "0" &&
        data.fh_extended !== "0"
      );
    };
    if (!isDietaryHabitsValid()) {
      alert("Please answer all required Dietary Habits questions.");
      return;
    }

    if (!isPhysicalActivityValid()) {
      alert("Please answer all required Physical Activity questions.");
      return;
    }

    if (!isSleepSubstanceValid()) {
      alert("Please answer all required Sleep & Substance questions.");
      return;
    }

    if (!isFamilyHistoryValid()) {
      alert("Please answer all required Family History questions.");
      return;
    }

    if (!isLastStep) return next();
    if (!userDB) return toast.error("User profile not found.");

    const { error: formErr } = await handleUpdateUserForm(
      data,
      parseInt(userDB.id),
    );
    if (formErr) return toast.error("Failed to update form data.");

    const success = await fetchPrediction();
    if (!success) return toast.error("Failed to get prediction.");

    setSubmitted(true);
    toast.success("Assessment updated successfully!");
    router.push("/prediction");
  }

  return (
    <div className="flex items-center justify-center w-full relative">
      {isGlobalLoading && (
        <LoadingOverlay
          message={
            predictionLoading
              ? "Generating Health Insights"
              : "Updating Profile"
          }
        />
      )}

      <Card className="w-full max-w-[1000px] p-4 px-6 bg-[#F8F3ED] shadow-none border-0">
        <Image
          src={"/glusco-logo.png"}
          alt={"glusco-logo"}
          width={150}
          height={50}
          className="object-cover mx-auto"
        />
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
                disabled={isGlobalLoading}
              >
                Back
              </Button>
            ) : (
              <div />
            )}
            <Button
              className="lg:text-lg text-sm bg-blue-950 cursor-pointer"
              type="submit"
              disabled={checkUsername || isGlobalLoading}
            >
              {checkUsername ? "Validating..." : isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MultiFormRetake;
