
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";

interface ImageGridProps {
  images: string[];
  onRemoveImage: (index: number) => void;
  onAddImage: () => void;
}

export const ImageGrid = ({ images, onRemoveImage, onAddImage }: ImageGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 mt-2">
      {images.map((imageUrl, index) => (
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
            onClick={() => onRemoveImage(index)}
          >
            <X size={16} />
          </Button>
        </div>
      ))}
      {Array.from({ length: Math.max(0, 4 - (images.length || 0)) }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="border border-dashed rounded-md flex items-center justify-center h-40 bg-gray-50"
          onClick={onAddImage}
        >
          <div className="text-center text-gray-500 cursor-pointer">
            <Plus size={24} className="mx-auto mb-1" />
            <span className="text-sm">Add Image</span>
          </div>
        </div>
      ))}
    </div>
  );
};
