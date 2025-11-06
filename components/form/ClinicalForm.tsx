"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { ButtonGroup, ButtonGroupText } from "../ui/button-group";

type ClinicalData = {
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

type ClinicalFormProps = ClinicalData & {
  updateFields: (fields: Partial<ClinicalData>) => void;
};

const ClinicalForm = ({
  name,
  age,
  gender,
  knowbgl,
  height,
  weight,
  waist,
  hip,
  systolic,
  diastolic,
  hba1c,
  fbs,
  cholesterol,
  hdl,
  updateFields,
}: ClinicalFormProps) => {
  const [hasAccess, setHasAccess] = useState<string | null>(null);

  return (
    <div>
      {/* Title */}
      <div className="flex flex-col gap-3 mt-2">
        <h1 className="font-bold text-lg md:text-4xl lg:text-4xl text-blue-950">
          Let's Get to Know You!
        </h1>
        <p className="text-sm md:text-lg lg:text-lg">
          We’ll start with a few simple details to help us understand you better
          and provide more accurate health insights.
        </p>
      </div>

      {/* Basic info section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-5 content-start">
        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label>Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Juan Dela Cruz"
            className="lg:text-base text-sm bg-gray-50 border-0"
            value={name}
            onChange={(e) => updateFields({ name: e.target.value })}
          />
        </div>

        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label>How old are you?</Label>
          <Input
            id="age"
            name="age"
            type="text"
            placeholder="age"
            required
            className="lg:text-base text-sm bg-gray-50 border-0"
            value={age}
            onChange={(e) => updateFields({ age: e.target.value })}
          />
        </div>

        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label>Gender</Label>
          <RadioGroup
            className="flex gap-3"
            required
            value={String(gender)}
            onValueChange={(value) => updateFields({ gender: value })}
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="1" id="gender-male" />
              <Label htmlFor="gender-male">Male</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="2" id="gender-female" />
              <Label htmlFor="gender-female">Female</Label>
            </div>
          </RadioGroup>
        </div>
      </div>

      {/* ✅ Blood Glucose Question (merged QuestionForm) */}
      <div className="flex flex-col w-full gap-3 mt-6">
        <h1 className="font-bold lg:text-4xl text-2xl text-blue-950">
          Do you know your blood glucose levels?
        </h1>
        <p className="lg:text-lg text-sm">
          Your blood glucose levels are a crucial indicator of your health and
          can help us predict your risk accurately.
        </p>

        <RadioGroup
          value={knowbgl}
          onValueChange={(value) => (
            setHasAccess(value), updateFields({ knowbgl: value })
          )}
          className="w-full mt-4"
          required
        >
          <div className="flex flex-col lg:flex-row gap-3 w-full">
            {/* YES */}
            <Label
              htmlFor="blood-yes"
              className={`flex w-full gap-3 border-2 rounded-2xl p-3 items-center cursor-pointer transition ${
                knowbgl === "1" ? "border-blue-600 bg-blue-100" : "bg-blue-50"
              }`}
            >
              <RadioGroupItem value="1" id="blood-yes" className="size-6" />
              <div>
                <span className="text-xl text-blue-950">Yes</span>
                <p>More accurate prediction.</p>
              </div>
            </Label>

            {/* NO */}
            <Label
              htmlFor="blood-no"
              className={`flex w-full gap-3 border-2 rounded-2xl p-3 items-center cursor-pointer transition ${
                knowbgl === "0" ? "border-red-600 bg-red-100" : "bg-red-50"
              }`}
            >
              <RadioGroupItem value="0" id="blood-no" className="size-6" />
              <div>
                <span className="text-xl text-blue-950">No</span>
                <p>Less accurate prediction.</p>
              </div>
            </Label>
          </div>
        </RadioGroup>
      </div>

      {/* ✅ When user selects YES */}
      {knowbgl === "1" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 items-start">
          {/* Height */}
          <div className="grid gap-4">
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Height (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="height"
                    name="height"
                    type="text"
                    required
                    placeholder="eg. 154"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={height}
                    onChange={(e) => updateFields({ height: e.target.value })}
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>

            {/* Weight */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Weight (kg)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="weight"
                    name="weight"
                    type="text"
                    required
                    placeholder="eg. 60"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={weight}
                    onChange={(e) => updateFields({ weight: e.target.value })}
                  />
                </InputGroup>
                <ButtonGroupText>kg</ButtonGroupText>
              </ButtonGroup>
            </div>

            {/* Waist */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Waist Circumference (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="waist"
                    name="waist"
                    type="text"
                    required
                    placeholder="eg. 35"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={waist}
                    onChange={(e) => updateFields({ waist: e.target.value })}
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>

            {/* Hip */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Hip Circumference (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="hip"
                    name="hip"
                    type="text"
                    required
                    placeholder="eg. 34"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={hip}
                    onChange={(e) => updateFields({ hip: e.target.value })}
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>
          </div>

          {/* Right side */}
          <div className="grid gap-4">
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Blood Pressure</Label>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Systolic</Label>

                  <ButtonGroup className="w-full">
                    <InputGroup className="flex">
                      <InputGroupInput
                        id="systolic"
                        name="systolic"
                        type="text"
                        required
                        placeholder="eg. 120/80"
                        className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                        value={systolic}
                        onChange={(e) =>
                          updateFields({ systolic: e.target.value })
                        }
                      />
                    </InputGroup>
                  </ButtonGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Diastolic</Label>

                  <ButtonGroup className="w-full">
                    <InputGroup className="flex">
                      <InputGroupInput
                        id="diastolic"
                        name="diastolic"
                        type="text"
                        required
                        placeholder="eg. 120/80"
                        className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                        value={diastolic}
                        onChange={(e) =>
                          updateFields({ diastolic: e.target.value })
                        }
                      />
                    </InputGroup>
                  </ButtonGroup>
                </div>
              </div>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>HbA1C</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="hba1c"
                    name="hba1c"
                    type="text"
                    required
                    placeholder="eg. 5.5"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={hba1c}
                    onChange={(e) => updateFields({ hba1c: e.target.value })}
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
                    id="fbs"
                    name="fbs"
                    type="text"
                    required
                    placeholder="eg. 100"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={fbs}
                    onChange={(e) => updateFields({ fbs: e.target.value })}
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
                    id="cholesterol"
                    name="cholesterol"
                    type="text"
                    required
                    placeholder="eg. 189"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={cholesterol}
                    onChange={(e) =>
                      updateFields({ cholesterol: e.target.value })
                    }
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
                    type="text"
                    required
                    placeholder="eg. 60"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={hdl}
                    onChange={(e) => updateFields({ hdl: e.target.value })}
                  />
                </InputGroup>
                <ButtonGroupText>mg/dL</ButtonGroupText>
              </ButtonGroup>
            </div>
          </div>
        </div>
      )}

      {/* ✅ When user selects NO */}
      {knowbgl === "0" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 items-start">
          <div className="grid gap-4">
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Height (cm)</Label>
              <ButtonGroup className="w-full">
                <InputGroup className="flex">
                  <InputGroupInput
                    id="height_no"
                    name="height"
                    type="text"
                    required
                    placeholder="eg. 154"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={height}
                    onChange={(e) => updateFields({ height: e.target.value })}
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
                    id="weight_no"
                    name="weight"
                    type="text"
                    required
                    placeholder="eg. 60"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={weight}
                    onChange={(e) => updateFields({ weight: e.target.value })}
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
                    id="waist_no"
                    name="waist"
                    type="text"
                    required
                    placeholder="eg. 35"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={waist}
                    onChange={(e) => updateFields({ waist: e.target.value })}
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
                    id="hip_no"
                    name="hip"
                    type="text"
                    required
                    placeholder="eg. 34"
                    className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                    value={hip}
                    onChange={(e) => updateFields({ hip: e.target.value })}
                  />
                </InputGroup>
                <ButtonGroupText>cm</ButtonGroupText>
              </ButtonGroup>
            </div>

            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label>Blood Pressure</Label>
              <div className="flex gap-4">
                <div className="flex flex-col gap-2">
                  <Label>Systolic</Label>

                  <ButtonGroup className="w-full">
                    <InputGroup className="flex">
                      <InputGroupInput
                        id="systolic"
                        name="systolic"
                        type="text"
                        required
                        placeholder="eg. 120/80"
                        className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                        value={systolic}
                        onChange={(e) =>
                          updateFields({ systolic: e.target.value })
                        }
                      />
                    </InputGroup>
                  </ButtonGroup>
                </div>
                <div className="flex flex-col gap-2">
                  <Label>Diastolic</Label>

                  <ButtonGroup className="w-full">
                    <InputGroup className="flex">
                      <InputGroupInput
                        id="diastolic"
                        name="diastolic"
                        type="text"
                        required
                        placeholder="eg. 120/80"
                        className="lg:text-base text-sm bg-gray-50 border-0 outline-none"
                        value={diastolic}
                        onChange={(e) =>
                          updateFields({ diastolic: e.target.value })
                        }
                      />
                    </InputGroup>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClinicalForm;
