"use client";
import React, { useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface QuestionFormProps {
  onValueChange?: (value: string) => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({ onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>("");

  const handleValueChange = (value: string) => {
    setSelectedValue(value);
    onValueChange?.(value); // call parent function
  };

  return (
    <div className="flex flex-col w-full gap-3 mt-4">
      <h1 className="font-bold lg:text-4xl text-lg text-blue-950">
        Do you know your blood glucose levels?
      </h1>
      <p className="lg:text-lg text-sm">
        Your blood glucose levels are a crucial indicator of your health and can
        help us predict your risk accurately.
      </p>

      <RadioGroup
        value={selectedValue}
        onValueChange={handleValueChange}
        className="w-full mt-4"
      >
        <div className="flex flex-col lg:flex-row gap-3 w-full">
          {/* YES OPTION */}
          <Label
            htmlFor="1"
            className={`flex w-full gap-3 border-2 rounded-2xl p-3 items-center cursor-pointer transition
              ${
                selectedValue === "1"
                  ? "border-blue-600 bg-blue-100"
                  : "bg-blue-50"
              }`}
          >
            <RadioGroupItem
              value="1"
              id="1"
              className="size-6 cursor-pointer"
            />
            <div>
              <span className="text-xl text-blue-950">Yes</span>
              <p>More accurate prediction.</p>
            </div>
          </Label>

          {/* NO OPTION */}
          <Label
            htmlFor="0"
            className={`flex w-full gap-3 border-2 rounded-2xl p-3 items-center cursor-pointer transition
              ${
                selectedValue === "0"
                  ? "border-red-600 bg-red-100"
                  : "bg-red-50"
              }`}
          >
            <RadioGroupItem
              value="0"
              id="0"
              className="size-6 cursor-pointer"
            />
            <div>
              <span className="text-xl text-blue-950">No</span>
              <p>Less accurate prediction.</p>
            </div>
          </Label>
        </div>
      </RadioGroup>
    </div>
  );
};

export default QuestionForm;
