
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import { FormValues } from "../types";

interface CareInstructionsFieldProps {
  control: UseFormReturn<FormValues>["control"];
}

export const CareInstructionsField = ({ control }: CareInstructionsFieldProps) => {
  return (
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
  );
};
