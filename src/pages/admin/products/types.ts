
import { Json } from "@/integrations/supabase/types";

export interface ColorSize {
  name: string;
  available: boolean;
}

export interface FormValues {
  name: string;
  description: string;
  price: string;
  sale_price: string;
  category: string;
  colors: ColorSize[];
  sizes: ColorSize[];
  images: string[];
  details: string;
  care: string;
  shipping: string;
  featured: boolean;
  new: boolean;
  sale: boolean;
}

export interface ProductData {
  name: string;
  description: string;
  price: number;
  sale_price: number | null;
  category: string;
  colors: Json;
  sizes: Json;
  images: string[];
  details: string;
  care: string;
  shipping: string;
  featured: boolean;
  new: boolean;
  sale: boolean;
  updated_at: string;
}
