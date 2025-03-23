
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface ProductDetailsFieldProps {
  control: UseFormReturn<FormValues>["control"];
}

export const ProductDetailsField = ({ control }: ProductDetailsFieldProps) => {
  return (
    <FormField
      control={control}
      name="details"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Product Details*</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder="Enter product details"
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
