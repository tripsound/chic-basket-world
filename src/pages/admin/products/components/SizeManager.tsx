import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { FormValues } from "../types";
import { SizeItem } from "./SizeItem";
import { useState, useCallback } from "react";

interface SizeManagerProps {
  form: UseFormReturn<FormValues>;
}

export const SizeManager = ({ form }: SizeManagerProps) => {
  // Keep track of sizes state locally to prevent re-renders
  const [sizes, setSizes] = useState<Array<{ name: string; available: boolean }>>(
    form.getValues("sizes") || []
  );

  // Use useCallback to memoize functions
  const addSize = useCallback(() => {
    const newSizes = [...sizes, { name: "", available: true }];
    setSizes(newSizes);
    form.setValue("sizes", newSizes);
  }, [sizes, form]);

  const removeSize = useCallback((index: number) => {
    const newSizes = sizes.filter((_, i) => i !== index);
    setSizes(newSizes);
    form.setValue("sizes", newSizes);
  }, [sizes, form]);

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

      {sizes.map((size, index) => (
        <SizeItem 
          key={index} 
          index={index} 
          form={form} 
          onRemove={() => removeSize(index)} 
        />
      ))}
      
      {sizes.length === 0 && (
        <p className="text-sm text-gray-500 italic">No sizes added yet</p>
      )}
    </div>
  );
};
