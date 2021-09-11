import React, { useState, createContext, ReactNode } from "react";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import api from "../services/api";

type AuthContextType = {
  loading: boolean;
  authenticated: boolean;
  handleLogin: ({ email, password }: LoginData) => Promise<void>;
  handleLogout: () => void;
  userType: string;
  userId: string;
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
  const [userType, setUserType] = useState(
    JSON.parse(localStorage.getItem("userType") || "")
  );
  const [userId, setUserId] = useState(
    JSON.parse(localStorage.getItem("userId") || "")
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`;
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  async function handleLogin({ email, password }: LoginData) {
    try {
      const {
        data: { token, userType, userId },
      } = await api.post("/login", { email, password });

      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("userType", JSON.stringify(userType));
      localStorage.setItem("userId", JSON.stringify(userId));
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
