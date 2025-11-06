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

const ExerciseForm = () => {
  const [exerciseFormAnswers, setExerciseFormAnswers] = useState({
    doesExercise: "2",
    exercise_times: "4",
    exercise_duration: "5",
    sitting: "",
    main_activity: "",
    mode_of_transpo: "",
  });

  const handleValueChange = (key: string, value: string) => {
    setExerciseFormAnswers((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div>
      <div className="flex flex-col gap-3 mt-2">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-4xl  text-blue-950">
          Let's Check Your Activity Level
        </h1>
        <p className="text-sm md:text-lg lg:text-lg">
          Tell us how often you stay active. Every step counts toward
          understanding your overall health.
        </p>
      </div>
      <div className="grid gap-2 bg-white rounded-2xl p-5">
        <Label className="text-xl">Do you exercise?</Label>
        <RadioGroup
          value={exerciseFormAnswers.doesExercise}
          onValueChange={(val) => {
            handleValueChange("doesExercise", val);
          }}
          defaultValue="comfortable"
          className="flex flex-col gap-3 ml-3 mt-3"
        >
          <div className="flex flex-col lg:flex-row gap-3 w-full">
            {/* YES OPTION */}
            <Label
              htmlFor="1"
              className={`flex w-full gap-3 border-2 rounded-2xl p-3 items-center cursor-pointer transition
                            ${
                              exerciseFormAnswers.doesExercise === "1"
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
              htmlFor="2"
              className={`flex w-full gap-3 border-2 rounded-2xl p-3 items-center cursor-pointer transition ${
                exerciseFormAnswers.doesExercise === "2"
                  ? "border-red-600 bg-red-100"
                  : "bg-red-50"
              }`}
            >
              <RadioGroupItem
                value="2"
                id="2"
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
      {exerciseFormAnswers.doesExercise === "1" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 items-start">
          {/* Left side */}
          <div className="grid gap-4">
            {/* Exercise Times */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label className="text-xl">How often do you exercise?</Label>
              <RadioGroup
                value={exerciseFormAnswers.exercise_times}
                onValueChange={(val) =>
                  handleValueChange("exercise_times", val)
                }
                defaultValue="comfortable"
                className="flex flex-col gap-3 ml-3 mt-3"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3">1-2 times per week</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="2" id="2" />
                  <Label htmlFor="2">3-4 times per week</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="1" id="1" />
                  <Label htmlFor="1">5 or more times per week</Label>
                </div>
              </RadioGroup>
            </div>
            {/* Exercise Duration */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label className="text-xl">
                On average, how long is each session of physical activity?
              </Label>
              <RadioGroup
                value={exerciseFormAnswers.exercise_duration}
                onValueChange={(val) =>
                  handleValueChange("exercise_duration", val)
                }
                defaultValue="comfortable"
                className="flex flex-col gap-3 ml-3 mt-3"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="4" id="4" />
                  <Label htmlFor="4">Less than 15 minutes</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3">15-30 minutes</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="2" id="2" />
                  <Label htmlFor="2">30-60 minutes</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="1" id="1" />
                  <Label htmlFor="1">More than 60 minutes</Label>
                </div>
              </RadioGroup>
            </div>
            {/* Sitting */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label className="text-xl">
                How many hours per day do you spend sitting or sedentary (e.g.,
                desk work, TV, gaming)?
              </Label>
              <RadioGroup
                value={exerciseFormAnswers.sitting}
                onValueChange={(val) => handleValueChange("sitting", val)}
                defaultValue="comfortable"
                className="flex flex-col gap-3 ml-3 mt-3"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="1" id="1" />
                  <Label htmlFor="1">Less than 3 hours</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="2" id="2" />
                  <Label htmlFor="2">3-6 hours</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3">6-9 hours</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="4" id="4" />
                  <Label htmlFor="4">More than 9 hours</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <div className="grid gap-4">
            {/* Main Activity */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label className="text-xl">
                What best describes your main activity?
              </Label>
              <RadioGroup
                value={exerciseFormAnswers.main_activity}
                onValueChange={(val) => handleValueChange("main_activity", val)}
                defaultValue="comfortable"
                className="flex flex-col gap-3 ml-3 mt-3"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="5" id="5" />
                  <Label htmlFor="5">
                    Mostly sedentary (sitting most of the day)
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="4" id="4" />
                  <Label htmlFor="4">Light standing or walking</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3">
                    Moderate physical activity (e.g. regular walking or light
                    work)
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="4" id="4" />
                  <Label htmlFor="4">
                    Vigorous physical activity (e.g. heavy work)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Transportation */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label className="text-xl">
                What is your primary mode of transportation when going to school
                or places?
              </Label>
              <RadioGroup
                value={exerciseFormAnswers.mode_of_transpo}
                onValueChange={(val) =>
                  handleValueChange("mode_of_transpo", val)
                }
                defaultValue="comfortable"
                className="flex flex-col gap-3 ml-3 mt-3"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="1" id="1" />
                  <Label htmlFor="1">Walking</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="2" id="2" />
                  <Label htmlFor="2">Biking</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3">
                    Public Transport (jeepney, bus, train, etc.)
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="4" id="4" />
                  <Label htmlFor="4">Private Vehicle (car, motorcycle)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      )}

      {exerciseFormAnswers.doesExercise === "2" && (
        <div className="grid grid-cols-1  gap-4 mt-5 items-start">
          {/* Sitting */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              How many hours per day do you spend sitting or sedentary (e.g.,
              desk work, TV, gaming)?
            </Label>
            <RadioGroup
              value={exerciseFormAnswers.sitting}
              onValueChange={(val) => handleValueChange("sitting", val)}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Less than 3 hours</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">3-6 hours</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">6-9 hours</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">More than 9 hours</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="grid gap-4">
            {/* Main Activity */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label className="text-xl">
                What best describes your main activity?
              </Label>
              <RadioGroup
                value={exerciseFormAnswers.main_activity}
                onValueChange={(val) => handleValueChange("main_activity", val)}
                defaultValue="comfortable"
                className="flex flex-col gap-3 ml-3 mt-3"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="5" id="5" />
                  <Label htmlFor="5">
                    Mostly sedentary (sitting most of the day)
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="4" id="4" />
                  <Label htmlFor="4">Light standing or walking</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3">
                    Moderate physical activity (e.g. regular walking or light
                    work)
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="2" id="2" />
                  <Label htmlFor="2">
                    Vigorous physical activity (e.g. heavy work)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Transportation */}
            <div className="grid gap-2 bg-white rounded-2xl p-5">
              <Label className="text-xl">
                What is your primary mode of transportation when going to school
                or places?
              </Label>
              <RadioGroup
                value={exerciseFormAnswers.mode_of_transpo}
                onValueChange={(val) =>
                  handleValueChange("mode_of_transpo", val)
                }
                defaultValue="comfortable"
                className="flex flex-col gap-3 ml-3 mt-3"
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="1" id="1" />
                  <Label htmlFor="1">Walking</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="2" id="2" />
                  <Label htmlFor="2">Biking</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="3" id="3" />
                  <Label htmlFor="3">
                    Public Transport (jeepney, bus, train, etc.)
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="4" id="4" />
                  <Label htmlFor="4">Private Vehicle (car, motorcycle)</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseForm;
