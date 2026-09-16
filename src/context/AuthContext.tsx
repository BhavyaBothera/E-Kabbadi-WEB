import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  signup: (data: { name: string; email: string; phone?: string; role: 'USER' | 'MERCHANT' }) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  switchRole: (role: UserRole) => Promise<void>;
  updateUser: (fields: Partial<User>) => void;
  addEcoPoints: (points: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const u = await authService.getCurrentUser();
        setUser(u);
      } catch (err) {
        console.error('Failed to load user', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadUser();
  }, []);

  const login = async (email: string, password?: string) => {
    setIsLoading(true);
    try {
      const res = await authService.login(email, password);
      if (res.user) {
        setUser(res.user);
        return { success: true };
      }
      return { success: false, error: res.error || 'Authentication failed' };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: { name: string; email: string; phone?: string; role: 'USER' | 'MERCHANT' }) => {
    setIsLoading(true);
    try {
      const res = await authService.signup(data);
      if (res.user) {
        setUser(res.user);
        return { success: true };
      }
      return { success: false, error: res.error || 'Signup failed' };
    } catch (err) {
      return { success: false, error: (err as Error).message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    await authService.logout();
    setUser(null);
    setIsLoading(false);
  };

  const switchRole = async (targetRole: UserRole) => {
    setIsLoading(true);
    const switchedUser = await authService.switchDemoAccount(targetRole);
    setUser(switchedUser);
    setIsLoading(false);
  };

  const updateUser = (fields: Partial<User>) => {
    const updated = authService.updateUserProfile(fields);
    if (updated) setUser(updated);
  };

  const addEcoPoints = (points: number) => {
    if (!user) return;
    const newPoints = (user.ecoPoints || 0) + points;
    updateUser({ ecoPoints: newPoints });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        switchRole,
        updateUser,
        addEcoPoints,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
