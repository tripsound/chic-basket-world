
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface Category {
  id: string;
  name: string;
}

interface FilterSidebarProps {
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

const FilterSidebar = ({
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
}: FilterSidebarProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`block w-full text-left px-2 py-1 rounded-md transition-colors ${
                categoryFilter === category.id
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-secondary"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured"
              checked={featuredOnly}
              onCheckedChange={(checked) => onFeaturedChange(checked === true)}
            />
            <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
              Featured Items
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="new"
              checked={newOnly}
              onCheckedChange={(checked) => onNewChange(checked === true)}
            />
            <label htmlFor="new" className="text-sm font-medium cursor-pointer">
              New Arrivals
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="sale"
              checked={saleOnly}
              onCheckedChange={(checked) => onSaleChange(checked === true)}
            />
            <label htmlFor="sale" className="text-sm font-medium cursor-pointer">
              Sale Items
            </label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Price Range</h3>
        <div className="flex items-center space-x-2 mb-2">
          <input
            type="range"
            min="0"
            max="500"
            step="10"
            value={priceRange[1]}
            onChange={(e) => onPriceChange([priceRange[0], parseInt(e.target.value)])}
            className="w-full"
          />
        </div>
        <div className="flex justify-between">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>

      <Button onClick={onResetFilters} variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  );
};

export default FilterSidebar;
