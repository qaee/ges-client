"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, LoginData, RegisterData, AuthResponse } from '@/types';
import { authService } from '@/services/api';
import { toast } from 'sonner';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response: AuthResponse = await authService.login(data);
      const userData: User = {
        id: response.userId,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role as User['role'],
        tier: response.tier as User['tier'],
      };
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Login successful!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed. Please try again.';
      toast.error(message);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response: AuthResponse = await authService.register(data);
      const userData: User = {
        id: response.userId,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role as User['role'],
        tier: response.tier as User['tier'],
      };
      
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      toast.success('Registration successful!');
    } catch (error: any) {
      const message = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(message);
      throw error;
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    toast.success('Logged out successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}