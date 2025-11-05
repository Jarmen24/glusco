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

const MultiForm = () => {
  const { steps, step, currentStepIndex, isFirstStep, back, next, isLastStep } =
    useMultiStepForm([<div>1</div>, <div>2</div>]);

  return (
    <div className="h-screen flex items-center justify-center w-full">
      <Card className="w-3/4 p-4 px-6 bg-[#F8F3ED] shadow-none outline-none border-0">
        <form>
          <div className="w-full flex flex-col justify-between items-start">
            <p className="font-bold lg:text-lg text-sm bg-blue-950 lg:px-5 py-2 px-2 rounded-2xl text-white shrink-0">
              {currentStepIndex + 1} / {steps.length}
            </p>
            <div>{step}</div>
            <div className="flex flex-col gap-3 mt-2">
              <h1 className="font-bold lg:text-4xl text-lg text-blue-950">
                Let's Get to Know You!
              </h1>
              <p className="lg:text-lg text-sm">
                We’ll start with a few simple details to help us understand you
                better and provide more accurate health insights.
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center">
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
