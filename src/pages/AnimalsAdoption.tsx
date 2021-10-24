import { useEffect, useState } from 'react';

import { AnimalCard } from '../components/AnimalCard';

import api from '../services/api';

import { IAnimal } from '../types';

export function AnimalsAdoption() {
  const [animals, setAnimals] = useState<IAnimal[] | undefined>([]);

  useEffect(() => {
    (async () => {
      const { data } = await api.get<IAnimal[]>('/all-animals');
      setAnimals(data.filter((animal) => animal.available));
    })();
  }, []);
  return (
    <>
      <div className="w-full bg-white p-12">
        <div className="header flex items-end justify-between mb-12">
          <div className="title">
            <p className="text-4xl font-bold text-gray-800 mb-4">
              Animais para adoção
            </p>
            <p className="text-2xl font-light text-gray-400">
              Animais disponíveis para adoção, prontos para fazer parte da sua
              família
            </p>
          </div>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className="relative md:grid-cols-4">
                <input
                  type="text"
                  id="form-subscribe-Search"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Pesquisar"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {typeof animals !== 'undefined' &&
            (animals.length > 0 ? (
              animals.map((animal) => (
                <AnimalCard key={animal.id} {...animal} />
              ))
            ) : (
              <div className="container h-screen">
                <h1>Nenhum animal disponivel para ado&#231;&#227;o</h1>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
