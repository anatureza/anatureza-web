import { createContext, ReactNode } from 'react';

import { useAuth } from './hooks/useAuth';

interface ILoginData {
  email: string;
  password: string;
}

interface IUserAvatarUrl {
  newUserAvatarUrl: string;
}

interface IAuthContextType {
  loading: boolean;
  authenticated: boolean;
  handleLogin: ({ email, password }: ILoginData) => Promise<void>;
  handleLogout: () => void;
  userType: string | null;
  userId: string | null;
  userAvatarUrl: string | null;
  handleUploadAvatar: ({ newUserAvatarUrl }: IUserAvatarUrl) => void;
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
    userAvatarUrl,
    handleUploadAvatar,
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
        userAvatarUrl,
        handleUploadAvatar,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
