import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { faFrown } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { AnimalCard } from '../components/AnimalCard';

import api from '../services/api';

import { IAnimal } from '../types';

export function AnimalsAdoption() {
  const [allAnimals, setAllAnimals] = useState<IAnimal[]>([]);

  const [animals, setAnimals] = useState<IAnimal[]>([]);
  const [page, setPage] = useState(0);
  const [animalsPerPage] = useState(8);
  const [searchValue, setSearchValue] = useState<string>('');

  const filteredAnimals = !!searchValue
    ? allAnimals.filter((animal) => {
        return animal.name.toLowerCase().includes(searchValue.toLowerCase());
      })
    : animals;

  const handleLoadAnimals = useCallback(async (page, animalsPerPage) => {
    try {
      const animalsFromLoadAnimals = await loadAnimals();

      setAnimals(animalsFromLoadAnimals.slice(page, animalsPerPage));
      setAllAnimals(animalsFromLoadAnimals);
    } catch {
      alert('Não encontramos nenhum animal');
    }
  }, []);

  const noMoreAnimals = page + animalsPerPage >= allAnimals.length;

  async function loadAnimals() {
    const { data } = await api.get<IAnimal[]>('/available-animals');
    return data;
  }

  async function loadMoreAnimals() {
    const nextPage = page + animalsPerPage;
    const nextAnimals = allAnimals.slice(nextPage, nextPage + animalsPerPage);
    animals.push(...nextAnimals);

    setAnimals(animals);
    setPage(nextPage);
  }

  function handleSearchChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setSearchValue(value);
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    handleLoadAnimals(0, animalsPerPage);
  }, [handleLoadAnimals, animalsPerPage]);

  return (
    <>
      <div className="w-full bg-gray-100 p-12">
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
            <form
              onSubmit={(event) => {
                event.preventDefault();
              }}
              className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center"
            >
              <div className="relative md:grid-cols-4">
                <input
                  type="search"
                  id="form-subscribe-Search"
                  value={searchValue}
                  onChange={handleSearchChange}
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Pesquisar animais"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-12">
          {filteredAnimals.length > 0 && (
            <>
              {filteredAnimals.map((animal) => (
                <AnimalCard key={animal.id} {...animal} />
              ))}
            </>
          )}
        </div>
        {filteredAnimals.length === 0 && (
          <div className="container min-h-screen w-full text-center">
            <span className="m-0 w-full h-full text-gray-700">
              <FontAwesomeIcon
                className="inline-block"
                icon={faFrown}
                size={'8x'}
              />{' '}
              <span className="block font-medium">
                Nenhum animal encontrado
              </span>
            </span>
          </div>
        )}
        {searchValue === '' && filteredAnimals.length > 0 && (
          <div className="w-full py-8 px-12">
            <button
              onClick={loadMoreAnimals}
              disabled={noMoreAnimals}
              className={`${
                noMoreAnimals
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-blue-700 hover:bg-blue-500'
              } text-white p-4 w-full rounded-lg font-semibold`}
            >
              {noMoreAnimals
                ? 'Não existem mais animais'
                : 'Carregar mais animais'}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
