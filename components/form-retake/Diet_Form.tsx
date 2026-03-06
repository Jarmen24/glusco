import React from "react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

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
          Lets Talk About Your Diet
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
                <RadioGroupItem value="5" id="fruits-5" />
                <Label htmlFor="fruits-5">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="fruits-4" />
                <Label htmlFor="fruits-4">
                  Rarely (less than 3 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="fruits-3" />
                <Label htmlFor="fruits-3">
                  Occasionally (3-5 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="fruits-2" />
                <Label htmlFor="fruits-2">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="fruits-1" />
                <Label htmlFor="fruits-1">Daily (3+servings/day)</Label>
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
                <RadioGroupItem value="5" id="veg-5" />
                <Label htmlFor="veg-5">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="veg-4" />
                <Label htmlFor="veg-4">
                  Rarely (less than 3 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="veg-3" />
                <Label htmlFor="veg-3">Occasionally (3-5 servings/week)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="veg-2" />
                <Label htmlFor="veg-2">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="1" id="veg-1" />
                <Label htmlFor="veg-1">Daily (3+servings/day)</Label>
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
                <RadioGroupItem value="1" id="sweets-1" />
                <Label htmlFor="sweets-1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="sweets-2" />
                <Label htmlFor="sweets-2">
                  Rarely (less than 3 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="sweets-3" />
                <Label htmlFor="sweets-3">
                  Occasionally (3-5 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="sweets-4" />
                <Label htmlFor="sweets-4">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="sweets-5" />
                <Label htmlFor="sweets-5">Daily (3+servings/day)</Label>
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
                <RadioGroupItem value="1" id="fried-1" />
                <Label htmlFor="fried-1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="fried-2" />
                <Label htmlFor="fried-2">
                  Rarely (less than 3 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="fried-3" />
                <Label htmlFor="fried-3">
                  Occasionally (3-5 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="fried-4" />
                <Label htmlFor="fried-4">Frequently (1-2 servings/day)</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="fried-5" />
                <Label htmlFor="fried-5">Daily (3+servings/day)</Label>
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
                <RadioGroupItem value="1" id="fastfood-1" />
                <Label htmlFor="fastfood-1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="fastfood-2" />
                <Label htmlFor="fastfood-2">
                  Rarely (less than 3 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="fastfood-3" />
                <Label htmlFor="fastfood-3">
                  Occasionally (3-5 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="fastfood-4" />
                <Label htmlFor="fastfood-4">
                  Frequently (1-2 servings/day)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="fastfood-5" />
                <Label htmlFor="fastfood-5">Daily (3+servings/day)</Label>
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
                <RadioGroupItem value="1" id="processed-1" />
                <Label htmlFor="processed-1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="processed-2" />
                <Label htmlFor="processed-2">
                  Rarely (less than 3 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="processed-3" />
                <Label htmlFor="processed-3">
                  Occasionally (3-5 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="processed-4" />
                <Label htmlFor="processed-4">
                  Frequently (1-2 servings/day)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="processed-5" />
                <Label htmlFor="processed-5">Daily (3+servings/day)</Label>
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
                <RadioGroupItem value="1" id="softdrink-1" />
                <Label htmlFor="softdrink-1">Never</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="softdrink-2" />
                <Label htmlFor="softdrink-2">
                  Rarely (less than 3 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="softdrink-3" />
                <Label htmlFor="softdrink-3">
                  Occasionally (3-5 servings/week)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="4" id="softdrink-4" />
                <Label htmlFor="softdrink-4">
                  Frequently (1-2 servings/day)
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="5" id="softdrink-5" />
                <Label htmlFor="softdrink-5">Daily (3+servings/day)</Label>
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
                <RadioGroupItem value="1" id="weight-1" />
                <Label htmlFor="weight-1">Yes, Successfully</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="2" id="weight-2" />
                <Label htmlFor="weight-2">Yes, but no significant change</Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value="3" id="weight-3" />
                <Label htmlFor="weight-3">No attempt</Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DietForm;
