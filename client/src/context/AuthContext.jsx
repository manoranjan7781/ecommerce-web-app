import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, userAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await authAPI.login({ email, password });
    const userData = data.data;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const register = async (name, email, password) => {
    const { data } = await authAPI.register({ name, email, password });
    const userData = data.data;
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (profileData) => {
    const { data } = await userAPI.updateProfile(profileData);
    const updatedUser = { ...user, ...data.data };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    return updatedUser;
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile, isAdmin, isAuthenticated: !!user }}
    >
      {children}
    </AuthContext.Provider>
  );
};
