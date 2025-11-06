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

type FormData = {
  name: string;
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
};

const INITIAL_DATA: FormData = {
  name: "",
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
};

const MultiForm = () => {
  const [data, setData] = React.useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { steps, step, currentStepIndex, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([
      <ClinicalForm {...data} updateFields={updateFields} />,
      <DietForm />,
      <ExerciseForm />,
      <SleepForm />,
      <FamilyForm />,
    ]);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Step 1 — Only check when on ClinicalForm (first step)
    if (currentStepIndex === 0) {
      const requiredFields = [
        "name",
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
      console.log(emptyFields);
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

      // Step 3 — Validate name (letters only)
      const namePattern = /^[A-Za-z\s]+$/;
      if (!namePattern.test(data.name)) {
        toast.error("Name should only contain letters and spaces.");
        return;
      }
    }

    // ✅ If all good, move to next step
    next();
  }

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
              {isLastStep ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default MultiForm;
