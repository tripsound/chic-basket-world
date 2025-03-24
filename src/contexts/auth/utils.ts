
import { supabase } from "@/integrations/supabase/client";
import { User } from "./types";
import { toast } from "sonner";

export const fetchUserProfile = async (userId: string): Promise<User | null> => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    
    if (!userData?.user) {
      return null;
    }
    
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (profileError && profileError.code !== 'PGRST116') {
      console.error('Error fetching profile:', profileError);
    }
    
    // Check if the user is an admin
    const { data: adminData } = await supabase
      .from('admin_users')
      .select('*')
      .eq('email', userData.user.email)
      .maybeSingle();
    
    return {
      id: userData.user.id,
      email: userData.user.email || '',
      name: profileData?.full_name || userData.user.email?.split('@')[0] || '',
      isVerified: userData.user.email_confirmed_at !== null,
      isAdmin: !!adminData,
      phone: profileData?.phone || '',
      address: profileData?.address || '',
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
};

export const loginUser = async (email: string, password: string): Promise<{ user: any, error: any }> => {
  try {
    // First check if there's a current session
    const { data: sessionData } = await supabase.auth.getSession();
    
    // If there's already a session, sign out first to ensure clean login
    if (sessionData.session) {
      await supabase.auth.signOut();
    }
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    console.log("Login successful:", data);
    return { user: data.user, error: null };
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Show specific error messages for common login issues
    let errorMessage = "Failed to login. Please try again.";
    
    if (error.message) {
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = "Invalid email or password. Please try again.";
      } else if (error.message.includes('Email not confirmed')) {
        errorMessage = "Please verify your email address before logging in.";
      } else {
        errorMessage = error.message;
      }
    }
    
    toast.error(errorMessage);
    return { user: null, error };
  }
};

export const registerUser = async (name: string, email: string, password: string): Promise<void> => {
  try {
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
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await supabase.auth.signOut();
    toast.success("You have been logged out.");
  } catch (error: any) {
    console.error('Logout error:', error);
    toast.error("Failed to log out. Please try again.");
  }
};

export const sendVerificationEmail = async (email: string): Promise<void> => {
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

export const updateUserProfile = async (userId: string, profileData: any): Promise<void> => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        full_name: profileData.name,
        phone: profileData.phone,
        address: profileData.address,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
    
    if (error) throw error;
    
    toast.success("Profile updated successfully");
  } catch (error: any) {
    console.error('Error updating profile:', error);
    toast.error(error.message || "Failed to update profile. Please try again.");
    throw error;
  }
};
