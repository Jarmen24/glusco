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

interface DietFormProps {
  fruits: string;
  vegetables: string;
  fried: string;
  sweets: string;
  fastfood: string;
  processed: string;
  softdrink: string;
  weight_concern: string;
  updateFields: (fields: Partial<DietFormProps>) => void;
}

const DietForm: React.FC<DietFormProps> = ({
  fruits,
  vegetables,
  fried,
  sweets,
  fastfood,
  processed,
  softdrink,
  weight_concern,
  updateFields,
}) => {
  return (
    <div>
      <div className="flex flex-col gap-3 mt-2">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-4xl  text-blue-950">
          Let's Talk About Your Diet
        </h1>
        <p className="text-sm md:text-lg lg:text-lg">
          Share your eating habits so we can better understand your lifestyle
          and how it impacts your health.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 items-start">
        {/* Left side */}
        <div className="grid gap-4">
          {/* Fruits */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">How often do you consume fruits?</Label>
            <RadioGroup
              value={fruits}
              onValueChange={(value) => updateFields({ fruits: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Rarely (less than 3 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Occasionally (3-5 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Daily (3+servings/day)</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Vegetables */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              How often do you consume vegetables?
            </Label>
            <RadioGroup
              value={vegetables}
              onValueChange={(value) => updateFields({ vegetables: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Rarely (less than 3 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Occasionally (3-5 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Daily (3+servings/day)</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Sweets */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">How often do you eat sweets?</Label>
            <RadioGroup
              value={sweets}
              onValueChange={(value) => updateFields({ sweets: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Rarely (less than 3 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Occasionally (3-5 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">Daily (3+servings/day)</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Fried */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">How often do you eat fried foods?</Label>
            <RadioGroup
              value={fried}
              onValueChange={(value) => updateFields({ fried: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Rarely (less than 3 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Occasionally (3-5 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">Daily (3+servings/day)</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="grid gap-4">
          {/* Fast Food */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              How often do you eat fast foods (e.g Jollibee)?
            </Label>
            <RadioGroup
              value={fastfood}
              onValueChange={(value) => updateFields({ fastfood: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Rarely (less than 3 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Occasionally (3-5 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">Daily (3+servings/day)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Processed */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              How often do you eat processed foods (e.g. hotdog, sausage, bacon,
              canned meat)?
            </Label>
            <RadioGroup
              value={processed}
              onValueChange={(value) => updateFields({ processed: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Rarely (less than 3 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Occasionally (3-5 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">Daily (3+servings/day)</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Softdrinks */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              How often do you consume sugar-sweetened drinks (soft drinks,
              sweetened coffee/tea, juice)?
            </Label>
            <RadioGroup
              value={softdrink}
              onValueChange={(value) => updateFields({ softdrink: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Rarely (less than 3 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Occasionally (3-5 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">Daily (3+servings/day)</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Weight */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              Have you tried to lose or maintain weight in the past 6 months?
            </Label>
            <RadioGroup
              value={weight_concern}
              onValueChange={(value) => updateFields({ weight_concern: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Yes, Successfully</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Yes, but no significant change</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">No attempt</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietForm;
