
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormLabel } from "@/components/ui/form";
import { X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormValues } from "../types";
import { toast } from "sonner";

interface ImageManagerProps {
  form: UseFormReturn<FormValues>;
}

export const ImageManager = ({ form }: ImageManagerProps) => {
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState("");

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

  return (
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
