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
                <RadioGroupItem value="5" id="father-5" />
                <Label htmlFor="father-5">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="father-4" />
                <Label htmlFor="father-4">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="father-3" />
                <Label htmlFor="father-3">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="father-2" />
                <Label htmlFor="father-2">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="father-1" />
                <Label htmlFor="father-1">Not sure</Label>
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
                <RadioGroupItem value="5" id="mother-5" />
                <Label htmlFor="mother-5">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="mother-4" />
                <Label htmlFor="mother-4">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="mother-3" />
                <Label htmlFor="mother-3">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="mother-2" />
                <Label htmlFor="mother-2">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="mother-1" />
                <Label htmlFor="mother-1">Not sure</Label>
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
                <RadioGroupItem value="5" id="sister-5" />
                <Label htmlFor="sister-5">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="sister-4" />
                <Label htmlFor="sister-4">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="sister-3" />
                <Label htmlFor="sister-3">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="sister-2" />
                <Label htmlFor="sister-2">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="sister-1" />
                <Label htmlFor="sister-1">Not sure</Label>
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
                <RadioGroupItem value="5" id="brother-5" />
                <Label htmlFor="brother-5">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="brother-4" />
                <Label htmlFor="brother-4">Yes, before 40</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="brother-3" />
                <Label htmlFor="brother-3">Yes, 40-59</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="brother-2" />
                <Label htmlFor="brother-2">Yes, 60 or older</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="brother-1" />
                <Label htmlFor="brother-1">Not sure</Label>
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
                <RadioGroupItem value="3" id="extended-3" />
                <Label htmlFor="extended-3">Yes</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="extended-2" />
                <Label htmlFor="extended-2">No</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="extended-1" />
                <Label htmlFor="extended-1">Not sure</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyForm;
