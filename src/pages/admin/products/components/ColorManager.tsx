
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";
import { AttributeManager } from "./AttributeManager";
import { ColorItem } from "./ColorItem";

interface ColorManagerProps {
  form: UseFormReturn<FormValues>;
}

export const ColorManager = ({ form }: ColorManagerProps) => {
  return (
    <AttributeManager
      form={form}
      label="Colors"
      attributeType="colors"
      ItemComponent={ColorItem}
    />
  );
};
