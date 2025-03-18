
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Package, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth";
import { Button } from "@/components/ui/button";

const AdminLayout = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-900 text-white ${isOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-800">
          <h1 className={`font-bold text-xl ${!isOpen && 'hidden'}`}>Admin Panel</h1>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`text-white mt-2 ${!isOpen && 'mx-auto'}`}
          >
            {isOpen ? '← Close' : '→'}
          </button>
        </div>

        <nav className="flex-1 py-4">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => 
              `flex items-center p-3 ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800'} transition-colors ${!isOpen && 'justify-center'}`
            }
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            {isOpen && <span>Dashboard</span>}
          </NavLink>
          
          <NavLink 
            to="/admin/products" 
            className={({ isActive }) => 
              `flex items-center p-3 ${isActive ? 'bg-gray-800' : 'hover:bg-gray-800'} transition-colors ${!isOpen && 'justify-center'}`
            }
          >
            <Package className="w-5 h-5 mr-3" />
            {isOpen && <span>Products</span>}
          </NavLink>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <Button 
            variant="ghost" 
            className="text-white w-full flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            {isOpen && <span>Logout</span>}
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-100">
        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
