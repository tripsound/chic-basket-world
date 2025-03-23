
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { FormValues } from "../types";
import { SizeItem } from "./SizeItem";

interface SizeManagerProps {
  form: UseFormReturn<FormValues>;
}

export const SizeManager = ({ form }: SizeManagerProps) => {
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

      {form.getValues("sizes")?.map((size, index) => (
        <SizeItem 
          key={index} 
          index={index} 
          form={form} 
          onRemove={() => removeSize(index)} 
        />
      ))}
      
      {form.getValues("sizes")?.length === 0 && (
        <p className="text-sm text-gray-500 italic">No sizes added yet</p>
      )}
    </div>
  );
};
