
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseFormReturn } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FormValues } from "../types";
import { Json } from "@/integrations/supabase/types";

export const useProductForm = (form: UseFormReturn<FormValues>, productId: string | undefined) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      // Basic validation
      if (!values.name || !values.price || !values.category || !values.description) {
        toast.error("Please fill in all required fields");
        setIsSubmitting(false);
        return;
      }

      // Ensure all required fields have values
      if (!values.details || !values.care || !values.shipping) {
        toast.error("Please fill in all required fields (details, care, shipping)");
        setIsSubmitting(false);
        return;
      }

      // Validate that colors and sizes are added
      if (values.colors.length === 0) {
        toast.error("Please add at least one color");
        setIsSubmitting(false);
        return;
      }

      if (values.sizes.length === 0) {
        toast.error("Please add at least one size");
        setIsSubmitting(false);
        return;
      }

      // Validate that images are added
      if (values.images.length === 0) {
        toast.error("Please add at least one product image");
        setIsSubmitting(false);
        return;
      }

      // Convert form values to the format expected by Supabase
      const productData = {
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        sale_price: values.sale_price ? parseFloat(values.sale_price) : null,
        category: values.category,
        colors: values.colors as unknown as Json,
        sizes: values.sizes as unknown as Json,
        images: values.images,
        details: values.details,
        care: values.care,
        shipping: values.shipping,
        featured: values.featured,
        new: values.new,
        sale: values.sale,
        updated_at: new Date().toISOString(),
      };

      if (productId && productId !== "new") {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", productId);

        if (error) {
          console.error("Supabase error:", error);
          throw new Error(error.message || "Failed to update product");
        }
        toast.success("Product updated successfully");
      } else {
        // Create new product
        const { error } = await supabase
          .from("products")
          .insert(productData);

        if (error) {
          console.error("Supabase error:", error);
          throw new Error(error.message || "Failed to create product");
        }
        toast.success("Product created successfully");
      }

      navigate("/admin/products");
    } catch (error: any) {
      console.error("Error saving product:", error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    onSubmit
  };
};
