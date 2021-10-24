import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';

import { AuthContext } from '../contexts/AuthContext';

import { AddressInputGroup } from '../components/AddressInputGroup';

import api from '../services/api';

interface IUser {
  name: string;
  phone_number: string;
  avatar?: string;
}

export function CreateAnimal() {
  const history = useHistory();

  const { userId } = useContext(AuthContext);

  const [userInfoLoading, setUserInfoLoading] = useState(true);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [kind, setKind] = useState('none');
  const [gender, setGender] = useState('none');
  const [birth_date, setBirthDate] = useState('');

  const [userName, setUserName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');

  const [images, setImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const [uf, setUF] = useState('');
  const [place, setPlace] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [zip, setZip] = useState('');
  const [city, setCity] = useState('');

  //Get Volunteer Info
  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<IUser>(`/user/${userId}`);

        setUserName(data.name);
        setUserPhoneNumber(data.phone_number);

        setUserInfoLoading(false);
      } catch {
        alert('Não foi possível adquirir informações do voluntário!');

        history.push('/app');
      }
    })();
  }, [userId, history]);

  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });

    setPreviewImages(selectedImagesPreview);
  }

  async function handleSave(event: FormEvent) {
    event.preventDefault();

    const data = new FormData();

    data.append('name', name);
    data.append('description', description);
    data.append('kind', kind);
    data.append('gender', gender);
    data.append('birth_date', birth_date);

    images.forEach((image) => {
      data.append('images', image);
    });

    data.append('place', place);
    data.append('number', number);
    data.append('complement', complement);
    data.append('neighborhood', neighborhood);
    data.append('zip', zip);
    data.append('city', city);

    await api.post('/animal', data);

    alert('Animal Criado com sucesso!');

    history.push('/app/animais');
  }

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <form onSubmit={handleSave}>
        <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
          <div className="p-4 bg-gray-100 border-t-2 border-blue-400 rounded-lg bg-opacity-5">
            <h1 className="text-2xl">Criar novo Animal</h1>
          </div>
          <div className="space-y-6 bg-white">
            <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">
                Informações do animal
              </h2>
              <div className="max-w-sm mx-auto md:w-2/3">
                <div className="relative">
                  <label htmlFor="name" className="text-gray-900">
                    Nome
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent mb-4"
                  />
                  <label htmlFor="description" className="text-gray-900">
                    Descrição
                  </label>
                  <textarea
                    className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    id="description"
                    value={description}
                    onChange={(event) => {
                      setDescription(event.target.value);
                    }}
                    name="comment"
                    rows={5}
                    cols={40}
                  />
                  <div className="flex items-center gap-8 mt-4">
                    <label className="block">
                      <span className="text-gray-700">Tipo</span>
                      <select
                        className="form-select block w-full mt-1 rounded-lg"
                        value={kind}
                        onChange={(event) => {
                          setKind(event.target.value);
                        }}
                      >
                        <option value="none">Selecione uma opção</option>
                        <option value="dog">Cachorro</option>
                        <option value="cat">Gato</option>
                      </select>
                    </label>
                  </div>
                  <div className="flex items-center gap-8 mt-4">
                    <label className="block">
                      <span className="text-gray-700">Gênero</span>
                      <select
                        className="form-select block w-full mt-1 rounded-lg"
                        value={gender}
                        onChange={(event) => {
                          setGender(event.target.value);
                        }}
                      >
                        <option value="none">Selecione uma opção</option>
                        <option value="female">Fêmea</option>
                        <option value="male">Macho</option>
                      </select>
                    </label>
                  </div>
                  <div className="input-block items-center relative mt-6">
                    <label className="block" htmlFor="images">
                      Fotos
                    </label>

                    <div className="images-container grid grid-cols-5 gap-2">
                      {previewImages.map((image) => (
                        <img
                          className="w-full h-24 object-cover"
                          key={image}
                          src={image}
                          alt={name}
                        />
                      ))}
                      <label
                        htmlFor="image[]"
                        className={`h-24 bg-gray-100 border border-gray-200 rounded-md cursor-pointer flex items-center justify-center`}
                      >
                        <FontAwesomeIcon
                          className="text-blue-600"
                          icon={faPlus}
                          size="2x"
                        />
                      </label>
                    </div>

                    <input
                      className="mt-1"
                      multiple
                      onChange={handleSelectImages}
                      type="file"
                      id="image[]"
                    />
                  </div>
                </div>
                <div className="relative mt-6">
                  <div>
                    <label htmlFor="birth_date">Data de nascimento</label>

                    <input
                      type="date"
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      id="animal-birth_date"
                      name="birth_date"
                      value={birth_date}
                      onChange={(event) => setBirthDate(event.target.value)}
                      max={Date.now()}
                    />
                  </div>
                </div>
              </div>
            </div>
            <hr />
            {/* Volunteer data */}

            <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
              <h2 className="max-w-sm mx-auto md:w-1/3">
                Informações do Voluntário
              </h2>
              <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
                <div>
                  <div className="relative">
                    <label htmlFor="animal-user-name" className="text-gray-900">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="animal-user-name"
                      value={userInfoLoading ? '...' : userName}
                      disabled
                      className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      placeholder="Nome completo"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <label
                      htmlFor="animal-user-phone_number"
                      className="text-gray-900"
                    >
                      Número de contato
                    </label>
                    <a
                      href={`https://api.whatsapp.com/send?phone=+55${userPhoneNumber}&text=Olá,%20quero%20falar%20sobre%20o%20animal%20${name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <input
                        type="text"
                        id="animal-user-phone_number"
                        value={userInfoLoading ? '...' : userPhoneNumber}
                        disabled
                        className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <hr />
            <AddressInputGroup
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
              zip={zip}
              setZip={setZip}
            />
            <hr />
            <div className="w-full px-4 pb-4 text-gray-500 flex">
              {/* DELETE */}
              <button
                type="button"
                onClick={() => {
                  history.push('/app/animais');
                }}
                className="inline-block py-2 px-4 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Cancelar
              </button>
              {/* SAVE CHANGES */}
              <button
                type="submit"
                className="inline-block ml-2 py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Criar novo Animal
              </button>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
