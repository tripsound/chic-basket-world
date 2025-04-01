
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative h-[80vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8ZmFzaGlvbiUyMG1vZGVsfGVufDB8fDB8fHww"
          alt="Fashion Model"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>
      <div className="container-custom relative z-10 text-white">
        <div className="max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4 leading-tight">
            Elevate Your Everyday Style
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Discover our latest collection of timeless essentials designed for the modern wardrobe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" asChild>
              <Link to="/products?category=women">Shop Women</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black" asChild>
              <Link to="/products?category=men">Shop Men</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
