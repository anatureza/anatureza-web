import { ReactNode } from 'react';

import { AnimalsTableRow } from './AnimalsTableRow';

import { IAnimal } from '../types';

interface IAnimalsDataProp {
  animalsData: IAnimal[] | undefined;
  children: ReactNode;
}

export function AnimalsTable({ animalsData, children }: IAnimalsDataProp) {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div>
          {children}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col mt-4 mb-2">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    {typeof animalsData !== 'undefined' &&
                    animalsData.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Animal
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Ações</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                          {animalsData.map((animal) => (
                            <AnimalsTableRow key={animal.id} animal={animal} />
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-10 text-center">
                        <h1 className="text-2xl text-gray-700">
                          Nenhum animal encontrado
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
