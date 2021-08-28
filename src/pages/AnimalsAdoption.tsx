import { useEffect, useState } from "react";
import { AnimalCard } from "../components/AnimalCard";
import api from "../services/api";

type AnimalData = {
  id: string;
  name: string;
  available: boolean;
  birth_date: string;
  description: string;
  gender: string;
  kind: string;
  main_image_url?: string;
  created_at: string;
  updated_at: string;
  address_id: string;
  address: {
    place: string;
    zip: number;
    city: string;
    complement: string;
    id: string;
    neighborhood: string;
    number: string;
    created_at: string;
    updated_at: string;
  };
  volunteer_id: string;
  user: {
    address_id: string;
    authorizes_image: boolean;
    avatar?: string;
    avatar_url?: string;
    birth_date: string;
    created_at: string;
    email: string;
    id: string;
    name: string;
    phone_number: string;
    type: string;
    updated_at: string;
  };
};

export function AnimalsAdoption() {
  const [animals, setAnimals] = useState<AnimalData[]>([]);

  useEffect(() => {
    (async () => {
      await api.get("/animals").then((response) => {
        setAnimals(response.data);
      });
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
          {animals.length > 0 ? (
            animals.map((animal) => <AnimalCard key={animal.id} {...animal} />)
          ) : (
            <h1>Nenhum animal disponivel para adocao</h1>
          )}
        </div>
      </div>
    </>
  );
}
