
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { FormValues } from "../types";
import { ColorItem } from "./ColorItem";

interface ColorManagerProps {
  form: UseFormReturn<FormValues>;
}

export const ColorManager = ({ form }: ColorManagerProps) => {
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

      {form.getValues("colors")?.map((color, index) => (
        <ColorItem 
          key={index} 
          index={index} 
          form={form} 
          onRemove={() => removeColor(index)} 
        />
      ))}
      
      {form.getValues("colors")?.length === 0 && (
        <p className="text-sm text-gray-500 italic">No colors added yet</p>
      )}
    </div>
  );
};
