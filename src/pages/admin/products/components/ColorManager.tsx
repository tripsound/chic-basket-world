
import { UseFormReturn, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus } from "lucide-react";
import { FormValues } from "../types";

interface ColorManagerProps {
  form: UseFormReturn<FormValues>;
}

export const ColorManager = ({ form }: ColorManagerProps) => {
  const { register } = useFormContext();
  
  const addColor = () => {
    const colors = form.getValues("colors") || [];
    form.setValue("colors", [...colors, { name: "", available: true }]);
  };

  const removeColor = (index: number) => {
    const colors = form.getValues("colors");
    form.setValue(
      "colors",
      colors.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FormLabel>Colors*</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addColor}
        >
          <Plus size={16} className="mr-2" />
          Add Color
        </Button>
      </div>

      {form.getValues("colors")?.map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 mb-3"
        >
          <Input
            {...register(`colors.${index}.name` as const)}
            placeholder="Color name"
            className="flex-1"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`color-available-${index}`}
              checked={form.getValues(`colors.${index}.available`)}
              onCheckedChange={(checked) => {
                form.setValue(`colors.${index}.available`, !!checked);
              }}
            />
            <Label htmlFor={`color-available-${index}`}>Available</Label>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeColor(index)}
            className="text-red-500 hover:bg-red-50"
          >
            <X size={16} />
          </Button>
        </div>
      ))}
      {form.getValues("colors")?.length === 0 && (
        <p className="text-sm text-gray-500 italic">No colors added yet</p>
      )}
    </div>
  );
};
