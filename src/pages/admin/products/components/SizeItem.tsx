
import { UseFormReturn, useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { FormValues } from "../types";

interface SizeItemProps {
  index: number;
  form: UseFormReturn<FormValues>;
  onRemove: () => void;
}

export const SizeItem = ({ index, form, onRemove }: SizeItemProps) => {
  const { register } = useFormContext();
  
  return (
    <div className="flex items-center space-x-3 mb-3">
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
        onClick={onRemove}
        className="text-red-500 hover:bg-red-50"
      >
        <X size={16} />
      </Button>
    </div>
  );
};
