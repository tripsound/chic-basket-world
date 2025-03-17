
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-brand-800 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-serif text-xl font-medium mb-4">CHIC</h3>
            <p className="text-brand-200 mb-6">
              Elevating everyday style with quality, sustainable clothing for the modern wardrobe.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-brand-200 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-brand-200 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-brand-200 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h4 className="font-medium text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=men" className="text-brand-200 hover:text-white transition-colors">
                  Men
                </Link>
              </li>
              <li>
                <Link to="/products?category=women" className="text-brand-200 hover:text-white transition-colors">
                  Women
                </Link>
              </li>
              <li>
                <Link to="/products?category=shoes" className="text-brand-200 hover:text-white transition-colors">
                  Shoes
                </Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-brand-200 hover:text-white transition-colors">
                  Accessories
                </Link>
              </li>
              <li>
                <Link to="/products?sale=true" className="text-brand-200 hover:text-white transition-colors">
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-medium text-lg mb-4">Help</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/customer-service" className="text-brand-200 hover:text-white transition-colors">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-brand-200 hover:text-white transition-colors">
                  Track Order
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-brand-200 hover:text-white transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-brand-200 hover:text-white transition-colors">
                  Shipping
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-brand-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-medium text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-2 text-brand-200">
                <MapPin size={18} className="mt-1 flex-shrink-0" />
                <span>123 Fashion Street, Design District, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-2 text-brand-200">
                <Phone size={18} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-brand-200">
                <Mail size={18} />
                <span>support@chicfashion.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-brand-700 text-center text-brand-300 text-sm">
          <p>&copy; {new Date().getFullYear()} CHIC Fashion. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
