
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = (id: string, quantity: number) => {
    setIsUpdating(true);
    updateQuantity(id, quantity);
    setTimeout(() => setIsUpdating(false), 500);
  };

  const handleRemoveItem = (id: string) => {
    removeFromCart(id);
  };

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-16 max-w-3xl mx-auto text-center">
        <div className="flex flex-col items-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <h1 className="font-serif text-2xl md:text-3xl font-bold mb-3">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Looks like you haven't added any products to your cart yet.</p>
          <Button size="lg" asChild>
            <Link to="/products">Start Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12 max-w-6xl mx-auto">
      <h1 className="font-serif text-2xl md:text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="hidden sm:grid grid-cols-12 p-4 border-b text-sm font-medium text-muted-foreground">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Total</div>
            </div>

            <div className="divide-y">
              {items.map((item) => (
                <div key={item.id} className="p-4 sm:grid sm:grid-cols-12 sm:gap-2 flex flex-wrap">
                  {/* Product Info */}
                  <div className="sm:col-span-6 flex items-center space-x-4 mb-4 sm:mb-0">
                    <div className="relative w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="font-medium">
                        <Link to={`/products/${item.productId}`} className="hover:text-accent">
                          {item.name}
                        </Link>
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1 space-y-1">
                        <p>Size: {item.size}</p>
                        <p>Color: {item.color}</p>
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-center w-full sm:w-auto">
                    <span className="sm:hidden text-sm text-muted-foreground">Price:</span>
                    <span className="font-medium">${item.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity */}
                  <div className="sm:col-span-2 flex items-center sm:justify-center w-full sm:w-auto my-4 sm:my-0">
                    <span className="sm:hidden text-sm text-muted-foreground mr-2">Quantity:</span>
                    <div className="flex items-center border rounded overflow-hidden">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center border-r bg-gray-50"
                        disabled={isUpdating || item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="w-10 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center border-l bg-gray-50"
                        disabled={isUpdating || item.quantity >= 10}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Total & Remove */}
                  <div className="sm:col-span-2 flex items-center justify-between sm:justify-end w-full sm:w-auto">
                    <div className="flex items-center">
                      <span className="sm:hidden text-sm text-muted-foreground mr-2">Total:</span>
                      <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="ml-4 text-muted-foreground hover:text-destructive transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="font-serif text-xl font-bold mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm mb-6">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-medium">Total</span>
                <span className="font-bold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" onClick={handleCheckout}>
              Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <div className="mt-6 text-center">
              <Link
                to="/products"
                className="text-sm text-accent hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
