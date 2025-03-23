
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormLabel } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { FormValues } from "../types";
import { ImageGrid } from "./ImageGrid";
import { AddImageDialog } from "./AddImageDialog";

interface ImageManagerProps {
  form: UseFormReturn<FormValues>;
}

export const ImageManager = ({ form }: ImageManagerProps) => {
  const [showImageDialog, setShowImageDialog] = useState(false);

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

      <ImageGrid 
        images={form.getValues("images") || []} 
        onRemoveImage={removeImage}
        onAddImage={() => setShowImageDialog(true)}
      />

      <AddImageDialog 
        open={showImageDialog} 
        onOpenChange={setShowImageDialog}
        form={form}
      />
    </div>
  );
};
