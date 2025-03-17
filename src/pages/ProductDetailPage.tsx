
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Minus, Plus, Heart, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const handleThumbnailClick = (index: number) => {
    setCurrentImageIndex(index);
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
    <div className="container-custom py-8 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square bg-gray-50 rounded-md overflow-hidden">
            <img
              src={product.images[currentImageIndex]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => handleThumbnailClick(index)}
                  className={`relative aspect-square rounded-md overflow-hidden border ${
                    index === currentImageIndex ? "border-accent" : "border-gray-200"
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
          <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
          
          {product.sale ? (
            <div className="mb-4">
              <span className="text-xl font-semibold text-accent">${product.salePrice?.toFixed(2)}</span>
              <span className="ml-2 text-sm text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <div className="text-xl font-semibold mb-4">${product.price.toFixed(2)}</div>
          )}
          
          <p className="text-muted-foreground mb-6 text-sm">{product.description}</p>
          
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
          
          {/* Product Details Tabs */}
          <Tabs defaultValue="details" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="care">Care</TabsTrigger>
              <TabsTrigger value="shipping">Shipping</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="pt-4">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>80% Wool, 20% Polyester</li>
                <li>Dry clean only</li>
                <li>Imported</li>
                <li>Model is 5'11" and wears size S</li>
              </ul>
            </TabsContent>
            <TabsContent value="care" className="pt-4">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Dry clean only</li>
                <li>Do not bleach</li>
                <li>Cool iron if needed</li>
                <li>Store folded in a cool, dry place</li>
              </ul>
            </TabsContent>
            <TabsContent value="shipping" className="pt-4">
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Free standard shipping on all orders</li>
                <li>Standard: 3-5 business days</li>
                <li>Express: 2-3 business days</li>
                <li>International shipping available</li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
