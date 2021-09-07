import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { SelectImages } from "../components/SelectImages";

// type OrphanageParams = {
//   id: string;
// };

const mockImages = [
  {
    id: "1",
    path: "https://images.unsplash.com/photo-1574870111867-089730e5a72b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80",
  },
  {
    id: "2",
    path: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  },
  {
    id: "3",
    path: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  },
  {
    id: "4",
    path: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  },
  {
    id: "5",
    path: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  },
  {
    id: "6",
    path: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  },
  {
    id: "7",
    path: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  },
  {
    id: "8",
    path: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  },
  // {
  //   id: "9",
  //   path: "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=376&q=80",
  // },
];

const mockAnimal = {
  id: "1",
  name: "Cachorro/girafa",
  description: "lorem ipsum",
  kind: "dog",
  gender: "female",
  birth_date: "2020-01-01",
  volunteer: {
    name: "Voluntário",
    phone_number: "232132",
  },
  address: {
    place: "Rua etste stses",
    number: 12,
    complement: "",
    city: "Cidade feliz",
    zip: "12345678",
  },
};

export function AnimalProfile() {
  // const {animal_id} = useParams<OrphanageParams>();

  // useEffect(() => {}, []);

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <div className="container max-w-2xl mx-auto shadow-md md:w-3/4">
        <div className="p-4 bg-gray-100 border-t-2 border-blue-400 rounded-lg bg-opacity-5">
          <h1 className="text-2xl">{mockAnimal.name}</h1>
          <SelectImages images={mockImages} animalName={mockAnimal.name} />
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
                  value={mockAnimal.name}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-4"
                />
                <label htmlFor="description" className="text-gray-900">
                  Descrição
                </label>
                <textarea
                  className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  id="description"
                  value={mockAnimal.description}
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
                      checked={mockAnimal.kind === "cat"}
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
                      checked={mockAnimal.kind === "dog"}
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
                      checked={mockAnimal.gender === "female"}
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
                      checked={mockAnimal.gender === "male"}
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
                    value={mockAnimal.birth_date}
                    // disabled
                    // min="2018-01-01"
                    // max="2018-12-31"
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
                    value={mockAnimal.volunteer.name}
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
                    href={`https://api.whatsapp.com/send?phone=+5519998869951&text=Olá,%20quero%20falar%20sobre%20o%20animal%20${mockAnimal.name}`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <input
                      type="text"
                      id="animal-volunteer-phone_number"
                      disabled
                      value={mockAnimal.volunteer.phone_number}
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
                    Endereço
                  </label>
                  <input
                    type="text"
                    id="address-place"
                    disabled
                    value={mockAnimal.address.place}
                    className="inline-block rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-3/6 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Logradouro (Rua, Av. ...)"
                  />
                </div>
                <div className="relative border-box md:py-2">
                  <label htmlFor="address-number" className="text-gray-900">
                    Número:
                  </label>
                  <input
                    type="text"
                    id="address-number"
                    disabled
                    value={mockAnimal.address.number}
                    className=" inline-block rounded-lg border-transparent flex-1 appearance-none border md:w-40 lg:w-40 md:ml-4 lg:ml-4 border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Número"
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
                    value={mockAnimal.address.city}
                    disabled
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Cidade"
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
                    disabled
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Bairro"
                  />
                </div>
              </div>
              <div>
                {mockAnimal.address.complement && (
                  <div className="relative">
                    <label htmlFor="address-number" className="text-gray-900">
                      Complemento
                    </label>
                    <input
                      type="text"
                      id="address-complement"
                      value={mockAnimal.address.complement}
                      disabled
                      className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    />
                  </div>
                )}
              </div>
              <div>
                <div className="relative">
                  <label htmlFor="address-number" className="text-gray-900">
                    CEP
                  </label>
                  <input
                    type="text"
                    id="address-zip"
                    value={mockAnimal.address.zip}
                    disabled
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <p className="ml-4">
            Para adotar, você precisa estar{" "}
            <a className="text-blue-800" href="/termos-de-uso" target="_blank">
              Logado
            </a>
          </p>
          <div className="w-full px-4 pb-4 ml-auto text-gray-500 md:w-1/3">
            <Link to={`/adotar/${mockAnimal.id}`}>
              <button
                type="button"
                className="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Adotar
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
