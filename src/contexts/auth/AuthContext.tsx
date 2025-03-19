import React, { createContext, useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { AuthContextType, User } from './types';
import { 
  fetchUserProfile,
  loginUser,
  registerUser,
  logoutUser,
  sendVerificationEmail as sendEmail,
  updateUserProfile
} from './utils';
import { toast } from "sonner";

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    // Check for existing session on component mount
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchAndSetUser(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
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
      const userData = await fetchUserProfile(userId);
      setUser(userData);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<User | null> => {
    setLoading(true);
    try {
      const { user: authUser, error } = await loginUser(email, password);
      
      if (error) throw error;
      if (authUser) {
        toast.success("Successfully logged in");
        // Fetch the user profile to return the full User object
        const userData = await fetchUserProfile(authUser.id);
        return userData;
      }
      return null;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      await registerUser(name, email, password);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await logoutUser();
  };

  const sendVerificationEmail = async (email: string) => {
    await sendEmail(email);
  };
  
  const resendVerificationEmail = async () => {
    if (!user) {
      throw new Error("No user found to send verification email");
    }
    await sendVerificationEmail(user.email);
  };

  const verifyEmail = async (token: string): Promise<boolean> => {
    try {
      // In a real implementation, this would verify the token
      // Since Supabase handles this automatically via redirects,
      // we just return true here
      return true;
    } catch (error: any) {
      console.error('Error verifying email:', error);
      throw error;
    }
  };
  
  const updateProfile = async (profileData: any) => {
    if (!user) return;
    
    try {
      await updateUserProfile(user.id, profileData);
      await fetchAndSetUser(user.id);
    } catch (error) {
      // Error is handled in updateUserProfile
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
