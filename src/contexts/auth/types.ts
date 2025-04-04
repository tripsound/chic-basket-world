
export interface User {
  id: string;
  email: string;
  name: string;
  isVerified: boolean;
  isAdmin?: boolean;
  phone?: string;
  address?: string;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  sendVerificationEmail: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  verifyEmail: (token: string) => Promise<boolean>;
  updateProfile: (profileData: any) => Promise<void>;
  isAuthenticated: boolean;
}
