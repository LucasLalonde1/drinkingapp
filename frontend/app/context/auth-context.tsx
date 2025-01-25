/**
 * This file is global context for user login credentials to be shared between all screens
 */

import React, { createContext, useContext, useState, ReactNode} from 'react';

interface AuthContextType {
  userId: string | null;
  displayName: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
  setDisplayName: React.Dispatch<React.SetStateAction<string | null>>;
}

// Define the props type for the AuthProvider
interface AuthProviderProps {
    children: ReactNode;  // This will type the children prop correctly
  }

// Create the context
const AuthContext = createContext<AuthContextType | null>(null);

// Create a provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  
  return (
    <AuthContext.Provider value={{ userId, setUserId, displayName, setDisplayName }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
