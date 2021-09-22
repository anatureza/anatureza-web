import { ReactNode } from "react";
import { AnimalsTableRow } from "./AnimalsTableRow";

type AnimalData = {
  id: string;
  name: string;
  main_image_url: string | null;
  description: string;
  city: string;
  available: boolean;
  birth_date: string;
  kind: string;
  gender: string;
  volunteer: {
    id: string;
    name: string;
    phone_number: string;
    avatar: string;
  };
};

type AnimalsDataProp = {
  animalsData: AnimalData[] | undefined;
  children: ReactNode;
};

export function AnimalsTable({ animalsData, children }: AnimalsDataProp) {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {animalsData ? (
          <div>
            {children}
            <div className="px-4 py-6 sm:px-0">
              <h1 className="text-xl">Gerenciar animais</h1>
              <AnimalsTableRow animalsList={animalsData} />
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <h1 className="text-2xl text-gray-700">Nenhum animal encontrado</h1>
          </div>
        )}
      </div>
    </main>
  );
}
