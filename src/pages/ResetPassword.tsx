import { FormEvent, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';

import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import api from '../services/api';

export function ResetPassword() {
  const history = useHistory();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [token, setToken] = useState<string | null>();

  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(false);
  const [passwordHas8Digits, setPasswordHas8digits] = useState(false);

  const [passwordAlreadyTyped, setPasswordAlreadyTyped] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (query.get('token')) {
      const queryParamsToken = query.get('token');
      setToken(queryParamsToken);
    } else {
      alert('Token não foi identificado!');
      history.push('/');
      return;
    }
  }, [history, query]);

  useEffect(() => {
    if (password.length > 0) {
      setPasswordAlreadyTyped(true);

      if (password.length >= 8) {
        setPasswordHas8digits(true);
      } else {
        setPasswordHas8digits(false);
      }

      if (confirmPassword === password) {
        setPasswordConfirmIsValid(true);
      } else {
        setPasswordConfirmIsValid(false);
      }
    } else {
      setPasswordAlreadyTyped(false);
    }
  }, [password, confirmPassword]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (passwordHas8Digits && passwordConfirmIsValid) {
      try {
        await api.post('/user/password/reset', { password, token });

        alert('Senha redefinida com sucesso');

        history.push('/');
      } catch {
        alert('Não foi possível redefinir a senha!');
        history.push('/esqueci-minha-senha');
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-center w-full h-20">
            <FontAwesomeIcon
              icon={faUnlock}
              size={'8x'}
              className="mx-auto w-full h-20 text-gray-700"
            />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Redefina sua senha
          </h2>
        </div>
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* <input type="hidden" name="remember" defaultValue="true" /> */}
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="password">Insira sua nova senha:</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Senha"
              />
            </div>
            <div>
              <label htmlFor="confirm-password">Confirme sua nova senha:</label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
                autoComplete="current-password"
                required
                className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirmar senha"
              />
            </div>
          </div>
          <div className="mt-1 mb-4" hidden={!passwordAlreadyTyped}>
            <p
              className={`text-${passwordConfirmIsValid ? 'green' : 'red'}-500`}
            >
              As senhas {!passwordConfirmIsValid && <span>n&#227;o</span>} se
              correspondem!
            </p>
            <p className={`text-${passwordHas8Digits ? 'green' : 'red'}-500`}>
              A senha {!passwordHas8Digits && <span>n&#227;o</span>} possui pelo
              menos 8 digitos!
            </p>
          </div>

          <div>
            <button
              type="submit"
              onClick={() => {
                setPasswordAlreadyTyped(true);
              }}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                passwordAlreadyTyped &&
                setPasswordHas8digits &&
                passwordConfirmIsValid
                  ? 'bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
                  : 'bg-gray-800 cursor-not-allowed'
              }`}
            >
              Redefinir a senha
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
