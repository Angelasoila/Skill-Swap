
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  skillsToLearn: string[];
  skillsToTeach: string[];
  xp: number;
  level: number;
  dailyStreak: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check localStorage for existing user
    const savedUser = localStorage.getItem('skillswap_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in testing, any email/password combo works
    const mockUser: User = {
      id: 'test-user-1',
      name: email.split('@')[0], // Use email prefix as name
      email,
      avatar: '',
      skillsToLearn: ['React', 'TypeScript', 'Node.js'],
      skillsToTeach: ['JavaScript', 'HTML', 'CSS'],
      xp: 1250,
      level: 5,
      dailyStreak: 7
    };
    
    setUser(mockUser);
    localStorage.setItem('skillswap_user', JSON.stringify(mockUser));
    return true;
  };

  const register = async (userData: any): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      avatar: '',
      skillsToLearn: userData.skillsToLearn || [],
      skillsToTeach: userData.skillsToTeach || [],
      xp: 0,
      level: 1,
      dailyStreak: 0
    };
    
    setUser(newUser);
    localStorage.setItem('skillswap_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('skillswap_user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};
