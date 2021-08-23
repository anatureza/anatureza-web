import { Link } from "react-router-dom";
import { AnimalsTableRow } from "./AnimalsTableRow";

type AnimalData = {
  id: string;
  name: string;
  avatar: string;
  description: string;
  city: string;
  available: boolean;
  birth_date: string;
  volunteer: {
    id: string;
    name: string;
    phone_number: string;
    avatar: string;
  };
};

type AnimalsDataProp = {
  animalsData: AnimalData[];
};

export function AnimalsTable({ animalsData }: AnimalsDataProp) {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {animalsData ? (
          <div>
            <div className="px-4 py-6 sm:px-0">
              <h1 className="text-xl">Gerenciar animais</h1>
              <AnimalsTableRow animalsList={animalsData} />
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <h1 className="text-2xl text-gray-700">Nenhum animal cadastrado</h1>
          </div>
        )}
      </div>
    </main>
  );
}
