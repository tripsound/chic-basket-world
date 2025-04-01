
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import FilterSidebar from "./FilterSidebar";

interface Category {
  id: string;
  name: string;
}

interface MobileFiltersProps {
  categories: Category[];
  categoryFilter: string | undefined;
  featuredOnly: boolean;
  newOnly: boolean;
  saleOnly: boolean;
  priceRange: [number, number];
  onCategoryChange: (categoryId: string) => void;
  onFeaturedChange: (checked: boolean) => void;
  onNewChange: (checked: boolean) => void;
  onSaleChange: (checked: boolean) => void;
  onPriceChange: (price: [number, number]) => void;
  onResetFilters: () => void;
}

const MobileFilters = ({
  categories,
  categoryFilter,
  featuredOnly,
  newOnly,
  saleOnly,
  priceRange,
  onCategoryChange,
  onFeaturedChange,
  onNewChange,
  onSaleChange,
  onPriceChange,
  onResetFilters,
}: MobileFiltersProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <FilterSidebar
            categories={categories}
            categoryFilter={categoryFilter}
            featuredOnly={featuredOnly}
            newOnly={newOnly}
            saleOnly={saleOnly}
            priceRange={priceRange}
            onCategoryChange={onCategoryChange}
            onFeaturedChange={onFeaturedChange}
            onNewChange={onNewChange}
            onSaleChange={onSaleChange}
            onPriceChange={onPriceChange}
            onResetFilters={onResetFilters}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileFilters;
