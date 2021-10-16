import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface IAddress {
  uf: string;
  setUF: Dispatch<SetStateAction<any>>;
  place: string;
  setPlace: Dispatch<SetStateAction<any>>;
  number: string;
  setNumber: Dispatch<SetStateAction<any>>;
  city: string;
  setCity: Dispatch<SetStateAction<any>>;
  neighborhood: string;
  setNeighborhood: Dispatch<SetStateAction<any>>;
  complement?: string;
  setComplement: Dispatch<SetStateAction<any>>;
  zip: string;
  setZip: Dispatch<SetStateAction<string>>;
  autoCompleteOnProp: boolean;
}

interface IViaCEPResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
}

export function AddressInputGroup({
  uf,
  setUF,
  place,
  setPlace,
  number,
  setNumber,
  city,
  setCity,
  neighborhood,
  setNeighborhood,
  complement = "",
  setComplement,
  zip,
  setZip,
  autoCompleteOnProp,
}: IAddress) {
  const [autoCompleteOn, setAutoCompleteOn] = useState(autoCompleteOnProp);
  const [loadingZip, setLoadingZip] = useState(false);

  useEffect(() => {
    if (uf.toUpperCase() === "NONE") {
      setUF("");
    }
  }, [uf, setUF]);

  async function fetchViaCEP(zipInput: string) {
    const zipRawValue = zipInput.replace(/\D+/g, "");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${zipRawValue}/json/`
      );

      if (autoCompleteOn) {
        const data: IViaCEPResponse | null = await response.json();

        if (data) {
          if (data.logradouro !== "") setPlace(data.logradouro);
          if (data.complemento !== "") setComplement(data.complemento);
          if (data.bairro !== "") setNeighborhood(data.bairro);
          if (data.localidade !== "") setCity(data.localidade);
          if (data.uf !== "") setUF(data.uf);
          setAutoCompleteOn(false);
        }
      }
    } catch {
      if (autoCompleteOn) {
        alert("CEP Não Encontrado!");
      }
    }
    setLoadingZip(false);
  }

  return (
    <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
      <h2 className="max-w-sm mx-auto md:w-1/3">Endere&#231;o</h2>
      <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
        <div>
          <div className="relative">
            <label htmlFor="address-number" className="text-gray-900">
              CEP{" "}
              <span className="text-xs text-gray-400">(Apenas números)</span>
            </label>
            <input
              type="text"
              id="address-zip"
              value={zip}
              onChange={(event) => {
                const zipInputValue = event.target.value;

                setZip(zipInputValue);

                if (zipInputValue.length >= 8) {
                  setLoadingZip(true);
                  fetchViaCEP(zipInputValue);
                }
              }}
              maxLength={9}
              placeholder="CEP (Ex: 13940000)"
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="address-uf" className="text-gray-900">
            Estado (UF)
          </label>
          <input
            type="text"
            id="address-uf"
            value={loadingZip ? "..." : uf}
            onChange={(event) => {
              setUF(event.target.value);
            }}
            className="rounded-lg border-transparent block appearance-none border border-gray-300 w-full md:w-16 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            placeholder="SP..."
          />
        </div>
        <div>
          <div className="relative">
            <label htmlFor="address-city" className="text-gray-900">
              Cidade
            </label>
            <input
              type="text"
              id="address-city"
              value={loadingZip ? "..." : city}
              onChange={(event) => {
                setCity(event.target.value);
              }}
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Cidade"
            />
          </div>
        </div>

        <div className="relative">
          <label htmlFor="address-neighborhood" className="text-gray-900">
            Bairro
          </label>
          <input
            type="text"
            id="address-neighborhood"
            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            value={loadingZip ? "..." : neighborhood}
            onChange={(event) => {
              setNeighborhood(event.target.value);
            }}
            placeholder="Bairro"
          />
        </div>
        <div className="items-center w-full space-y-4 text-gray-500 md:inline-flex md:space-y-0">
          <div className="md:mr-4">
            <label htmlFor="address-place" className="text-gray-900">
              Logradouro
            </label>
            <input
              type="text"
              id="address-place"
              value={loadingZip ? "..." : place}
              onChange={(event) => {
                setPlace(event.target.value);
              }}
              className="rounded-lg overflow-y-visible border-transparent flex-1 appearance-none border border-gray-300 min-w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="Logradouro (Rua, Av. ...)"
            />
          </div>
          <div>
            <label htmlFor="address-number" className="text-gray-900">
              N&#250;mero
            </label>
            <input
              type="text"
              id="address-number"
              value={loadingZip ? "..." : number}
              onChange={(event) => {
                setNumber(event.target.value);
              }}
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full  py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              placeholder="123"
            />
          </div>
        </div>
        <div>
          <div className="relative">
            <label htmlFor="address-complement" className="text-gray-900">
              Complemento
            </label>
            <textarea
              className="flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              id="address-complement"
              value={loadingZip ? "..." : complement}
              onChange={(event) => {
                setComplement(event.target.value);
              }}
              name="complement"
              placeholder="Se houver, digite o complemento aqui"
              rows={5}
              cols={40}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
