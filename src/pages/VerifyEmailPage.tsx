
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const VerifyEmailPage = () => {
  const { user, resendVerificationEmail } = useAuth();
  const navigate = useNavigate();
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState("");

  useEffect(() => {
    // Check if we have the email from the user object or URL
    const getEmailFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      return params.get('email');
    };

    setEmail(user?.email || getEmailFromUrl() || "");

    // If user is already verified, redirect to home
    if (user?.isVerified) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleResendEmail = async () => {
    if (countdown > 0) return;
    
    try {
      setIsSending(true);
      
      if (!email) {
        toast.error("No email address found to send verification link");
        return;
      }
      
      await resendVerificationEmail();
      toast.success("Verification email sent successfully");
      
      // Start countdown for 60 seconds
      setCountdown(60);
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (error) {
      toast.error("Failed to send verification email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="container-custom py-16 max-w-md mx-auto">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="inline-flex justify-center items-center w-16 h-16 bg-accent/10 text-accent rounded-full mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-muted-foreground mb-8">
          We've sent a verification email to <strong>{email}</strong>. 
          Please check your inbox and click the verification link to activate your account.
        </p>
        
        <Button 
          onClick={handleResendEmail} 
          variant="outline" 
          className="mb-4"
          disabled={isSending || countdown > 0}
        >
          {countdown > 0 
            ? `Resend Email (${countdown}s)` 
            : isSending 
              ? "Sending..." 
              : "Resend Verification Email"}
        </Button>
        
        <p className="text-sm text-muted-foreground">
          Didn't get the email? Check your spam folder or try another email address.
        </p>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
