import React, { createContext, useState, useEffect, useRef } from 'react';
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
  const authStateInitialized = useRef(false);

  useEffect(() => {
    // Only set up auth state listeners once
    if (authStateInitialized.current) return;
    
    setLoading(true);
    authStateInitialized.current = true;

    // Set up auth state change listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, session?.user?.id);
        
        // Only update state with synchronous operations
        if (session) {
          // For SIGNED_IN or TOKEN_REFRESHED events, defer the profile fetch
          if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            setTimeout(() => {
              fetchAndSetUser(session.user.id);
            }, 0);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setLoading(false);
        } else if (event === 'INITIAL_SESSION') {
          // Only set loading to false if there's no session
          if (!session) {
            setLoading(false);
          }
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        fetchAndSetUser(session.user.id);
      } else {
        setUser(null);
        setLoading(false);
      }
    }).catch(error => {
      console.error("Error getting session:", error);
      setLoading(false);
    });

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
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<User | null> => {
    try {
      const { user: authUser, error } = await loginUser(email, password);
      
      if (error) throw error;
      
      // Returning early - the auth state change handler will update the user state
      return authUser ? await fetchUserProfile(authUser.id) : null;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
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
    // The auth state change handler will update our state
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
