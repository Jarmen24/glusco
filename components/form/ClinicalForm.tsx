import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import QuestionForm from "./QuestionForm";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { ButtonGroup, ButtonGroupText } from "../ui/button-group";

const ClinicalForm = () => {
  const [hasAccess, setHasAccess] = useState<string | null>(null);

  const handleSelectionChange = (value: string) => {
    setHasAccess(value);
    console.log("Selected:", value);
  };
  return (
    <div>
      <div className="flex flex-col gap-3 mt-2">
        <h1 className="font-bold text-lg md:text-4xl lg:text-4xl  text-blue-950">
          Let's Get to Know You!
        </h1>
        <p className="text-sm md:text-lg lg:text-lg">
          We’ll start with a few simple details to help us understand you better
          and provide more accurate health insights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 content-start">
        {/* Left side */}
        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label>Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Juan Dela Cruz"
            className="lg:text-base text-sm bg-gray-50 border-0"
          />
        </div>

        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label>How old are you?</Label>
          <Input
            id="age"
            name="age"
            type="number"
            placeholder="age"
            className="lg:text-base text-sm bg-gray-50 border-0"
          />
        </div>
        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label>Gender</Label>
          <RadioGroup defaultValue="comfortable" className="flex gap-3">
            <div className="flex items-center gap-3">
              <RadioGroupItem value="male" id="male" />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="female" id="female" />
              <Label htmlFor="male">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div>
        <QuestionForm onValueChange={handleSelectionChange} />
      </div>
      {hasAccess === "1" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 items-start">
          {/* Left side */}
          <div className="grid gap-4">
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Height (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="height"
                    name="height"
                    type="text"
                    placeholder="eg. 154"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Weight (kg)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="weight"
                    name="weight"
                    type="text"
                    placeholder="eg. 60"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>kg</ButtonGroupText>
              </ButtonGroup>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Waist Circumference (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="waist_circumference"
                    name="waist_circumference"
                    type="number"
                    placeholder="eg. 35"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Hip Circumference (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="hip_circumference"
                    name="hip_circumference"
                    type="number"
                    placeholder="eg. 34"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Blood Pressure (Systolic/Diastolic)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="blood_pressure"
                    name="blood_pressure"
                    type="text"
                    placeholder="eg. 120/80"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>kg</ButtonGroupText>
              </ButtonGroup>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>HbA1C</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="hba1c"
                    name="hba1c"
                    type="number"
                    placeholder="eg. 5.5"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>%</ButtonGroupText>
              </ButtonGroup>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Fasting Blood Sugar</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="fasting_blood_sugar"
                    name="fasting_blood_sugar"
                    type="number"
                    placeholder="eg. 100"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>mg/dL</ButtonGroupText>
              </ButtonGroup>
            </div>
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Total Cholesterol</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="total_cholesterol"
                    name="total_cholesterol"
                    type="number"
                    placeholder="eg. 189"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>mg/dL</ButtonGroupText>
              </ButtonGroup>
            </div>
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>HDL</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="hdl"
                    name="hdl"
                    type="number"
                    placeholder="eg. 60"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>mg/dL</ButtonGroupText>
              </ButtonGroup>
            </div>
          </div>
        </div>
      )}

      {hasAccess === "0" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 items-start">
          {/* Left side */}
          <div className="grid gap-4">
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Height (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="height"
                    name="height"
                    type="text"
                    placeholder="eg. 154"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Weight (kg)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="weight"
                    name="weight"
                    type="text"
                    placeholder="eg. 60"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>kg</ButtonGroupText>
              </ButtonGroup>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Waist Circumference (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="waist_circumference"
                    name="waist_circumference"
                    type="number"
                    placeholder="eg. 35"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Hip Circumference (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="hip_circumference"
                    name="hip_circumference"
                    type="number"
                    placeholder="eg. 34"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Blood Pressure (Systolic/Diastolic)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="blood_pressure"
                    name="blood_pressure"
                    type="text"
                    placeholder="eg. 120/80"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                  />
                </InputGroup>
                <ButtonGroupText>kg</ButtonGroupText>
              </ButtonGroup>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalForm;
