import React, { useState, createContext, ReactNode } from "react";
import { useEffect } from "react";

import { useHistory } from "react-router-dom";

import api from "../services/api";

type AuthContextType = {
  authenticated: boolean;
  handleLogin: ({ email, password }: LoginData) => Promise<void>;
  handleLogout: () => Promise<void>;
  userType: string;
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
  const [userType, setUserType] = useState("");

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
        data: { token, userType },
      } = await api.post("/login", { email, password });

      console.log(token);

      localStorage.setItem("token", JSON.stringify(token));
      api.defaults.headers.Authorization = `Bearer ${token}`;

      userType === "user"
        ? history.push("/animais-adocao")
        : history.push("/dashboard");

      setAuthenticated(true);
      setUserType(userType);

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  async function handleLogout() {
    setAuthenticated(false);
    setUserType("");

    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    api.defaults.headers.Authorization = undefined;

    history.push("/signin");
  }

  if (loading) {
    return <h1>Carregando...</h1>;
  }

  return (
    <AuthContext.Provider
      value={{ authenticated, handleLogin, handleLogout, userType }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
