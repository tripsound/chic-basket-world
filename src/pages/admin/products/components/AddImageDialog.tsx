
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormValues } from "../types";
import { toast } from "sonner";

interface AddImageDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: UseFormReturn<FormValues>;
}

export const AddImageDialog = ({ open, onOpenChange, form }: AddImageDialogProps) => {
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
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button onClick={addImage}>Add Image</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
