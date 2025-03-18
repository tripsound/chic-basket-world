
import { UseFormReturn, useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus } from "lucide-react";
import { FormValues } from "../types";

interface SizeManagerProps {
  form: UseFormReturn<FormValues>;
}

export const SizeManager = ({ form }: SizeManagerProps) => {
  const { register } = useFormContext();
  
  const addSize = () => {
    const sizes = form.getValues("sizes") || [];
    form.setValue("sizes", [...sizes, { name: "", available: true }]);
  };

  const removeSize = (index: number) => {
    const sizes = form.getValues("sizes");
    form.setValue(
      "sizes",
      sizes.filter((_, i) => i !== index)
    );
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FormLabel>Sizes*</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addSize}
        >
          <Plus size={16} className="mr-2" />
          Add Size
        </Button>
      </div>

      {form.getValues("sizes")?.map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 mb-3"
        >
          <Input
            {...register(`sizes.${index}.name` as const)}
            placeholder="Size name"
            className="flex-1"
          />
          <div className="flex items-center space-x-2">
            <Checkbox
              id={`size-available-${index}`}
              checked={form.getValues(`sizes.${index}.available`)}
              onCheckedChange={(checked) => {
                form.setValue(`sizes.${index}.available`, !!checked);
              }}
            />
            <Label htmlFor={`size-available-${index}`}>Available</Label>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => removeSize(index)}
            className="text-red-500 hover:bg-red-50"
          >
            <X size={16} />
          </Button>
        </div>
      ))}
      {form.getValues("sizes")?.length === 0 && (
        <p className="text-sm text-gray-500 italic">No sizes added yet</p>
      )}
    </div>
  );
};
