
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface ShippingInfoFieldProps {
  control: UseFormReturn<FormValues>["control"];
}

export const ShippingInfoField = ({ control }: ShippingInfoFieldProps) => {
  return (
    <FormField
      control={control}
      name="shipping"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Shipping Information*</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Enter shipping information"
              className="min-h-24"
              required
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
