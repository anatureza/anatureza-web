import { FormEvent, useEffect, useState } from "react";

import { UserAvatar } from "../components/UserAvatar";

import moment from "moment";

import api from "../services/api";
import { useHistory } from "react-router";

interface IUserRequest {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address_id: string;
  birth_date: string;
  type: string;
  authorizes_image: boolean;
  avatar: string | null;
  address: {
    id: string;
    place: string;
    number: string;
    complement: string;
    neighborhood: string;
    zip: string;
    city: string;
  };
  avatar_url: string | null;
}

export function UserProfile() {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [birth_date, setBirthDate] = useState("");
  const [authorizes_image, setAuthorizesImage] = useState(false);

  const [userPreviewAvatar, setUserPreviewAvatar] = useState<string | null>("");

  const [place, setPlace] = useState("");
  const [number, setNumber] = useState<number>();
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  const [loadingAvatar, setLoadingAvatar] = useState(true);

  useEffect(() => {
    api.get<IUserRequest>("/user").then(({ data }) => {
      setName(data.name);
      setEmail(data.email);
      setPhoneNumber(data.phone_number);
      setBirthDate(moment(data.birth_date).format("YYYY-MM-DD"));
      setAuthorizesImage(data.authorizes_image);

      setUserPreviewAvatar(data.avatar_url);

      setPlace(data.address.place);
      setNumber(Number(data.address.number));
      setComplement(data.address.complement);
      setNeighborhood(data.address.neighborhood);
      setZip(data.address.zip);
      setCity(data.address.city);
    });
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    api
      .put("/user", {
        name,
        email,
        phone_number,
        birth_date: moment(birth_date).format("YYYY/MM/DD").toString(),
        authorizes_image,
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
      })
      .then(() => {
        alert("Dados editados com sucesso!");

        history.go(0);
      })
      .catch(() => {
        alert("Ocorreu algum erro!");
      });
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
                  "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg"
                }
                className="mx-auto object-cover rounded-full h-16 w-16 "
              />
              <h1 className="text-gray-600">{name}</h1>
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
                  value={email}
                  // onChange={(event) => {setEmail(event.target.value)}}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className="text-center md:w-3/12 md:pl-6">
              <button
                type="button"
                className={`py-2 px-4 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg focus:ring-red-500 focus:ring-offset-red-200
                ${
                  false
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-gray-600 cursor-not-allowed"
                }`}
              >
                Mudar
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
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Name"
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <label htmlFor="user-info-birth_date">
                    Data de nascimento
                  </label>
                  <input
                    type="date"
                    id="user-info-birth_date"
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    value={moment(birth_date).format("YYYY-MM-DD")}
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
                    value={phone_number}
                    onChange={(event) => {
                      setPhoneNumber(event.target.value);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-500 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Endere&#231;o</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className=" relative ">
                  <label htmlFor="address-place">Logradouro</label>
                  <input
                    type="text"
                    id="address-place"
                    required
                    value={place}
                    onChange={(event) => {
                      setPlace(event.target.value);
                    }}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Logradouro (Rua, Av. ...)"
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <label htmlFor="address-number">N&#250;mero</label>
                  <input
                    type="text"
                    id="address-number"
                    required
                    value={number}
                    onChange={(event) => {
                      setNumber(event.target.valueAsNumber);
                    }}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="N&uacute;mero"
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <label htmlFor="address-number">Cidade</label>
                  <input
                    type="text"
                    id="address-city"
                    required
                    value={city}
                    onChange={(event) => {
                      setCity(event.target.value);
                    }}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Cidade"
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <label htmlFor="address-neighborhood">Bairro</label>
                  <input
                    type="text"
                    id="address-neighborhood"
                    required
                    value={neighborhood}
                    onChange={(event) => {
                      setNeighborhood(event.target.value);
                    }}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Bairro"
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <label htmlFor="address-complement">Complemento</label>
                  <input
                    type="text"
                    id="address-complement"
                    required
                    value={complement}
                    onChange={(event) => {
                      setComplement(event.target.value);
                    }}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="Complemento"
                  />
                </div>
              </div>
              <div>
                <div className=" relative ">
                  <label htmlFor="address-zip">CEP</label>
                  <input
                    type="text"
                    id="address-zip"
                    required
                    value={zip}
                    onChange={(event) => {
                      setZip(event.target.value);
                    }}
                    className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="CEP (Ex: 13940000)"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
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
