import React from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Checkbox } from "../ui/checkbox";

interface ExerciseFormProps {
  exercise_times: string;
  exercise_duration: string;
  sitting: string;
  main_activity: string;
  mode_of_transpo: string;
  doesExercise: string;
  exercise_types?: string[];
  updateFields: (fields: Partial<ExerciseFormProps>) => void;
}

const exerciseOptions = [
  "Brisk Walking",
  "Swimming",
  "Cycling",
  "Jogging",
  "Running",
  "Sports",
  "Dancing",
  "Hiking",
  "Jump rope",
  "Lifting weights",
  "Bodyweight exercises",
  "Flexibility (Yoga, Pilates)",
  "Other",
];

const ExerciseForm: React.FC<ExerciseFormProps> = ({
  doesExercise,
  exercise_times,
  exercise_duration,
  sitting,
  main_activity,
  mode_of_transpo,
  exercise_types = [],
  updateFields,
}) => {
  const toggleExercise = (item: string) => {
    const newExercises = exercise_types.includes(item)
      ? exercise_types.filter((i) => i !== item)
      : [...exercise_types, item];
    updateFields({ exercise_types: newExercises });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 mt-2">
        <h1 className="font-bold text-2xl md:text-4xl text-blue-950">
          {`Let's Check Your Activity Level`}
        </h1>
        <p className="text-sm md:text-lg">
          Tell us how often you stay active. Every step counts toward
          understanding your overall health.
        </p>
      </div>

      {/* Main Exercise Toggle */}
      <div className="grid gap-2 bg-white rounded-2xl p-5 shadow-sm">
        <Label className="text-xl">Do you exercise?</Label>
        <RadioGroup
          value={doesExercise}
          onValueChange={(value) => {
            if (value === "2") {
              updateFields({
                doesExercise: value,
                exercise_types: [],
                exercise_times: "4", // Matching your INITIAL_DATA defaults
                exercise_duration: "5",
              });
            } else {
              updateFields({ doesExercise: value });
            }
          }}
          className="flex flex-col lg:flex-row gap-3 mt-3"
        >
          <Label
            htmlFor="ex-yes"
            className={`flex w-full gap-3 border-2 rounded-2xl p-4 items-center cursor-pointer transition ${doesExercise === "1" ? "border-blue-600 bg-blue-100" : "bg-blue-50"}`}
          >
            <RadioGroupItem value="1" id="ex-yes" className="size-5" />
            <span className="text-lg text-blue-950 font-medium">Yes</span>
          </Label>
          <Label
            htmlFor="ex-no"
            className={`flex w-full gap-3 border-2 rounded-2xl p-4 items-center cursor-pointer transition ${doesExercise === "2" ? "border-red-600 bg-red-100" : "bg-red-50"}`}
          >
            <RadioGroupItem value="2" id="ex-no" className="size-5" />
            <span className="text-lg text-blue-950 font-medium">No</span>
          </Label>
        </RadioGroup>
      </div>

      {/* SECTION 1: Exercise Specifics (Only if Yes) */}
      {doesExercise === "1" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-white rounded-2xl p-5 shadow-sm col-span-full">
            <Label className="text-xl mb-4 block">
              Types of exercise (Check all that apply)
            </Label>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {exerciseOptions.map((option) => (
                <div
                  key={option}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition border"
                >
                  <Checkbox
                    id={option}
                    checked={exercise_types.includes(option)}
                    onCheckedChange={() => toggleExercise(option)}
                  />
                  <label
                    htmlFor={option}
                    className="text-sm font-medium cursor-pointer"
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <Label className="text-xl">How often do you exercise?</Label>
            <RadioGroup
              value={exercise_times}
              onValueChange={(v) => updateFields({ exercise_times: v })}
              className="mt-4 gap-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="3" id="t1" />
                <Label htmlFor="t1">1-2 times per week</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="2" id="t2" />
                <Label htmlFor="t2">3-4 times per week</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="1" id="t3" />
                <Label htmlFor="t3">5+ times per week</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <Label className="text-xl">Average duration per session?</Label>
            <RadioGroup
              value={exercise_duration}
              onValueChange={(v) => updateFields({ exercise_duration: v })}
              className="mt-4 gap-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="4" id="d1" />
                <Label htmlFor="d1">Less than 15 min</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="3" id="d2" />
                <Label htmlFor="d2">15-30 min</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="2" id="d3" />
                <Label htmlFor="d3">30-60 min</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="1" id="d4" />
                <Label htmlFor="d4">60+ min</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )}

      {/* SECTION 2: General Activity (Shown for both Yes/No once answered) */}
      {doesExercise !== "" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-10 animate-in fade-in duration-500">
          {/* Sitting Duration */}
          <div className="bg-white rounded-2xl p-5 shadow-sm col-span-full">
            <Label className="text-xl">
              How many hours per day do you spend sitting (desk, TV, gaming)?
            </Label>
            <RadioGroup
              value={sitting}
              onValueChange={(v) => updateFields({ sitting: v })}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4"
            >
              <div className="flex items-center gap-2 border p-3 rounded-xl">
                <RadioGroupItem value="1" id="s1" />
                <Label htmlFor="s1">Less than 3 hours</Label>
              </div>
              <div className="flex items-center gap-2 border p-3 rounded-xl">
                <RadioGroupItem value="2" id="s2" />
                <Label htmlFor="s2">3-6 hours</Label>
              </div>
              <div className="flex items-center gap-2 border p-3 rounded-xl">
                <RadioGroupItem value="3" id="s3" />
                <Label htmlFor="s3">6-9 hours</Label>
              </div>
              <div className="flex items-center gap-2 border p-3 rounded-xl">
                <RadioGroupItem value="4" id="s4" />
                <Label htmlFor="s4">More than 9 hours</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Main Activity Description */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <Label className="text-xl">
              What best describes your main activity?
            </Label>
            <RadioGroup
              value={main_activity}
              onValueChange={(v) => updateFields({ main_activity: v })}
              className="mt-4 gap-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="4" id="ma1" />
                <Label htmlFor="ma1">Mostly sedentary</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="3" id="ma2" />
                <Label htmlFor="ma2">Light standing or walking</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="2" id="ma3" />
                <Label htmlFor="ma3">Moderate physical activity</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="1" id="ma4" />
                <Label htmlFor="ma4">Vigorous physical activity</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Mode of Transportation */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border">
            <Label className="text-xl">Primary mode of transportation?</Label>
            <RadioGroup
              value={mode_of_transpo}
              onValueChange={(v) => updateFields({ mode_of_transpo: v })}
              className="mt-4 gap-3"
            >
              <div className="flex items-center gap-2">
                <RadioGroupItem value="1" id="mt1" />
                <Label htmlFor="mt1">Walking</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="2" id="mt2" />
                <Label htmlFor="mt2">Biking</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="3" id="mt3" />
                <Label htmlFor="mt3">Public Transport</Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="4" id="mt4" />
                <Label htmlFor="mt4">Private Vehicle</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseForm;
