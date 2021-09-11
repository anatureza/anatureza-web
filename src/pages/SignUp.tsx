import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useContext } from "react";

import { useHistory } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";
import api from "../services/api";

export function SignUp() {
  const history = useHistory();

  const { authenticated } = useContext(AuthContext);

  if (authenticated) {
    history.push("/");
  }

  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [passwordAlreadyTyped, setPasswordAlreadyTyped] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [birth_date, setBirthDate] = useState(Date.now());
  const [authorizes_image, setAuthorizesImage] = useState(false);

  const [place, setPlace] = useState("");
  const [number, setNumber] = useState<number>();
  const [complement, setComplement] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [zip, setZip] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    if (password.length > 0) {
      setPasswordAlreadyTyped(true);

      if (confirmPassword === password) {
        setPasswordIsValid(true);
      } else {
        setPasswordIsValid(false);
      }
    } else {
      setPasswordAlreadyTyped(false);
    }
  }, [password, confirmPassword]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await api
      .post("/user", {
        name,
        email,
        password,
        phone_number,
        authorizes_image,
        birth_date,
        place,
        number,
        complement,
        neighborhood,
        zip,
        city,
      })
      .then(() => {
        alert("Cadastro realizado com sucesso");

        history.push("/signin");
      });
  }

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <form
        onSubmit={handleSubmit}
        className="container max-w-2xl mx-auto shadow-md md:w-3/4"
      >
        <div className="p-4 bg-gray-100 border-t-2 border-indigo-400 rounded-lg bg-opacity-5">
          <h1 className="text-xl">Cadastre-se</h1>
        </div>
        <div className="space-y-6 bg-white">
          <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Dados de Acesso</h2>
            <div className="max-w-sm mx-auto md:w-2/3">
              <div className=" relative ">
                <input
                  type="email"
                  id="user-info-email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent mb-4"
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
                  className="mb-1 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
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
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Confirmar senha"
                />
                <div
                  className={`mt-2 mb-4 text-${
                    passwordIsValid ? "green" : "red"
                  }-500 mb-4`}
                  hidden={!passwordAlreadyTyped}
                >
                  As Senhas {!passwordIsValid && "não"} se Correspondem!
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
                <input
                  type="text"
                  id="user-info-name"
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Nome completo"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  id="user-info-phone"
                  required
                  value={phone_number}
                  onChange={(event) => setPhoneNumber(event.target.value)}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  placeholder="Telefone (Ex: 19 999999999)"
                />
              </div>
            </div>
          </div>
          <hr />
          <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
            <h2 className="max-w-sm mx-auto md:w-1/3">Endereço</h2>
            <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
              <div>
                <div className="relative border-box md:py-2">
                  <input
                    type="text"
                    id="address-place"
                    required
                    value={place}
                    onChange={(event) => setPlace(event.target.value)}
                    className="inline-block rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-3/6 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Logradouro (Rua, Av. ...)"
                  />
                  <input
                    type="number"
                    id="address-number"
                    required
                    value={number}
                    onChange={(event) => setNumber(event.target.valueAsNumber)}
                    className=" inline-block rounded-lg border-transparent flex-1 appearance-none border md:w-40 lg:w-40 md:ml-4 lg:ml-4 border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Número"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="address-city"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Cidade"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="address-neighborhood"
                    required
                    value={neighborhood}
                    onChange={(event) => setNeighborhood(event.target.value)}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Bairro"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="address-complement"
                    value={complement}
                    onChange={(event) => setComplement(event.target.value)}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="Complemento"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <input
                    type="text"
                    id="address-zip"
                    required
                    value={zip}
                    onChange={(event) => setZip(event.target.value)}
                    className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="CEP (Ex: 13940000)"
                  />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <p className="ml-4">
            Ao criar a conta, você concorda com os{" "}
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
              className={`py-2 px-4 ${
                passwordIsValid
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-600 cursor-not-allowed"
              } focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg`}
              disabled={!passwordIsValid}
            >
              Criar conta
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}
