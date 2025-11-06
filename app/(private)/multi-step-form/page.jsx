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

const MultiForm = () => {
  const { steps, step, currentStepIndex, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([
      <QuestionForm />,
      <ClinicalForm />,
      <DietForm />,
      <ExerciseForm />,
      <SleepForm />,
    ]);

  return (
    <div className=" flex items-center justify-center w-full">
      <Card className="w-full max-w-[1000px] p-4 px-6 bg-[#F8F3ED] shadow-none outline-none border-0">
        <form>
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
              onClick={next}
              type="button"
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
