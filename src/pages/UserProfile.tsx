import { FormEvent, useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { UserAvatar } from '../components/UserAvatar';
import { AddressInputGroup } from '../components/AddressInputGroup';

import api from '../services/api';

import { AuthContext } from '../contexts/AuthContext';

import { IUser } from '../types';
import { ModalDelete } from '../components/ModalDelete';
import moment from 'moment';

export function UserProfile() {
  const history = useHistory();

  const { handleLogout } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);

  const [previewName, setPreviewName] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone_number, setPhoneNumber] = useState('');
  const [birth_date, setBirthDate] = useState('');
  const [authorizes_image, setAuthorizesImage] = useState(false);

  const [userPreviewAvatar, setUserPreviewAvatar] = useState<string | null>('');

  const [uf, setUF] = useState('');
  const [place, setPlace] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');

  const [loadingInfo, setLoadingInfo] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(true);

  const [cepIsValid, setCepIsValid] = useState(true);
  const [phoneNumberIsValid, setPhoneNumberIsValid] = useState(true);
  const [phoneNumberTyped, setPhoneNumberTyped] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      setLoadingInfo(true);

      try {
        const { data } = await api.get<IUser>('/user');

        setPreviewName(data.name);
        setName(data.name);
        setEmail(data.email);
        setPhoneNumber(data.phone_number);
        setBirthDate(data.birth_date);
        setAuthorizesImage(data.authorizes_image);

        setUserPreviewAvatar(data.avatar_url);

        setUF(data.address.uf);
        setPlace(data.address.place);
        setNumber(data.address.number);
        setComplement(data.address.complement);
        setNeighborhood(data.address.neighborhood);
        setZip(data.address.zip);
        setCity(data.address.city);
      } catch (error) {
        alert('Não foi possível pegar os dados do usuário');
        history.push('/');
      } finally {
        setLoadingInfo(false);
      }
    })();
  }, [history]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!phoneNumberIsValid) {
      alert('Número de telefone inválido');
      return;
    }

    if (!cepIsValid) {
      alert('CEP Inválido');
      return;
    }

    const now = moment();
    const momentBirthDate = moment(birth_date);
    if (momentBirthDate.isSameOrAfter(now)) {
      alert('Data de nascimento inválida');
      return;
    }

    try {
      const { data } = await api.put<IUser>('/user', {
        name,
        phone_number,
        birth_date: moment(birth_date).format('YYYY-MM-DD').toString(),
        place,
        number,
        uf,
        complement,
        neighborhood,
        zip,
        city,
        authorizes_image,
      });

      setPreviewName(data.name);
      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phone_number);
      setBirthDate(data.birth_date);
      setAuthorizesImage(data.authorizes_image);

      setUserPreviewAvatar(data.avatar_url);

      setUF(data.address.uf);
      setPlace(data.address.place);
      setNumber(data.address.number);
      setComplement(data.address.complement);
      setNeighborhood(data.address.neighborhood);
      setZip(data.address.zip);
      setCity(data.address.city);

      alert('Dados editados com sucesso!');

      window.scrollTo(0, 0);
    } catch {
      alert('Ocorreu algum erro!');
    }
  }

  async function handleDeleteAccount() {
    await api.delete('/user');
    handleLogout();
  }

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <form
        onSubmit={handleSubmit}
        className="container max-w-2xl mx-auto shadow-md md:w-3/4"
      >
        <div className="p-4 bg-gray-100 border-t-2 border-blue-400 rounded-lg bg-opacity-5">
          <div className="max-w-sm mx-auto md:w-full md:mx-0">
            <div className="inline-flex items-center space-x-4">
              <img
                alt="profile"
                src={
                  userPreviewAvatar ||
                  'https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg'
                }
                className="mx-auto object-cover rounded-full h-16 w-16 "
              />
              <h1 className="text-gray-600">{previewName}</h1>
            </div>
          </div>
        </div>
        <div className="space-y-6 bg-white">
          <hr />
          <UserAvatar
            loadingAvatar={loadingAvatar}
            setLoadingAvatar={setLoadingAvatar}
            setUserPreviewAvatar={setUserPreviewAvatar}
          />
          <hr />
          <div className="items-center w-full p-8 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-4/12">Dados sens&#237;veis</h2>
            <div className="w-full max-w-sm pl-2 mx-auto space-y-5 md:w-5/12 md:pl-9 md:inline-flex">
              <div className=" relative ">
                <input
                  disabled={true}
                  type="text"
                  id="user-info-email"
                  value={loadingInfo ? '...' : email}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="text-center md:w-3/12 md:pl-6">
              <Link to="/esqueci-minha-senha">
                <button
                  type="button"
                  className={
                    'py-2 px-4 text-gray-50 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg focus:ring-red-500 focus:ring-offset-red-200 bg-red-600 hover:bg-red-700 '
                  }
                >
                  Mudar Senha
                </button>
              </Link>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">
              Informa&#231;&#245;es pessoais
            </h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
                  <label htmlFor="user-info-name">Nome Completo</label>
                  <input
                    type="text"
                    id="user-info-name"
                    value={loadingInfo ? '...' : name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <label htmlFor="user-info-birth_date">
                    Data de nascimento
                  </label>
                  <input
                    type="date"
                    id="user-info-birth_date"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    value={loadingInfo ? '' : birth_date}
                    onChange={(event) => {
                      setBirthDate(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
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
                    value={loadingInfo ? '...' : phone_number}
                    onFocus={() => {
                      setPhoneNumberTyped(true);
                    }}
                    onChange={(event) => {
                      const phoneRawValue = event.target.value;

                      setPhoneNumber(phoneRawValue);

                      const phoneNumberFormat = phoneRawValue.replace(
                        /\D/g,
                        ''
                      );

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
                      }-600`}
                    >
                      O número {!phoneNumberIsValid && <span>n&#227;o</span>} é
                      válido!
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
          </div>
          <hr />
          <AddressInputGroup
            autoCompleteOnProp={true}
            uf={loadingInfo ? '...' : uf}
            setUF={setUF}
            place={loadingInfo ? '...' : place}
            setPlace={setPlace}
            number={loadingInfo ? '...' : number}
            setNumber={setNumber}
            city={loadingInfo ? '...' : city}
            setCity={setCity}
            neighborhood={loadingInfo ? '...' : neighborhood}
            setNeighborhood={setNeighborhood}
            complement={loadingInfo ? '...' : complement}
            setComplement={setComplement}
            cep={loadingInfo ? '...' : zip}
            setCep={setZip}
            cepIsValid={cepIsValid}
            setCepIsValid={setCepIsValid}
          />
          <hr />
          <div className="w-full px-4 mr-auto ">
            <div className=" relative ">
              <input
                type="checkbox"
                name="checked"
                checked={authorizes_image}
                onChange={() => {
                  setAuthorizesImage(!authorizes_image);
                }}
                className="form-tick appearance-none bg-white bg-check h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-500 checked:border-transparent focus:outline-none"
              />
              <span className="text-gray-700 dark:text-white font-normal pl-2">
                Aceito a divulgação de fotos e/ou vídeos com minha imagem
              </span>
            </div>
          </div>
          <div className="flex-col w-full px-4 pb-4 ml-auto text-gray-500 space-y-2">
            <button
              type="submit"
              className="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Salvar altera&#231;&#245;es
            </button>
            <button
              className="inline-block py-2 px-4 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              type="button"
              onClick={history.goBack}
            >
              Cancelar (Voltar)
            </button>
            <button
              type="button"
              onClick={() => setOpenModal(true)}
              className="py-2 px-4 bg-red-600 w-full hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Excluir conta
            </button>
          </div>
        </div>
      </form>
      <ModalDelete
        title={'Você deseja excluir sua conta?'}
        handleSubmit={handleDeleteAccount}
        open={openModal}
        setOpen={setOpenModal}
      />
    </section>
  );
}
