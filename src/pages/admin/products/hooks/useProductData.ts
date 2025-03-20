
import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { FormValues, ColorSize } from "../types";

export const useProductData = (form: UseFormReturn<FormValues>, productId: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId || productId === "new") return;

      setLoading(true);
      setFetchError(null);
      
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", productId)
          .single();

        if (error) throw error;

        if (data) {
          // Process colors and sizes to ensure they're in the correct format
          const processedColors: ColorSize[] = [];
          const processedSizes: ColorSize[] = [];

          // Handle colors which can be array of objects or array of strings
          if (Array.isArray(data.colors)) {
            data.colors.forEach((color: any) => {
              if (typeof color === 'string') {
                processedColors.push({ name: color, available: true });
              } else if (typeof color === 'object' && color !== null) {
                processedColors.push({
                  name: color.name || '',
                  available: color.available === undefined ? true : color.available
                });
              }
            });
          }

          // Handle sizes which can be array of objects or array of strings
          if (Array.isArray(data.sizes)) {
            data.sizes.forEach((size: any) => {
              if (typeof size === 'string') {
                processedSizes.push({ name: size, available: true });
              } else if (typeof size === 'object' && size !== null) {
                processedSizes.push({
                  name: size.name || '',
                  available: size.available === undefined ? true : size.available
                });
              }
            });
          }

          form.reset({
            name: data.name || "",
            description: data.description || "",
            price: data.price?.toString() || "",
            sale_price: data.sale_price ? data.sale_price.toString() : "",
            category: data.category || "",
            colors: processedColors,
            sizes: processedSizes,
            images: Array.isArray(data.images) ? data.images : [],
            details: data.details || "",
            care: data.care || "",
            shipping: data.shipping || "",
            featured: !!data.featured,
            new: !!data.new,
            sale: !!data.sale,
          });
        }
      } catch (error: any) {
        console.error("Error fetching product:", error);
        setFetchError(error.message || "Failed to load product data");
        toast.error("Failed to load product data");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId, form]);

  return {
    loading,
    fetchError
  };
};
