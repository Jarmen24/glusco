"use client";

import React, {
  useContext,
  useState,
  FormEvent,
  useEffect,
  useRef,
} from "react";
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
  useGetUserFormData,
  useGetUserWithPrediction,
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

const LoadingOverlay = ({ message }: { message: string }) => (
  <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm">
    <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4 text-center max-w-sm mx-4">
      <Loader2 className="h-12 w-12 text-[#0B1956] animate-spin" />
      <h3 className="text-xl font-bold text-gray-900">
        Processing Health Data
      </h3>
      <p className="text-gray-500 text-sm">{message}... Please wait.</p>
    </div>
  </div>
);

const MultiForm = () => {
  const router = useRouter();
  const hasChecked = useRef(false);

  // 1. ALL HOOKS MUST BE AT THE TOP
  const auth = useContext(AuthContext);
  const { userDB, loading: userLoading } = useGetUser();
  const [data, setData] = useState(INITIAL_DATA);
  const [prediction, setPrediction] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [checkUsername, setCheckUsername] = useState(false);
  const [globalLoading, setGlobalLoading] = useState(false);
  const isSubmitting = React.useRef(false);
  const { handleUpdateUsername } = useUpdateUsername();
  const { handleUpdateUserForm } = useUpdateFormData();
  const { handleInsertPrediction, loading: predictionLoading } =
    useInsertPrediction();

  // Hooks for fetching
  const { fetchUserWithPrediction, loading: fetchPredictionLoading } =
    useGetUserWithPrediction();
  const { fetchUserFormData, loading: fetchFormDataLoading } =
    useGetUserFormData();

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => ({ ...prev, ...fields }));
  }

  useEffect(() => {
    if (hasChecked.current) return;
    if (auth?.loading || userLoading) return;
    if (!userDB?.id) return;

    hasChecked.current = true;
    const checkUserStatus = async () => {
      setGlobalLoading(true);
      // Only run if loading is finished
      if (!auth?.loading && !userLoading) {
        console.log("Auth Check:", { user: auth?.user, db: userDB });

        if (!auth?.user || !userDB || !userDB.id) {
          console.warn("User session invalid, redirecting...");
          await client.auth.signOut();
          router.push("/onboarding");
        }
      }
      if (userDB && userDB.id) {
        const [formRes, predRes] = await Promise.all([
          fetchUserFormData(parseInt(userDB.id)),
          fetchUserWithPrediction(parseInt(userDB.id)),
        ]);
        console.log("Form Data:", formRes);
        console.log("Prediction Data:", predRes);

        if (formRes.data && predRes.data) {
          router.push("/prediction");
          return;
        }
        setGlobalLoading(false);

        if (formRes.data && !predRes.data) {
          console.log(
            "Form data exists but no prediction, fetching prediction..",
          );
          const payload = { ...formRes.data, username: userDB.username };
          const success = await fetchPrediction(payload);
          setGlobalLoading(false);
          console.log(success);
          if (!success) return toast.error("Failed to get prediction.");

          toast.success("Assessment complete!");
          router.push("/prediction");
        }
      }
    };

    checkUserStatus();
  }, [auth?.loading, userLoading, userDB?.id]);

  const { steps, step, currentStepIndex, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([
      <ClinicalForm key="step1" {...data} updateFields={updateFields} />,
      <DietForm key="step2" {...data} updateFields={updateFields} />,
      <ExerciseForm key="step3" {...data} updateFields={updateFields} />,
      <SleepForm key="step4" {...data} updateFields={updateFields} />,
      <FamilyForm key="step5" {...data} updateFields={updateFields} />,
    ]);

  // 3. LOGIC FUNCTIONS
  const fetchPrediction = async (formData: FormData) => {
    try {
      if (!formData.height || !formData.weight || !userDB) return 0;

      const payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => {
          if (key === "exercise_types" || key === "username")
            return [key, value];
          return [key, parseFloat(value as string) || 0];
        }),
      );

      console.log("Payload for prediction:", formData);

      const response = await fetch(
        "https://predictive-model-diabetes.onrender.com/predict",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) {
        const err = await response.json();
        console.log("Backend error:", err);
        return 0;
      }
      const result = await response.json();

      const { error } = await handleInsertPrediction(
        parseInt(userDB.id),
        result.clinical,
        result.lifestyle,
        result.combined,
        result.percent,
      );

      if (error) return 0;

      setPrediction(result.percent);
      return 1;
    } catch (err) {
      console.error(err);
      return 0;
    }
  };

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting.current) return; // block double click
    isSubmitting.current = true;
    try {
      // Character Check
      const tooLong = Object.entries(data).find(
        ([_, v]) => typeof v === "string" && v.length > 16,
      );
      if (tooLong) return toast.error(`Input for "${tooLong[0]}" is too long.`);

      // Step 0 Validation (Clinical)
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
      }

      if (currentStepIndex === 1) {
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
        if (!isDietaryHabitsValid()) {
          alert("Please answer all required Dietary Habits questions.");
          return;
        }
      }

      if (currentStepIndex === 2) {
        const isPhysicalActivityValid = () => {
          return (
            data.exercise_times !== "0" &&
            data.exercise_duration !== "0" &&
            data.sitting !== "0" &&
            data.main_activity !== "0" &&
            data.mode_of_transpo !== "0"
          );
        };
        if (!isPhysicalActivityValid()) {
          alert("Please answer all required Physical Activity questions.");
          return;
        }
      }

      if (currentStepIndex === 3) {
        const isSleepSubstanceValid = () => {
          return (
            data.sleep_hours !== "0" &&
            data.sleep_cigarette !== "0" &&
            data.sleep_alcohol !== "0"
          );
        };
        if (!isSleepSubstanceValid()) {
          alert("Please answer all required Sleep & Substance questions.");
          return;
        }
      }

      if (currentStepIndex === 4) {
        const isFamilyHistoryValid = () => {
          return (
            data.fh_father !== "0" &&
            data.fh_mother !== "0" &&
            data.fh_sister !== "0" &&
            data.fh_brother !== "0" &&
            data.fh_extended !== "0"
          );
        };
        if (!isFamilyHistoryValid()) {
          alert("Please answer all required Family History questions.");
          return;
        }
      }

      if (!isLastStep) return next();

      // Final Submission
      if (!userDB) return toast.error("User profile not found.");

      setGlobalLoading(true);

      const { error: nameErr } = await handleUpdateUsername(
        data.username,
        userDB.email,
      );
      if (nameErr) {
        setGlobalLoading(false);
        return toast.error("Failed to update username.");
      }

      const { error: formErr } = await handleUpdateUserForm(
        data,
        parseInt(userDB.id),
      );
      if (formErr) {
        setGlobalLoading(false);
        return toast.error("Failed to update form data.");
      }

      const success = await fetchPrediction(data);
      setGlobalLoading(false);

      if (!success) return toast.error("Failed to get prediction.");

      toast.success("Assessment complete!");
      router.push("/prediction");
    } finally {
      isSubmitting.current = false;
    }
  }

  // 4. CONDITIONAL RENDERING (MUST BE BELOW ALL HOOKS)
  if (userLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80">
        <Loader2 className="h-10 w-10 animate-spin text-[#0B1956]" />
        <span className="ml-3 font-medium">Loading Assessment...</span>
      </div>
    );
  }
  if (!auth) {
    return (
      <div className="p-10 text-center">
        <p>Auth context not found.</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full relative">
      {globalLoading && (
        <LoadingOverlay
          message={
            predictionLoading
              ? "Analyzing Health Risks"
              : fetchPredictionLoading && fetchFormDataLoading
                ? "Checking if you had progress.."
                : "Saving Progress"
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
                className="lg:text-lg text-sm bg-blue-950"
                onClick={back}
                type="button"
                disabled={globalLoading}
              >
                Back
              </Button>
            ) : (
              <div />
            )}

            <Button
              className="lg:text-lg text-sm bg-blue-950"
              type="submit"
              disabled={checkUsername || globalLoading}
            >
              {checkUsername ? "Checking..." : isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MultiForm;
