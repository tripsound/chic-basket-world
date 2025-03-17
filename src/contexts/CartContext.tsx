
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from "sonner";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();

  // Load cart from localStorage on login or component mount
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`cart_${user.id}`);
      if (savedCart) {
        try {
          setItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Failed to parse cart:', error);
          localStorage.removeItem(`cart_${user.id}`);
        }
      }
    } else {
      // Clear cart when logged out
      setItems([]);
    }
  }, [user]);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem(`cart_${user.id}`, JSON.stringify(items));
    }
  }, [items, user]);

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    if (!user) {
      toast.error("Please login to add items to your cart.");
      return;
    }

    setItems(currentItems => {
      // Check if item already exists with same product, size, and color
      const existingItemIndex = currentItems.findIndex(
        i => i.productId === item.productId && i.size === item.size && i.color === item.color
      );

      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...currentItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        toast.success(`Updated quantity in cart`);
        return updatedItems;
      } else {
        // Add new item
        const newItem = {
          ...item,
          id: Math.random().toString(36).substring(2, 9)
        };
        toast.success(`${item.name} added to cart`);
        return [...currentItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(currentItems => {
      const itemToRemove = currentItems.find(item => item.id === id);
      if (itemToRemove) {
        toast.success(`${itemToRemove.name} removed from cart`);
      }
      return currentItems.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }

    setItems(currentItems =>
      currentItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    toast.success("Cart cleared");
  };

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
