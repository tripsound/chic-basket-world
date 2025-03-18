import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom';

interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  phone?: string;
  address?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  sendVerificationEmail: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  verifyEmail: (token: string) => Promise<boolean>;
  updateProfile: (profileData: any) => Promise<void>;
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
    setLoading(true);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchAndSetUser(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
          await fetchAndSetUser(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchAndSetUser = async (userId: string) => {
    try {
      const { data: userData, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (!userData?.user) {
        setUser(null);
        setLoading(false);
        return;
      }
      
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }
      
      setUser({
        id: userData.user.id,
        email: userData.user.email || '',
        name: profileData?.full_name || userData.user.email?.split('@')[0] || '',
        isVerified: userData.user.email_confirmed_at !== null,
        phone: profileData?.phone || '',
        address: profileData?.address || '',
      });
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      toast.success("Successfully logged in.");
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error.message || "Failed to login. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
      
      toast.success("Registration successful! Please check your email for verification link.");
    } catch (error: any) {
      console.error('Registration error:', error);
      toast.error(error.message || "Failed to register. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("You have been logged out.");
    } catch (error: any) {
      console.error('Logout error:', error);
      toast.error("Failed to log out. Please try again.");
    }
  };

  const sendVerificationEmail = async (email: string) => {
    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/`
        }
      });
      
      if (error) throw error;
      
      toast.success(`Verification email sent to ${email}`);
    } catch (error: any) {
      console.error('Error sending verification email:', error);
      toast.error(error.message || "Failed to send verification email. Please try again.");
      throw error;
    }
  };
  
  const resendVerificationEmail = async () => {
    if (!user) {
      toast.error("No user found to send verification email");
      return;
    }
    await sendVerificationEmail(user.email);
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      return true;
    } catch (error: any) {
      console.error('Error verifying email:', error);
      toast.error(error.message || "Failed to verify email. Please try again.");
      return false;
    }
  };
  
  const updateProfile = async (profileData: any) => {
    if (!user) return;
    
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profileData.name || user.name,
          phone: profileData.phone || user.phone,
          address: profileData.address || user.address,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      await fetchAndSetUser(user.id);
      
      toast.success("Profile updated successfully");
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.message || "Failed to update profile. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        sendVerificationEmail,
        resendVerificationEmail,
        verifyEmail,
        updateProfile,
        isAuthenticated: !!user
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
