import axios from "axios";
import React, { createContext, useState, useContext } from "react";

type AuthContextType = {
  user: string | null;
  token: string | null;
  isLogged: boolean;
  SetIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLogged , SetIsLogged] = useState<boolean>(false);
  const login = async ( email: string, password: string) => {
    console.log(email + password);
    const response = await axios.post("http://localhost:3003/users/login", {
       email ,
       password
    });

    const data = response.data;
    console.log(data)
    if (data?.message) {
      SetIsLogged(prev => !prev);
      setUser(email);
      setToken(data.token);
      localStorage.setItem("token", data.token);
    } else {
      throw new Error(data.message || "Login failed");
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
     SetIsLogged(false)
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, isLogged, SetIsLogged, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
