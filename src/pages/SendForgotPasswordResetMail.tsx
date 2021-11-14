import { FormEvent, useContext, useState } from 'react';
import { useHistory } from 'react-router';

import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../services/api';

import { AuthContext } from '../contexts/AuthContext';

export function SendForgotPasswordResetMail() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);

  const { authenticated, handleLogout } = useContext(AuthContext);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (loadingEmail) {
      return;
    }
    setLoadingEmail(true);

    try {
      await api.post('/user/password/forgot', { email });
      alert('Sucesso! Verifique seu email para redefinir sua senha!');

      if (authenticated) {
        handleLogout();
        return;
      }

      history.push('/');
    } catch {
      alert('Não foi possível enviar o e-mail');
    } finally {
      setLoadingEmail(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center w-full h-20">
            <FontAwesomeIcon
              icon={faLock}
              size={'8x'}
              className="mx-auto w-full h-20 text-gray-700"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Esqueceu sua senha?
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Ou{' '}
            <a
              href="/cadastre-se"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Crie uma Nova Conta
            </a>
          </p>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* <input type="hidden" name="remember" defaultValue="true" /> */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address">
                Insira seu email para redefinir sua senha
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Endereço de e-mail"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Enviar email
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
