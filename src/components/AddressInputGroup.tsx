import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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
  cep: string;
  setCep: Dispatch<SetStateAction<string>>;
  autoCompleteOnProp: boolean;
  cepIsValid: boolean;
  setCepIsValid: Dispatch<SetStateAction<boolean>>;
}
interface IViaCEPResponse {
  erro: boolean;
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
  complement = '',
  setComplement,
  cep,
  setCep,
  cepIsValid,
  setCepIsValid,
  autoCompleteOnProp,
}: IAddress) {
  const [autoCompleteOn, setAutoCompleteOn] = useState(autoCompleteOnProp);
  const [loadingCep, setLoadingCep] = useState(false);
  const [cepIsTyped, setCepIsTyped] = useState(false);

  useEffect(() => {
    if (cep !== '') {
      setCepIsTyped(true);
    }
  }, [cep]);

  useEffect(() => {
    if (uf) {
      if (uf.toUpperCase() === 'NONE') {
        setUF('');
      }
    }
  }, [uf, setUF]);

  async function fetchViaCEP(cepInput: string) {
    const cepRawValue = cepInput.replace(/\D+/g, '');

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cepRawValue}/json/`
      );

      if (autoCompleteOn) {
        const data: IViaCEPResponse | null = await response.json();

        if (data && !data.erro) {
          if (data.logradouro !== '') setPlace(data.logradouro);
          if (data.complemento !== '') setComplement(data.complemento);
          if (data.bairro !== '') setNeighborhood(data.bairro);
          if (data.localidade !== '') setCity(data.localidade);
          if (data.uf !== '') setUF(data.uf);
          setCepIsValid(true);
        } else {
          setPlace('');
          setComplement('');
          setNeighborhood('');
          setCity('');
          setUF('');
          setAutoCompleteOn(true);
        }
      }
    } catch {
      if (autoCompleteOn) {
        alert('CEP Não Encontrado!');
      }
    }
    setLoadingCep(false);
  }

  return (
    <div className="items-center w-full p-4 space-y-4 text-gray-800 md:inline-flex md:space-y-0">
      <h2 className="max-w-sm mx-auto md:w-1/3">Endere&#231;o</h2>
      <div className="max-w-sm mx-auto space-y-5 md:w-2/3">
        <div>
          <div className="relative">
            <label htmlFor="address-number" className="text-gray-900">
              CEP{' '}
              <span className="text-xs text-gray-400">(Apenas números)</span>
            </label>
            <input
              type="text"
              id="address-cep"
              value={cep}
              onFocus={() => setCepIsTyped(true)}
              onChange={(event) => {
                const cepInputValue = event.target.value;
                const cep = cepInputValue.replace(/\D/g, '');

                setCep(cep);

                const validateCEP = /^[0-9]{8}$/;

                if (cep.length === 8) {
                  if (validateCEP.test(cep)) {
                    setCepIsValid(true);
                    setLoadingCep(true);
                    fetchViaCEP(cep);
                  } else {
                    alert('CEP Inválido');
                  }
                } else {
                  setCepIsValid(false);
                }
              }}
              maxLength={8}
              placeholder="CEP (Ex: 13940000)"
              className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
            />
            <div className="mt-1" hidden={!cepIsTyped}>
              <p className={`text-${cepIsValid ? 'green' : 'red'}-600`}>
                O CEP {!cepIsValid && <span>n&#227;o</span>} é válido!
              </p>
              <p hidden={cepIsTyped && cepIsValid} className={'text-red-500'}>
                Utilize 8 números apenas!
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <label htmlFor="address-uf" className="text-gray-900">
            Estado (UF)
          </label>
          <input
            type="text"
            id="address-uf"
            value={loadingCep ? '...' : uf}
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
              value={loadingCep ? '...' : city}
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
            value={loadingCep ? '...' : neighborhood}
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
              value={loadingCep ? '...' : place}
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
              value={loadingCep ? '...' : number}
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
              value={loadingCep ? '...' : complement}
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
