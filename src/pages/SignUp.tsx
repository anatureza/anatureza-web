import { FormEvent, useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import moment from 'moment';

import { AuthContext } from '../contexts/AuthContext';

import { AddressInputGroup } from '../components/AddressInputGroup';

import api from '../services/api';

export function SignUp() {
  const history = useHistory();

  const { authenticated, handleLogin } = useContext(AuthContext);

  if (authenticated) {
    history.push('/');
  }

  const [passwordConfirmIsValid, setPasswordConfirmIsValid] = useState(false);
  const [passwordHas8Digits, setPasswordHas8digits] = useState(false);

  const [passwordAlreadyTyped, setPasswordAlreadyTyped] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [authorizes_image, setAuthorizesImage] = useState(false);

  const [uf, setUF] = useState('');
  const [place, setPlace] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');

  const [cepIsValid, setCepIsValid] = useState(false);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(false);
  const [phoneNumberTyped, setPhoneNumberTyped] = useState(false);

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

    if (!passwordConfirmIsValid || !passwordHas8Digits) {
      alert('Senha Inválida');
      return;
    }

    if (!phoneNumberIsValid) {
      alert('Número de telefone inválido');

      return;
    }

    if (!cepIsValid) {
      alert('CEP inválido');
      return;
    }

    try {
      await api.post('/user', {
        name,
        email,
        password,
        phone_number,
        authorizes_image,
        birth_date: moment(birth_date).format('YYYY-MM-DD').toString(),
        place,
        uf,
        number,
        complement,
        neighborhood,
        zip,
        city,
      });

      alert('Cadastro realizado com sucesso!');

      handleLogin({ email, password });
    } catch {
      alert('Não foi possível cadastrar-se');
    }
  }

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <form
        onSubmit={handleSubmit}
        className="container max-w-2xl mx-auto shadow-md md:w-3/4"
      >
        <div className="p-4 bg-gray-100 border-t-2 border-blue-400 rounded-lg bg-opacity-5">
          <h1 className="text-xl">Cadastre-se</h1>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Dados de Acesso</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className=" relative ">
                <label htmlFor="user-info-email" className="text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="user-info-email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4"
                  placeholder="Email"
                />
                <label htmlFor="password" className="text-gray-700">
                  Senha
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  className="mb-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Senha"
                />
                <label htmlFor="confirm-password" className="text-gray-700">
                  Confirmar Senha
                  <span className="text-red-500 required-dot">*</span>
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  required
                  onChange={(event) => {
                    setConfirmPassword(event.target.value);
                  }}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Confirmar senha"
                />
                <div className="mt-1" hidden={!passwordAlreadyTyped}>
                  <p
                    className={`text-${
                      passwordConfirmIsValid ? 'green' : 'red'
                    }-500`}
                  >
                    As senhas {!passwordConfirmIsValid && <span>n&#227;o</span>}{' '}
                    se correspondem!
                  </p>
                  <p
                    className={`text-${
                      passwordHas8Digits ? 'green' : 'red'
                    }-500`}
                  >
                    A senha {!passwordHas8Digits && <span>n&#227;o</span>}{' '}
                    possui pelo menos 8 digitos!
                  </p>
                </div>
              </div>
              <div className="relative"></div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Informações Pessoais</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div className="relative">
                <label htmlFor="user-birthDate" className="text-gray-700">
                  Data de nascimento
                </label>
                <input
                  type="date"
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  id="user-birthDate"
                  name="birth_date"
                  value={birth_date}
                  onChange={(event) => setBirthDate(event.target.value)}
                />
              </div>
              <div className="relative">
                <label htmlFor="" className="text-gray-700">
                  Nome completo
                </label>
                <input
                  type="text"
                  id="user-info-name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="João da Silva"
                />
              </div>
              <div className="relative">
                <label htmlFor="user-info-phone" className="text-gray-700">
                  Número de telefone{' '}
                  <span className="text-xs text-gray-400">
                    (Apenas números)
                  </span>
                </label>
                <input
                  type="text"
                  id="user-info-phone"
                  required
                  value={phone_number}
                  onFocus={() => {
                    setPhoneNumberTyped(true);
                  }}
                  onChange={(event) => {
                    const phoneRawValue = event.target.value;

                    setPhoneNumber(phoneRawValue);

                    const phoneNumberFormat = phoneRawValue.replace(/\D/g, '');

                    if (phoneNumberFormat === '') {
                      setPhoneNumberIsValid(false);
                    }
                    if (phoneNumberFormat.length === 11) {
                      setPhoneNumber(phoneNumberFormat);
                      setPhoneNumberIsValid(true);
                    } else {
                      setPhoneNumberIsValid(false);
                    }
                  }}
                  maxLength={11}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Ex: 19967895499"
                />
                <div className="mt-1" hidden={!phoneNumberTyped}>
                  <p
                    className={`text-${
                      phoneNumberIsValid ? 'green' : 'red'
                    }-500`}
                  >
                    O número {!phoneNumberIsValid && <span>n&#227;o</span>} é
                    valido!
                  </p>
                  <p
                    hidden={phoneNumberTyped && phoneNumberIsValid}
                    className={'text-red-500'}
                  >
                    Utilize 11 números apenas!
                  </p>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <AddressInputGroup
            setCepIsValid={setCepIsValid}
            cepIsValid={cepIsValid}
            autoCompleteOnProp={true}
            uf={uf}
            setUF={setUF}
            place={place}
            setPlace={setPlace}
            number={number}
            setNumber={setNumber}
            city={city}
            setCity={setCity}
            neighborhood={neighborhood}
            setNeighborhood={setNeighborhood}
            complement={complement}
            setComplement={setComplement}
            cep={zip}
            setCep={setZip}
          />
          <hr />
          <p className="ml-4">
            Ao criar a conta, você concorda com os{' '}
            <a className="text-blue-800" href="/termos-de-uso" target="_blank">
              Termos de Uso
            </a>
          </p>
          <label className="flex items-center space-x-3 mb-3 ml-4">
            <input
              type="checkbox"
              name="checked"
              defaultChecked={authorizes_image}
              onClick={() => {
                setAuthorizesImage(!authorizes_image);
              }}
              className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
            />
            <span className="text-gray-700 dark:text-white font-normal">
              Aceito a divulgação de fotos e/ou vídeos com minha imagem
            </span>
          </label>
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              onClick={() => {
                setPasswordAlreadyTyped(true);
              }}
              className={`py-2 px-4 ${
                passwordAlreadyTyped &&
                passwordHas8Digits &&
                passwordConfirmIsValid &&
                cepIsValid &&
                phoneNumberIsValid
                  ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200'
                  : 'bg-gray-600 cursor-not-allowed'
              }  text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
            >
              Criar conta
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
