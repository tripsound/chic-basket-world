
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Plus, ArrowLeft, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface FormValues {
  name: string;
  description: string;
  price: string;
  sale_price: string;
  category: string;
  colors: { name: string; available: boolean }[];
  sizes: { name: string; available: boolean }[];
  images: string[];
  details: string;
  care: string;
  shipping: string;
  featured: boolean;
  new: boolean;
  sale: boolean;
}

const ProductForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

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
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .eq("id", id)
          .single();

        if (error) throw error;

        if (data) {
          form.reset({
            name: data.name,
            description: data.description,
            price: data.price.toString(),
            sale_price: data.sale_price ? data.sale_price.toString() : "",
            category: data.category,
            colors: Array.isArray(data.colors) ? data.colors : [],
            sizes: Array.isArray(data.sizes) ? data.sizes : [],
            images: Array.isArray(data.images) ? data.images : [],
            details: data.details,
            care: data.care,
            shipping: data.shipping,
            featured: data.featured,
            new: data.new,
            sale: data.sale,
          });
        }
      } catch (error) {
        console.error("Error fetching product:", error);
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
      const productData = {
        name: values.name,
        description: values.description,
        price: parseFloat(values.price),
        sale_price: values.sale_price ? parseFloat(values.sale_price) : null,
        category: values.category,
        colors: values.colors,
        sizes: values.sizes,
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
        const { error } = await supabase.from("products").insert([productData]);

        if (error) throw error;
        toast.success("Product created successfully");
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Color and size management
  const addColor = () => {
    const colors = form.getValues("colors") || [];
    form.setValue("colors", [...colors, { name: "", available: true }]);
  };

  const removeColor = (index: number) => {
    const colors = form.getValues("colors");
    form.setValue(
      "colors",
      colors.filter((_, i) => i !== index)
    );
  };

  const addSize = () => {
    const sizes = form.getValues("sizes") || [];
    form.setValue("sizes", [...sizes, { name: "", available: true }]);
  };

  const removeSize = (index: number) => {
    const sizes = form.getValues("sizes");
    form.setValue(
      "sizes",
      sizes.filter((_, i) => i !== index)
    );
  };

  // Image management
  const addImage = () => {
    if (!newImageUrl.trim()) {
      toast.error("Please enter an image URL");
      return;
    }

    const images = form.getValues("images") || [];
    
    // Check if already have 4 images
    if (images.length >= 4) {
      toast.error("You can only add up to 4 images");
      return;
    }
    
    // Check if image URL already exists
    if (images.includes(newImageUrl)) {
      toast.error("This image URL already exists");
      return;
    }

    form.setValue("images", [...images, newImageUrl]);
    setNewImageUrl("");
    setShowImageDialog(false);
  };

  const removeImage = (index: number) => {
    const images = form.getValues("images");
    form.setValue(
      "images",
      images.filter((_, i) => i !== index)
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
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
              <div className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name*</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Enter product name" required />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category*</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="men">Men</SelectItem>
                          <SelectItem value="women">Women</SelectItem>
                          <SelectItem value="shoes">Shoes</SelectItem>
                          <SelectItem value="accessories">Accessories</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price*</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="sale_price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sale Price</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            step="0.01"
                            placeholder="0.00"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter product description"
                          className="min-h-32"
                          required
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <FormLabel>Product Status</FormLabel>
                  </div>
                  <div className="flex flex-wrap gap-6">
                    <FormField
                      control={form.control}
                      name="featured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Featured</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="new"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>New</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sale"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>On Sale</FormLabel>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Product Images* (4 Max)</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setShowImageDialog(true)}
                      disabled={form.getValues("images")?.length >= 4}
                    >
                      <Plus size={16} className="mr-2" />
                      Add Image
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-2">
                    {form.getValues("images")?.map((imageUrl, index) => (
                      <div
                        key={index}
                        className="relative border rounded-md overflow-hidden group h-40"
                      >
                        <img
                          src={imageUrl}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Image+Error";
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => removeImage(index)}
                        >
                          <X size={16} />
                        </Button>
                      </div>
                    ))}
                    {Array.from({ length: Math.max(0, 4 - (form.getValues("images")?.length || 0)) }).map((_, index) => (
                      <div
                        key={`empty-${index}`}
                        className="border border-dashed rounded-md flex items-center justify-center h-40 bg-gray-50"
                        onClick={() => setShowImageDialog(true)}
                      >
                        <div className="text-center text-gray-500 cursor-pointer">
                          <Plus size={24} className="mx-auto mb-1" />
                          <span className="text-sm">Add Image</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Colors*</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addColor}
                    >
                      <Plus size={16} className="mr-2" />
                      Add Color
                    </Button>
                  </div>

                  {form.getValues("colors")?.map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 mb-3"
                    >
                      <Input
                        {...form.register(`colors.${index}.name` as const)}
                        placeholder="Color name"
                        className="flex-1"
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`color-available-${index}`}
                          checked={form.getValues(`colors.${index}.available`)}
                          onCheckedChange={(checked) => {
                            form.setValue(`colors.${index}.available`, !!checked);
                          }}
                        />
                        <Label htmlFor={`color-available-${index}`}>Available</Label>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeColor(index)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                  {form.getValues("colors")?.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No colors added yet</p>
                  )}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <FormLabel>Sizes*</FormLabel>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addSize}
                    >
                      <Plus size={16} className="mr-2" />
                      Add Size
                    </Button>
                  </div>

                  {form.getValues("sizes")?.map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 mb-3"
                    >
                      <Input
                        {...form.register(`sizes.${index}.name` as const)}
                        placeholder="Size name"
                        className="flex-1"
                      />
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id={`size-available-${index}`}
                          checked={form.getValues(`sizes.${index}.available`)}
                          onCheckedChange={(checked) => {
                            form.setValue(`sizes.${index}.available`, !!checked);
                          }}
                        />
                        <Label htmlFor={`size-available-${index}`}>Available</Label>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSize(index)}
                        className="text-red-500 hover:bg-red-50"
                      >
                        <X size={16} />
                      </Button>
                    </div>
                  ))}
                  {form.getValues("sizes")?.length === 0 && (
                    <p className="text-sm text-gray-500 italic">No sizes added yet</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
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
                control={form.control}
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
                control={form.control}
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

      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Product Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="image-url">Image URL</Label>
              <Input
                id="image-url"
                value={newImageUrl}
                onChange={(e) => setNewImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {newImageUrl && (
              <div className="border rounded-md overflow-hidden h-40">
                <img
                  src={newImageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/400x300?text=Image+Error";
                  }}
                />
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowImageDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={addImage}>Add Image</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductForm;
