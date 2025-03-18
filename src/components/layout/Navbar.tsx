
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, 
  ShoppingBag, 
  User, 
  Menu, 
  X 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth"; // Updated import path
import { useCart } from "@/contexts/CartContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
    }
  };

  const categories = [
    { name: "Men", path: "/products?category=men" },
    { name: "Women", path: "/products?category=women" },
    { name: "Shoes", path: "/products?category=shoes" },
    { name: "Accessories", path: "/products?category=accessories" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="font-serif text-2xl font-bold">
            CHIC
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm font-medium hover:text-accent transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Right Side - Search, User, Cart */}
          <div className="flex items-center space-x-4">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </form>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/profile/orders">Order History</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/login">
                  <User className="h-5 w-5" />
                </Link>
              </Button>
            )}

            {/* Cart */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/cart" className="relative">
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </Button>

            {/* Mobile Menu Trigger */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-center mb-8">
                    <Link to="/" className="font-serif text-2xl font-bold">
                      CHIC
                    </Link>
                  </div>

                  {/* Mobile Search */}
                  <form onSubmit={handleSearch} className="relative mb-6">
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="w-full pl-8"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </form>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-4">
                    {categories.map((category) => (
                      <Link
                        key={category.name}
                        to={category.path}
                        className="text-base font-medium hover:text-accent transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>

                  <div className="mt-auto space-y-4">
                    {user ? (
                      <>
                        <Link
                          to="/profile"
                          className="flex items-center space-x-2 text-base font-medium hover:text-accent transition-colors"
                        >
                          <User className="h-5 w-5" />
                          <span>My Account</span>
                        </Link>
                        <Button onClick={logout} variant="outline" className="w-full">
                          Log out
                        </Button>
                      </>
                    ) : (
                      <Button className="w-full" asChild>
                        <Link to="/login">Sign in</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
