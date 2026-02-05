import React from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type FamilyFormProps = {
  fh_father: string;
  fh_mother: string;
  fh_sister: string;
  fh_brother: string;
  fh_extended: string;
  updateFields: (fields: Partial<FamilyFormProps>) => void;
};

const FamilyForm: React.FC<FamilyFormProps> = ({
  fh_father,
  fh_mother,
  fh_sister,
  fh_brother,
  fh_extended,
  updateFields,
}) => {
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
              value={fh_father}
              onValueChange={(value) => updateFields({ fh_father: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="1">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="3">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="4">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="5">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="2">Not sure</Label>
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
              value={fh_mother}
              onValueChange={(value) => updateFields({ fh_mother: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="1">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="3">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="4">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="5">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="2">Not sure</Label>
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
              value={fh_sister}
              onValueChange={(value) => updateFields({ fh_sister: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="1">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="3">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="4">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="5">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="2">Not sure</Label>
              </div>
            </RadioGroup>
          </div>
          {/* Brother */}
          <div className="grid gap-2 bg-white rounded-2xl p-5">
            <Label className="text-xl">
              Has your brother been diagnosed with Type 2 Diabetes? (if yes,
              indicate the age at dignosis.)
            </Label>
            <RadioGroup
              value={fh_brother}
              onValueChange={(value) => updateFields({ fh_brother: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="5" />
                <Label htmlFor="1">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="4" />
                <Label htmlFor="3">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="4">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="5">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="2">Not sure</Label>
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
              value={fh_extended}
              onValueChange={(value) => updateFields({ fh_extended: value })}
              defaultValue="comfortable"
              className="flex flex-col gap-3 ml-3 mt-3"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="3" />
                <Label htmlFor="3">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="2" />
                <Label htmlFor="1">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="1" />
                <Label htmlFor="2">Not sure</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyForm;
