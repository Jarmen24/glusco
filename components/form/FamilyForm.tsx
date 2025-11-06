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

const FamilyForm = () => {
  const [familyFormAnswers, setFamilyFormAnswers] = useState({
    father: "",
    mother: "",
    sister: "",
    brother: "",
    child: "",
    extended: "",
    concerned: "",
  });

  const handleValueChange = (key: string, value: string) => {
    setFamilyFormAnswers((prev) => ({ ...prev, [key]: value }));
  };
  return (
    <div>
      <div className="flex flex-col gap-3 mt-2">
        <h1 className="font-bold text-2xl md:text-4xl lg:text-4xl  text-blue-950">
          Your Family Health Background
        </h1>
        <p className="text-sm md:text-lg lg:text-lg">
          Tell us if anyone in your family has diabetes or related conditions.
          Family history helps us understand your inherited risk.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-5 items-start">
        {/* Left side */}
        <div className="grid gap-4">
          {/* Father */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              Has your father been diagnosed with Type 2 Diabetes? (if yes,
              indicate the age at dignosis.)
            </Label>
            <RadioGroup
              value={familyFormAnswers.father}
              onValueChange={(val) => handleValueChange("father", val)}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Not sure</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Mother */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              Has your mother been diagnosed with Type 2 Diabetes? (if yes,
              indicate the age at dignosis.)
            </Label>
            <RadioGroup
              value={familyFormAnswers.mother}
              onValueChange={(val) => handleValueChange("mother", val)}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Not sure</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Sister */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              Has your sister been diagnosed with Type 2 Diabetes? (if yes,
              indicate the age at dignosis.)
            </Label>
            <RadioGroup
              value={familyFormAnswers.sister}
              onValueChange={(val) => handleValueChange("sister", val)}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Not sure</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Brother */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              Has your sister been diagnosed with Type 2 Diabetes? (if yes,
              indicate the age at dignosis.)
            </Label>
            <RadioGroup
              value={familyFormAnswers.brother}
              onValueChange={(val) => handleValueChange("brother", val)}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="5">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Not sure</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <div className="grid gap-4">
          {/* extended */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              Has anyone in your extended family (grandparents, aunts, uncles,
              cousins) been diagnosed with Type 2 Diabetes?
            </Label>
            <RadioGroup
              value={familyFormAnswers.extended}
              onValueChange={(val) => handleValueChange("extended", val)}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Not sure</Label>
              </div>
            </RadioGroup>
          </div>
          {/* extended */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              How concerned are you about developing Type 2 Diabetes because of
              your family history?  
            </Label>
            <RadioGroup
              value={familyFormAnswers.concerned}
              onValueChange={(val) => handleValueChange("concerned", val)}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="4">Very Concerned</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Somewhat Concerned</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="2">Slightly Concerned</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="1">Not Concerned</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyForm;
