import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { FormValues } from "../types";
import { ColorItem } from "./ColorItem";
import { useState, useCallback } from "react";

interface ColorManagerProps {
  form: UseFormReturn<FormValues>;
}

export const ColorManager = ({ form }: ColorManagerProps) => {
  const [colors, setColors] = useState<Array<{ name: string; available: boolean }>>(
    form.getValues("colors") || []
  );

  const addColor = useCallback(() => {
    const newColors = [...colors, { name: "", available: true }];
    setColors(newColors);
    form.setValue("colors", newColors);
  }, [colors, form]);

  const removeColor = useCallback((index: number) => {
    const newColors = colors.filter((_, i) => i !== index);
    setColors(newColors);
    form.setValue("colors", newColors);
  }, [colors, form]);

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

      {colors.map((color, index) => (
        <ColorItem 
          key={index} 
          index={index} 
          form={form} 
          onRemove={() => removeColor(index)} 
        />
      ))}
      
      {colors.length === 0 && (
        <p className="text-sm text-gray-500 italic">No colors added yet</p>
      )}
    </div>
  );
};
