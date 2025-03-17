
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

const ImageGallery = ({ images, productName }: ImageGalleryProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="space-y-4">
      <div className="aspect-square bg-gray-50 rounded-md overflow-hidden">
        <img
          src={images[currentImageIndex]}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => handleThumbnailClick(index)}
              className={`relative aspect-square rounded-md overflow-hidden border ${
                index === currentImageIndex ? "border-accent" : "border-gray-200"
              }`}
            >
              <img src={image} alt={`${productName} view ${index + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
