
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";
import { AttributeManager } from "./AttributeManager";
import { SizeItem } from "./SizeItem";

interface SizeManagerProps {
  form: UseFormReturn<FormValues>;
}

export const SizeManager = ({ form }: SizeManagerProps) => {
  return (
    <AttributeManager
      form={form}
      label="Sizes"
      attributeType="sizes"
      ItemComponent={SizeItem}
    />
  );
};
