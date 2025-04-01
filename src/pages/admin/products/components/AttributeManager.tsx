
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { FormValues } from "../types";
import { ReactNode } from "react";

interface AttributeItemProps {
  index: number;
  form: UseFormReturn<FormValues>;
  onRemove: () => void;
}

interface AttributeManagerProps {
  form: UseFormReturn<FormValues>;
  label: string;
  attributeType: "colors" | "sizes";
  ItemComponent: React.ComponentType<AttributeItemProps>;
}

export const AttributeManager = ({ 
  form, 
  label, 
  attributeType, 
  ItemComponent 
}: AttributeManagerProps) => {
  const attributes = form.getValues(attributeType) || [];
  
  const addAttribute = () => {
    const newAttributes = [...attributes, { name: "", available: true }];
    form.setValue(attributeType, newAttributes);
  };

  const removeAttribute = (index: number) => {
    const newAttributes = attributes.filter((_, i) => i !== index);
    form.setValue(attributeType, newAttributes);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <FormLabel>{label}*</FormLabel>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addAttribute}
        >
          <Plus size={16} className="mr-2" />
          Add {label.slice(0, -1)} {/* Remove 's' from the end */}
        </Button>
      </div>

      {attributes.map((_, index) => (
        <ItemComponent 
          key={index} 
          index={index} 
          form={form} 
          onRemove={() => removeAttribute(index)} 
        />
      ))}
      
      {attributes.length === 0 && (
        <p className="text-sm text-gray-500 italic">No {label.toLowerCase()} added yet</p>
      )}
    </div>
  );
};
