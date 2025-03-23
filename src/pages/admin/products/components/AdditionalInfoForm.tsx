
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";
import { ProductDetailsField } from "./ProductDetailsField";
import { CareInstructionsField } from "./CareInstructionsField";
import { ShippingInfoField } from "./ShippingInfoField";

interface AdditionalInfoFormProps {
  control: UseFormReturn<FormValues>["control"];
}

export const AdditionalInfoForm = ({ control }: AdditionalInfoFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ProductDetailsField control={control} />
      <CareInstructionsField control={control} />
      <ShippingInfoField control={control} />
    </div>
  );
};
