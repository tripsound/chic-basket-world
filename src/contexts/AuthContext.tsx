
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
  registerWithEmail: (email: string, name: string, password: string) => Promise<void>;
  logout: () => void;
  sendVerificationEmail: (email: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<boolean>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing user in localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
      }
    }
    setLoading(false);
  }, []);

  const loginWithEmail = async (email: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call to authenticate
      // For demo, we'll simulate a successful login
      const mockUser = {
        id: 'usr_' + Math.random().toString(36).substring(2, 10),
        email,
        name: email.split('@')[0],
        isVerified: true
      };
      
      // Set user in state and localStorage
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success("Successfully logged in.");
    } catch (error) {
      console.error('Login error:', error);
      toast.error("Failed to login. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const registerWithEmail = async (email: string, name: string, password: string) => {
    try {
      setLoading(true);
      // In a real app, this would be an API call to register
      // For demo, we'll simulate a successful registration
      const mockUser = {
        id: 'usr_' + Math.random().toString(36).substring(2, 10),
        email,
        name,
        isVerified: false
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      toast.success("Registration successful. Please verify your email.");
    } catch (error) {
      console.error('Registration error:', error);
      toast.error("Failed to register. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    toast.success("You have been logged out.");
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      // In a real app, this would send an actual email
      toast.success(`Verification email sent to ${email}`);
      console.log(`Verification email would be sent to ${email}`);
    } catch (error) {
      console.error('Error sending verification email:', error);
      toast.error("Failed to send verification email. Please try again.");
      throw error;
    }
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      // In a real app, we'd validate the token with an API
      // For demo, we'll just simulate success
      if (user) {
        const verifiedUser = { ...user, isVerified: true };
        setUser(verifiedUser);
        localStorage.setItem('user', JSON.stringify(verifiedUser));
        toast.success("Email verified successfully!");
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error verifying email:', error);
      toast.error("Failed to verify email. Please try again.");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        loginWithEmail,
        registerWithEmail,
        logout,
        sendVerificationEmail,
        verifyEmail,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
