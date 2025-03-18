
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth"; // Updated import path
import { toast } from "sonner";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      await login(formData.email, formData.password);
      navigate(from);
    } catch (error) {
      // Error is already handled in the login function
      console.error("Login submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-custom py-16 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Please enter your credentials to log in</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded-md"
              required
            />
          </div>
          
          <div className="text-right">
            <Link to="/forgot-password" className="text-sm text-accent hover:underline">
              Forgot password?
            </Link>
          </div>
          
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Logging in..." : "Log In"}
          </Button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link to="/register" className="text-accent hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
