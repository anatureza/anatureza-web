import { createContext, ReactNode } from "react";

import { useAuth } from "./hooks/useAuth";

interface ILoginData {
  email: string;
  password: string;
}

interface IAuthContextType {
  loading: boolean;
  authenticated: boolean;
  handleLogin: ({ email, password }: ILoginData) => Promise<void>;
  handleLogout: () => void;
  userType: string | null;
  userId: string | null;
}

interface IAuthContextProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextType);

export function AuthContextProvider(props: IAuthContextProviderProps) {
  const {
    loading,
    authenticated,
    handleLogin,
    handleLogout,
    userType,
    userId,
  } = useAuth();

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
