import React, { useState, createContext, ReactNode } from "react";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import api from "../services/api";

type AuthContextType = {
  loading: boolean;
  authenticated: boolean;
  handleLogin: ({ email, password }: LoginData) => Promise<void>;
  handleLogout: () => void;
  userType: string | null;
  userId: string | null;
};

type AuthContextProviderProps = {
  children: ReactNode;
};

type LoginData = {
  email: string;
  password: string;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthContextProvider(props: AuthContextProviderProps) {
  const history = useHistory();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>("");
  const [userId, setUserId] = useState<string | null>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);

      setUserId(localStorage.getItem("userId"));
      setUserType(localStorage.getItem("userType"));
    }

    setLoading(false);
  }, []);

  async function handleLogin({ email, password }: LoginData) {
    try {
      const {
        data: { token, userType, userId },
      } = await api.post("/login", { email, password });

      localStorage.setItem("token", token);
      localStorage.setItem("userType", userType);
      localStorage.setItem("userId", userId);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setAuthenticated(true);
      setUserType(userType);
      setUserId(userId);

      userType === "user"
        ? history.push("/animais-adocao")
        : history.push("/app");
    } catch (error) {
      console.log(error);
    }
  }

  function handleLogout() {
    setAuthenticated(false);
    setUserType("");
    setUserId("");

    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("userId");
    api.defaults.headers.Authorization = undefined;

    history.push("/signin");
  }

  return (
    <AuthContext.Provider
      value={{
        loading,
        authenticated,
        handleLogin,
        handleLogout,
        userType,
        userId,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
