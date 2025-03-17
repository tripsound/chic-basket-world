
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, Minus, Plus, Heart, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductById } from "@/data/products";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(id ? getProductById(id) : undefined);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
      
      if (foundProduct) {
        setSelectedColor(foundProduct.colors[0]);
        setSelectedSize(foundProduct.sizes[0]);
      }
    }
  }, [id]);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => navigate('/products')}>
          Browse All Products
        </Button>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select a size and color");
      return;
    }

    if (!user) {
      toast.error("Please login to add items to your cart");
      navigate("/login", { state: { from: `/products/${id}` } });
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

  const productPrice = product.salePrice || product.price;

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-6">
          <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            
            {product.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-md hover:bg-white transition-colors"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
            
            {product.sale && (
              <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                Sale
              </span>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                    index === currentImageIndex ? "ring-2 ring-accent" : "ring-1 ring-gray-200"
                  }`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="font-serif text-3xl font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-6">
            {product.sale ? (
              <>
                <span className="text-2xl font-bold text-accent">${product.salePrice?.toFixed(2)}</span>
                <span className="ml-3 text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
              </>
            ) : (
              <span className="text-2xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>
          
          <p className="text-muted-foreground mb-8">{product.description}</p>
          
          {/* Color Selection */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">Color: <span className="text-muted-foreground">{selectedColor}</span></h3>
            <div className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
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
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Size: <span className="text-muted-foreground">{selectedSize}</span></h3>
            <div className="flex flex-wrap gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-[3rem] h-10 px-3 rounded-md flex items-center justify-center transition-all ${
                    selectedSize === size
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary border border-input hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quantity */}
          <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Quantity:</h3>
            <div className="flex">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="w-10 h-10 flex items-center justify-center border border-input bg-background rounded-l-md"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <div className="w-12 h-10 flex items-center justify-center border-t border-b border-input bg-background">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="w-10 h-10 flex items-center justify-center border border-input bg-background rounded-r-md"
                disabled={quantity >= 10}
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          {/* Add to Cart */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
              disabled={loading}
            >
              <ShoppingBag className="mr-2 h-5 w-5" />
              Add to Cart - ${(productPrice * quantity).toFixed(2)}
            </Button>
            
            <Button variant="outline" size="icon" className="h-12 w-12">
              <Heart className="h-5 w-5" />
            </Button>
          </div>
          
          {/* Additional info */}
          <div className="mt-8 pt-8 border-t">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium mb-2">Shipping</h3>
                <p className="text-sm text-muted-foreground">Free standard shipping on all orders.</p>
              </div>
              <div>
                <h3 className="font-medium mb-2">Returns</h3>
                <p className="text-sm text-muted-foreground">Free returns within 30 days of purchase.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
