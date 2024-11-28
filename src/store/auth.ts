import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

// Simulated validation
const validateCredentials = (email: string, password: string): boolean => {
  return email.includes('@') && password.length >= 6;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!validateCredentials(email, password)) {
        throw new Error('Invalid email or password. Password must be at least 6 characters.');
      }

      const user = { 
        id: Math.random().toString(36).substr(2, 9),
        email, 
        name: email.split('@')[0] 
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        isLoading: false 
      });
    }
  },
  signup: async (email: string, password: string, name: string) => {
    try {
      set({ isLoading: true, error: null });

      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (!validateCredentials(email, password)) {
        throw new Error('Invalid email or password. Password must be at least 6 characters.');
      }

      const user = { 
        id: Math.random().toString(36).substr(2, 9),
        email,
        name 
      };
      
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
        isLoading: false 
      });
    }
  },
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },
  clearError: () => set({ error: null }),
}));