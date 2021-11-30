import { useState, useEffect } from 'react';

import { useHistory } from 'react-router-dom';

import api from '../../services/api';

interface ILoginData {
  email: string;
  password: string;
}

interface IUserAvatarUrl {
  newUserAvatarUrl: string;
}

export function useAuth() {
  const history = useHistory();

  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState<string | null>('');
  const [userId, setUserId] = useState<string | null>('');
  const [userAvatarUrl, setUserAvatarUrl] = useState<string | null>('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setAuthenticated(true);

      setUserId(localStorage.getItem('userId'));
      setUserType(localStorage.getItem('userType'));

      const userAvatarUrlFromLocalStorage =
        localStorage.getItem('userAvatarUrl');
      if (userAvatarUrlFromLocalStorage === 'null') {
        setUserAvatarUrl(null);
      } else {
        setUserAvatarUrl(userAvatarUrlFromLocalStorage);
      }
    }

    setLoading(false);
  }, []);

  async function handleLogin({ email, password }: ILoginData) {
    try {
      const {
        data: { token, userType, userId, userAvatarUrl },
      } = await api.post('/login', { email, password });

      localStorage.setItem('token', token);
      localStorage.setItem('userType', userType);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userAvatarUrl', userAvatarUrl);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      setAuthenticated(true);
      setUserType(userType);
      setUserId(userId);
      setUserAvatarUrl(userAvatarUrl);

      userType === 'user'
        ? history.push('/animais-adocao')
        : history.push('/app');
    } catch (error) {
      console.log(error);
    }
  }

  function handleUploadAvatar({ newUserAvatarUrl }: IUserAvatarUrl) {
    localStorage.setItem('userAvatarUrl', newUserAvatarUrl);
    setUserAvatarUrl(newUserAvatarUrl);
  }

  function handleLogout() {
    setAuthenticated(false);
    setUserType('');
    setUserId('');
    setUserAvatarUrl('');

    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userId');
    localStorage.removeItem('userAvatarUrl');
    api.defaults.headers.Authorization = undefined;

    history.push('/login');
  }

  return {
    authenticated,
    loading,
    handleLogin,
    handleLogout,
    userType,
    userId,
    userAvatarUrl,
    handleUploadAvatar,
  };
}
