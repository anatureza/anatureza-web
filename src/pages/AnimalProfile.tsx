import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { Link, useParams } from "react-router-dom";

import { SelectImages } from "../components/SelectImages";
import api from "../services/api";
import moment from "moment";

interface IAnimalIdParams {
  animal_id: string;
}

interface IAnimal {
  id: string;
  volunteer_id: string;
  address_id: string;
  name: string;
  description: string;
  kind: string;
  gender: string;
  birth_date: string;
  images?: Array<{
    id: string;
    path: string;
  }>;
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    birth_date: Date;
    type: string;
    avatar?: string | null;
  };
  address: {
    place: string;
    number: number;
    complement: string;
    neighborhood: string;
    zip: number;
    city: string;
  };
}

export function AnimalProfile() {
  const { authenticated } = useContext(AuthContext);

  const { animal_id } = useParams<IAnimalIdParams>();

  const [animal, setAnimal] = useState<IAnimal>();

  useEffect(() => {
    (async () => {
      await api.get(`/animal/${animal_id}`).then(({ data }) => {
        setAnimal(data);
      });
    })();
  }, [animal_id]);

  if (typeof animal === "undefined") {
    return <h1>Carregando dados do animal...</h1>;
  }

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 bg-gray-100 border-t-2 border-blue-400 rounded-lg bg-opacity-5">
          <h1 className="text-2xl">{animal.name}</h1>
          {animal.images && animal.images.length > 0 && (
            <SelectImages images={animal.images} animalName={animal.name} />
          )}
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Informações do animal</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className="relative">
                <label htmlFor="name" className="text-gray-900">
                  Nome
                </label>
                <input
                  type="text"
                  id="name"
                  disabled
                  value={animal.name}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-4"
                />
                <label htmlFor="description" className="text-gray-900">
                  Descrição
                </label>
                <textarea
                  className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="description"
                  value={animal.description}
                  name="comment"
                  rows={5}
                  cols={40}
                  disabled
                />
                <p>Tipo do animal</p>
                <div className="flex items-center gap-8">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="kind"
                      value="cat"
                      checked={animal.kind === "cat"}
                      disabled
                      className="h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">Gato</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="kind"
                      value="dog"
                      checked={animal.kind === "dog"}
                      disabled
                      className="h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">Cachorro</span>
                  </label>
                </div>
                <p className="mt-4">Gênero do animal</p>
                <div id="radio-gender" className="flex items-center gap-8">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={animal.gender === "female"}
                      disabled
                      className="h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">Fêmea</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={animal.gender === "male"}
                      disabled
                      className="h-5 w-5 text-indigo-600"
                    />
                    <span className="ml-2 text-gray-700">Macho</span>
                  </label>
                </div>
              </div>
              <div className="relative mt-6">
                <div>
                  <label htmlFor="birth_date">Data de nascimento</label>

                  <input
                    type="date"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    id="animal-birth_date"
                    name="birth_date"
                    value={moment(animal.birth_date).format("YYYY-MM-DD")}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">
              Informações do Voluntário
            </h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className="relative">
                  <label
                    htmlFor="animal-volunteer-name"
                    className="text-gray-900"
                  >
                    Nome
                  </label>
                  <input
                    type="text"
                    id="animal-volunteer-name"
                    disabled
                    value={animal.user.name}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Nome completo"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <label
                    htmlFor="animal-volunteer-phone_number"
                    className="text-gray-900"
                  >
                    Número de contato
                  </label>
                  <a
                    href={`https://api.whatsapp.com/send?phone=+5519998869951&text=Olá,%20quero%20falar%20sobre%20o%20animal%20${animal.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <input
                      type="text"
                      id="animal-volunteer-phone_number"
                      disabled
                      value={animal.user.phone_number}
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Endereço</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className="relative border-box md:py-2">
                  <label htmlFor="address-place" className="text-gray-900">
                    Logradouro
                  </label>
                  <input
                    type="text"
                    id="address-place"
                    value={animal.address.place}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    disabled
                  />
                </div>
                <div className="relative border-box md:py-2">
                  <label htmlFor="address-number" className="text-gray-900">
                    Número
                  </label>
                  <input
                    type="number"
                    id="address-number"
                    value={animal.address.number}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <label htmlFor="address-city" className="text-gray-900">
                    Cidade
                  </label>
                  <input
                    type="text"
                    id="address-city"
                    value={animal.address.city}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <label
                    htmlFor="address-neighborhood"
                    className="text-gray-900"
                  >
                    Bairro
                  </label>
                  <input
                    type="text"
                    id="address-neighborhood"
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    value={animal.address.neighborhood}
                    disabled
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <label htmlFor="address-number" className="text-gray-900">
                    Complemento
                  </label>
                  <input
                    type="text"
                    id="address-complement"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    value={animal.address.complement}
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <label htmlFor="address-number" className="text-gray-900">
                    CEP
                  </label>
                  <input
                    type="number"
                    id="address-zip"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    value={animal.address.zip}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          {authenticated ? (
            <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
              <Link to={`/adotar/${animal_id}`}>
                <button
                  type="button"
                  className="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                >
                  Adotar
                </button>
              </Link>
            </div>
          ) : (
            <p className="ml-4">
              Para adotar, você precisa estar{" "}
              <a className="text-blue-800" href="/signin" target="_blank">
                Logado
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
