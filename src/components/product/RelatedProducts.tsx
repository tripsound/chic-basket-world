
import { Link } from "react-router-dom";
import { Product } from "@/data/products";
import { ArrowRight } from "lucide-react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface RelatedProductsProps {
  products: Product[];
  currentProductId: string;
}

const RelatedProducts = ({ products, currentProductId }: RelatedProductsProps) => {
  if (products.length === 0) {
    return null;
  }
  
  return (
    <div className="py-12 border-t">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif font-bold">You might also like</h2>
        <Link 
          to="/products" 
          className="flex items-center text-sm text-accent hover:underline"
        >
          View all products
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
      
      <Carousel className="w-full">
        <CarouselContent className="-ml-4">
          {products.map((product) => (
            <CarouselItem key={product.id} className="pl-4 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <Link 
                to={`/products/${product.id}`}
                className="group block overflow-hidden transition-all hover:shadow-lg rounded-lg bg-white"
              >
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {product.sale && (
                    <span className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-xs font-medium">
                      Sale
                    </span>
                  )}
                  
                  {product.new && !product.sale && (
                    <span className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      New
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-base md:text-lg mb-1 group-hover:text-accent transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center">
                    {product.sale && product.salePrice ? (
                      <>
                        <span className="font-medium text-accent">${product.salePrice.toFixed(2)}</span>
                        <span className="ml-2 text-sm text-muted-foreground line-through">
                          ${product.price.toFixed(2)}
                        </span>
                      </>
                    ) : (
                      <span className="font-medium">${product.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-0" />
        <CarouselNext className="hidden md:flex right-0" />
      </Carousel>
    </div>
  );
};

export default RelatedProducts;
