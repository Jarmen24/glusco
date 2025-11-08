"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useMultiStepForm from "@/hooks/useMultiStepForm";
import QuestionForm from "@/components/form/QuestionForm";
import ClinicalForm from "@/components/form/ClinicalForm";
import DietForm from "@/components/form/Diet_Form";
import ExerciseForm from "@/components/form/ExerciseForm";
import SleepForm from "@/components/form/SleepForm";
import FamilyForm from "@/components/form/FamilyForm";
import { FormEvent } from "react";
import { toast } from "sonner";
import { StringToBoolean } from "class-variance-authority/types";
import {
  useInsertPrediction,
  useUpdateFormData,
  useUpdateUsername,
} from "@/hooks/profileHooks";
import client from "@/app/api/client";
import { useGetUser } from "@/hooks/userHooks";

type FormData = {
  username: string;
  age: string;
  gender: string;
  knowbgl: string;
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
  knowbgl: "",
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
  exercise_times: "",
  exercise_duration: "",
  sitting: "",
  main_activity: "",
  mode_of_transpo: "",
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
  const userDB = useGetUser();
  const [data, setData] = React.useState(INITIAL_DATA);
  const [prediction, setPrediction] = React.useState<string | null>(null);
  const [submitted, setSubmitted] = React.useState(false); // track submission
  const {
    handleUpdateUsername,
    loading: usernameLoading,
    error,
  } = useUpdateUsername();
  const [checkUsername, setCheckUsername] = React.useState(false);
  const {
    handleUpdateUserForm,
    loading: formDataLoading,
    error: formDataError,
  } = useUpdateFormData();
  const {
    handleInsertPrediction,
    loading: predictionLoading,
    error: predictionError,
  } = useInsertPrediction();
  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, step, currentStepIndex, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([
      <ClinicalForm {...data} updateFields={updateFields} />,
      <DietForm {...data} updateFields={updateFields} />,
      <ExerciseForm {...data} updateFields={updateFields} />,
      <SleepForm {...data} updateFields={updateFields} />,
      <FamilyForm {...data} updateFields={updateFields} />,
    ]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Step 1 — Only check when on ClinicalForm (first step)
    if (currentStepIndex === 0) {
      const requiredFields = [
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

      // Check for empty fields
      const emptyFields = requiredFields.filter(
        (field) => !data[field as keyof FormData]
      );

      if (emptyFields.length > 0) {
        toast.error("Please fill in all required fields before continuing.");
        return;
      }

      // Step 2 — Validate numeric fields
      const numericFields = [
        "age",
        "height",
        "weight",
        "waist",
        "hip",
        "systolic",
        "diastolic",
      ];

      const invalidNumbers = numericFields.filter((field) => {
        const value = data[field as keyof FormData];
        return value !== "" && isNaN(Number(value)); // not a valid number
      });

      if (invalidNumbers.length > 0) {
        toast.error("Please enter valid numbers only (no letters or symbols).");
        return;
      }

      // Validate username
      try {
        // 2️⃣ Check if username already exists
        setCheckUsername(true);
        const { data: usernameExists, error: usernameError } = await client
          .from("users")
          .select("id")
          .eq("username", data.username.toLowerCase())
          .maybeSingle();
        setCheckUsername(false);
        if (usernameError) throw usernameError;
        if (usernameExists) {
          toast.error("Username is already taken.");
          return;
        }
      } catch (error) {
        toast.error("Username already taken.");
        return;
      }
    }

    // Step 2
    if (currentStepIndex === 1) {
      const requiredFields = [
        "fruits",
        "vegetables",
        "fried",
        "sweets",
        "fastfood",
        "processed",
        "softdrink",
        "weight_concern",
      ];

      // Check for empty fields
      const emptyFields = requiredFields.filter(
        (field) => !data[field as keyof FormData]
      );

      if (emptyFields.length > 0) {
        toast.error("Please fill in all required fields before continuing.");
        return;
      }
    }
    // Step 3
    if (currentStepIndex === 2) {
      if (data.doesExercise === "") {
        toast.error("Please select an option before continuing.");
        return;
      }
      if (data.doesExercise === "1") {
        const requiredFields = [
          "doesExercise",
          "exercise_times",
          "exercise_duration",
          "sitting",
          "main_activity",
          "mode_of_transpo",
        ];

        // Check for empty fields
        const emptyFields = requiredFields.filter(
          (field) => !data[field as keyof FormData]
        );

        if (emptyFields.length > 0) {
          toast.error("Please fill in all required fields before continuing.");
          return;
        }
      }

      if (data.doesExercise === "2") {
        const requiredFields = ["sitting", "main_activity", "mode_of_transpo"];

        // Check for empty fields
        const emptyFields = requiredFields.filter(
          (field) => !data[field as keyof FormData]
        );

        if (emptyFields.length > 0) {
          toast.error("Please fill in all required fields before continuing.");
          return;
        }
      }
    }

    // Step 4
    if (currentStepIndex === 3) {
      const requiredFields = [
        "sleep_hours",
        "sleep_cigarette",
        "sleep_alcohol",
      ];

      // Check for empty fields
      const emptyFields = requiredFields.filter(
        (field) => !data[field as keyof FormData]
      );

      if (emptyFields.length > 0) {
        toast.error("Please fill in all required fields before continuing.");
        return;
      }
    }

    // Step 5
    if (currentStepIndex === 4) {
      const requiredFields = [
        "fh_father",
        "fh_mother",
        "fh_sister",
        "fh_brother",
        "fh_extended",
      ];

      // Check for empty fields
      const emptyFields = requiredFields.filter(
        (field) => !data[field as keyof FormData]
      );

      if (emptyFields.length > 0) {
        toast.error("Please fill in all required fields before continuing.");
        return;
      }
    }

    // ✅ If all good, move to next step
    if (!isLastStep) return next();
    // ✅ If last step, show success message
    // ✅ Last step: submit form and get prediction
    if (!userDB) return toast.error("User data not loaded yet. Please wait.");

    const { data: userNameData, error: userNameError } =
      await handleUpdateUsername(data.username, userDB.email);

    if (userNameError) return toast.error("Failed to update username.");
    console.log(userDB);
    const { dataObject, error: formError } = await handleUpdateUserForm(
      data,
      parseInt(userDB.id)
    );
    if (formError) return toast.error("Failed to update form data.");
    setSubmitted(true);
    toast.success("Form submitted successfully!");
  }

  React.useEffect(() => {
    if (!submitted) return;

    const fetchPrediction = async () => {
      try {
        const floatData = Object.fromEntries(
          Object.entries(data).map(([key, value]) => [
            key,
            parseFloat(value) || 0, // convert to float, default 0
          ])
        );

        // Now send this in your fetch or axios request
        const response = await fetch("http://127.0.0.1:8000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(floatData),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("❌ Server responded with error:", result);
          throw new Error(result.error || "Unknown backend error");
        }
        if (!userDB)
          return toast.error("User data not loaded yet. Please wait.");

        const { predData, error } = await handleInsertPrediction(
          parseInt(userDB.id),
          result.clinical,
          result.lifestyle,
          result.combined,
          result.percent
        );

        if (error) return toast.error("Failed to insert prediction.");
        setPrediction(result.probability);
      } catch (error) {
        console.error("🚨 Error fetching prediction:", error);
        setPrediction("Error fetching prediction");
      }
    };

    fetchPrediction();
  }, [submitted, data]);

  return (
    <div className=" flex items-center justify-center w-full">
      <Card className="w-full max-w-[1000px] p-4 px-6 bg-[#F8F3ED] shadow-none outline-none border-0">
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
              <div></div>
            )}
            <Button
              className="lg:text-lg text-sm bg-blue-950 cursor-pointer"
              type="submit"
            >
              {checkUsername ? "Validating" : isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MultiForm;
