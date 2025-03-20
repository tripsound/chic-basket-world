
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { BasicInfoForm } from "./components/BasicInfoForm";
import { ImageManager } from "./components/ImageManager";
import { ColorManager } from "./components/ColorManager";
import { SizeManager } from "./components/SizeManager";
import { AdditionalInfoForm } from "./components/AdditionalInfoForm";
import { FormValues, ColorSize, ProductData } from "./types";
import { Json } from "@/integrations/supabase/types";

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      sale_price: "",
      category: "",
      colors: [],
      sizes: [],
      images: [],
      details: "",
      care: "",
      shipping: "",
      featured: false,
      new: false,
      sale: false,
    },
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id || id === "new") return;

      setLoading(true);
      setFetchError(null);
      
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
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
  }, [id, form]);

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

      // Convert form values to the format expected by Supabase
      // Making sure all required fields are present
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

      if (id && id !== "new") {
        // Update existing product
        const { error } = await supabase
          .from("products")
          .update(productData)
          .eq("id", id);

        if (error) throw error;
        toast.success("Product updated successfully");
      } else {
        // Create new product
        const { error } = await supabase
          .from("products")
          .insert(productData);

        if (error) throw error;
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (fetchError && id && id !== "new") {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-red-500 mb-4">{fetchError}</p>
        <Button 
          variant="outline" 
          onClick={() => navigate("/admin/products")}
          className="mr-4"
        >
          Back to Products
        </Button>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center">
        <Button
          variant="ghost"
          onClick={() => navigate("/admin/products")}
          className="mr-4"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">
          {id && id !== "new" ? "Edit Product" : "Add New Product"}
        </h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column - Basic info */}
              <BasicInfoForm control={form.control} />

              {/* Right column - Images, Colors, Sizes */}
              <div className="space-y-6">
                <ImageManager form={form} />
                <ColorManager form={form} />
                <SizeManager form={form} />
              </div>
            </div>

            {/* Additional Info Section */}
            <AdditionalInfoForm control={form.control} />

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {id && id !== "new" ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductForm;
