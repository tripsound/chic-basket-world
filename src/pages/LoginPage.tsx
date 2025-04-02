
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage 
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingState from "@/components/product/LoadingState";

// Define login form schema with validation
const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage = () => {
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  
  // Set up form with validation
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Control initial loading state - limit to maximum 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  
  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate(from, { replace: true });
    } else if (!authLoading) {
      // Once auth loading is done, we can stop our initial loading if it's still active
      setInitialLoading(false);
    }
  }, [user, authLoading, navigate, from]);

  const handleSubmit = async (values: LoginFormValues) => {
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      
      // Clear previous form errors
      form.clearErrors();
      
      // Attempt to log in
      const result = await login(values.email, values.password);
      
      if (result) {
        toast.success("Successfully logged in");
        // Force navigation immediately to the destination
        navigate(from, { replace: true });
      } else {
        // If login returned null but no error was thrown
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error: any) {
      console.error("Login submission error:", error);
      
      // Set form-level error for authentication failures
      if (error.message) {
        if (error.message.includes('not confirmed')) {
          // If email is not verified, show a specific message and option to verify
          toast.error("Please verify your email before logging in", {
            action: {
              label: "Verify Email",
              onClick: () => navigate(`/verify-email?email=${encodeURIComponent(values.email)}`),
            },
          });
        } else if (error.message.includes('Invalid login credentials')) {
          toast.error("Invalid email or password. Please try again.");
        } else {
          // General login error
          toast.error(error.message || "Login failed. Please try again.");
        }
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show loading state while either auth is loading or during initial load
  if (initialLoading || authLoading) {
    return <LoadingState />;
  }

  // Only render the login form if not authenticated
  return (
    <div className="container-custom py-16 max-w-md mx-auto">
      <div className="text-center mb-8">
        <h1 className="font-serif text-2xl md:text-3xl font-bold mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Please enter your credentials to log in</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input 
                      type="email"
                      placeholder="your@email.com"
                      {...field}
                      disabled={isSubmitting}
                      autoComplete="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input 
                      type="password"
                      placeholder="••••••••"
                      {...field}
                      disabled={isSubmitting}
                      autoComplete="current-password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="text-right">
              <Link to="/forgot-password" className="text-sm text-accent hover:underline">
                Forgot password?
              </Link>
            </div>
            
            <Button 
              type="submit" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Log In"}
            </Button>
          </form>
        </Form>
        
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
