import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Form } from "@/components/ui/form";
import { BasicInfoForm } from "./components/BasicInfoForm";
import { ImageManager } from "./components/ImageManager";
import { ColorManager } from "./components/ColorManager";
import { SizeManager } from "./components/SizeManager";
import { AdditionalInfoForm } from "./components/AdditionalInfoForm";
import { FormValues } from "./types";
import { useProductData } from "./hooks/useProductData";
import { useProductForm } from "./hooks/useProductForm";

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
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

  // Use our custom hooks
  const { loading, fetchError } = useProductData(form, id);
  const { isSubmitting, onSubmit } = useProductForm(form, id);

  // Only show loading spinner when editing existing product
  if (id && id !== "new" && loading) {
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