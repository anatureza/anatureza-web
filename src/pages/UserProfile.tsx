import { FormEvent, useEffect, useState } from 'react';

import { useHistory } from 'react-router';

import { UserAvatar } from '../components/UserAvatar';
import { AddressInputGroup } from '../components/AddressInputGroup';

import api from '../services/api';

import { IUser } from '../types';

export function UserProfile() {
  const history = useHistory();

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

    try {
      const { data } = await api.put<IUser>('/user', {
        name,
        phone_number,
        birth_date,
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
              <button
                type="button"
                className={
                  'py-2 px-4 text-gray-50 w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg focus:ring-red-500 focus:ring-offset-red-200 bg-red-600 hover:bg-red-700 '
                }
              >
                Mudar Senha
              </button>
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
                    value={loadingInfo ? '...' : birth_date}
                    onChange={(event) => {
                      setBirthDate(event.target.value);
                    }}
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <label htmlFor="user-info-phone">Número de telefone</label>
                  <input
                    type="text"
                    id="user-info-phone"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    value={loadingInfo ? '...' : phone_number}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                  />
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
            zip={loadingInfo ? '...' : zip}
            setZip={setZip}
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
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <button
              type="submit"
              className="py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
            >
              Salvar altera&#231;&#245;es
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
