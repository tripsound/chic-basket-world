
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface AdditionalInfoFormProps {
  control: UseFormReturn<FormValues>["control"];
}

export const AdditionalInfoForm = ({ control }: AdditionalInfoFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

      <FormField
        control={control}
        name="care"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Care Instructions*</FormLabel>
            <FormControl>
              <Textarea
                {...field}
                placeholder="Enter care instructions"
                className="min-h-24"
                required
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

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
    </div>
  );
};
