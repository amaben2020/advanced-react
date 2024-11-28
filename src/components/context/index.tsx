import React, { useCallback, useContext, useState } from 'react';
import { createContext } from 'react';

interface INewUser {
  name: string;
  email: string;
}

const AuthContext = createContext({});

export const AuthCTX = ({ children }) => {
  const [user, setUser] = useState<INewUser>();

  const handleUserUpdate = useCallback((newUser: INewUser) => {
    setUser(newUser);
  }, []);

  const data = {
    user,
    handleUserUpdate,
  };
  return <AuthContext.Provider value={data}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) return null;

  return context;
};
