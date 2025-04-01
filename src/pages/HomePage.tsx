
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import NewsletterSection from "@/components/home/NewsletterSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <CategorySection />
      <FeaturedProducts />
      <NewArrivals />
      <NewsletterSection />
    </div>
  );
};

export default HomePage;
