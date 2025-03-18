
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Minus, Plus, Heart, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/auth";
import { toast } from "sonner";
import { Product } from "@/data/products";

interface AddToCartFormProps {
  product: Product;
}

const AddToCartForm = ({ product }: AddToCartFormProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color");
      return;
    }

    if (!user) {
      toast.error("Please login to add items to your cart");
      navigate("/login", { state: { from: `/products/${product.id}` } });
      return;
    }

    setLoading(true);
    
    // Add to cart
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor,
      quantity,
    });
    
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  return (
    <div>
      {/* Color Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Color</h3>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                selectedColor === color
                  ? "ring-2 ring-accent ring-offset-2"
                  : "ring-1 ring-gray-200"
              }`}
              style={{
                background: color.toLowerCase(),
                color: ["White", "Cream", "Beige", "Light Wash"].includes(color) ? "#000" : "#fff",
              }}
            >
              {selectedColor === color && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      </div>
      
      {/* Size Selection */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Size</h3>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-[2.5rem] h-9 px-2 text-sm rounded-md flex items-center justify-center transition-all ${
                selectedSize === size
                  ? "bg-primary text-primary-foreground"
                  : "bg-background border border-input hover:bg-accent/10"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      
      {/* Quantity */}
      <div className="mb-6">
        <h3 className="text-sm font-medium mb-2">Quantity</h3>
        <div className="flex w-32">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            className="w-9 h-9 flex items-center justify-center border border-input bg-background rounded-l-md"
            disabled={quantity <= 1}
          >
            <Minus className="h-3 w-3" />
          </button>
          <div className="flex-1 h-9 flex items-center justify-center border-t border-b border-input bg-background">
            {quantity}
          </div>
          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            className="w-9 h-9 flex items-center justify-center border border-input bg-background rounded-r-md"
            disabled={quantity >= 10}
          >
            <Plus className="h-3 w-3" />
          </button>
        </div>
      </div>
      
      {/* Add to Cart */}
      <div className="flex flex-col sm:flex-row gap-2 mb-8">
        <Button
          className="flex-1 bg-black hover:bg-gray-800 text-white"
          onClick={handleAddToCart}
          disabled={loading}
        >
          Add to Cart
        </Button>
        
        <Button variant="outline" size="icon" className="h-10 w-10">
          <Heart className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default AddToCartForm;
