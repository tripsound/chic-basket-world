
import { Product } from "@/data/products";

export const mapDatabaseProductToProduct = (item: any): Product => {
  return {
    id: item.id,
    name: item.name,
    description: item.description,
    price: parseFloat(String(item.price)),
    category: item.category as 'men' | 'women' | 'shoes' | 'accessories',
    images: item.images || [],
    colors: Array.isArray(item.colors)
      ? item.colors.map((c: any) => typeof c === 'object' ? c.name : c)
      : [],
    sizes: Array.isArray(item.sizes)
      ? item.sizes.map((s: any) => typeof s === 'object' ? s.name : s)
      : [],
    featured: Boolean(item.featured),
    new: Boolean(item.new),
    sale: Boolean(item.sale),
    salePrice: item.sale_price ? parseFloat(String(item.sale_price)) : undefined,
    details: item.details,
    care: item.care,
    shipping: item.shipping,
  };
};
