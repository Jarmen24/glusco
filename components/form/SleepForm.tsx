import React from "react";
import { Label } from "../ui/label";

import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type SleepFormProps = {
  sleep_hours: string;
  sleep_cigarette: string;
  sleep_alcohol: string;
  updateFields: (fields: Partial<SleepFormProps>) => void;
};

const SleepForm: React.FC<SleepFormProps> = ({
  sleep_hours,
  sleep_cigarette,
  sleep_alcohol,
  updateFields,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-3 mt-2">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-4xl  text-blue-950">
          Sleep and Lifestyle Habits
        </h1>
        <p className="text-sm md:text-lg lg:text-lg">
          Share how well you sleep and whether you smoke or drink. These details
          help us better understand your overall health.
        </p>
      </div>

      <div className="grid grid-cols-1  gap-4 mt-5 items-start">
        {/* Sleep Hours */}
        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label className="text-xl">
            How many hours of sleep do you usually get per night?
          </Label>
          <RadioGroup
            value={sleep_hours}
            onValueChange={(value) => updateFields({ sleep_hours: value })}
            defaultValue="comfortable"
            className="flex flex-col gap-3 ml-3 mt-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="4" id="sleepHours-4" />
              <Label htmlFor="4">Less than 5 hours</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="3" id="sleepHours-3" />
              <Label htmlFor="3">5-6 hours</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="2" id="sleepHours-2" />
              <Label htmlFor="2">7-8 hours</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="1" id="sleepHours-1" />
              <Label htmlFor="1">More than 8 hours</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Cigarette */}
        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label className="text-xl">Do you smoke cigarettes or vape? </Label>
          <RadioGroup
            value={sleep_cigarette}
            onValueChange={(value) => updateFields({ sleep_cigarette: value })}
            defaultValue="comfortable"
            className="flex flex-col gap-3 ml-3 mt-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="1" id="cigarette-1" />
              <Label htmlFor="1">Never</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="2" id="cigarette-2" />
              <Label htmlFor="2">Occasionally</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="3" id="cigarette-3" />
              <Label htmlFor="4">Regularly</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="4" id="cigarette-4" />
              <Label htmlFor="3">Former Smoker</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Alcohol */}
        <div className="grid gap-2 bg-white rounded-2xl p-5">
          <Label className="text-xl">Do you consume alcohol? </Label>
          <RadioGroup
            value={sleep_alcohol}
            onValueChange={(value) => updateFields({ sleep_alcohol: value })}
            defaultValue="comfortable"
            className="flex flex-col gap-3 ml-3 mt-3"
          >
            <div className="flex items-center gap-3">
              <RadioGroupItem value="1" id="alcohol-1" />
              <Label htmlFor="1">Never</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="2" id="alcohol-2" />
              <Label htmlFor="2">Occasionally</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="3" id="alcohol-3" />
              <Label htmlFor="3">Weekly</Label>
            </div>
            <div className="flex items-center gap-3">
              <RadioGroupItem value="4" id="alcohol-4" />
              <Label htmlFor="4">Almost Daily</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
};

export default SleepForm;
