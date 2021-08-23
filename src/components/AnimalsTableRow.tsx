import { Link } from "react-router-dom";

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

type AnimalsListProp = {
  animalsList: AnimalData[];
};

export function AnimalsTableRow({ animalsList }: AnimalsListProp) {
  return (
    <>
      {animalsList.length > 0 ? (
        <div className="flex flex-col mt-4 mb-2">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
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
                    {animalsList.map((animal) => (
                      <tr key={animal.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/app/animal/${animal.id}`}>
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={animal.avatar}
                                  alt={`Animal ${animal.name}`}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {animal.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {animal.city}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {animal.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {animal.available ? (
                            <span className="px-4 py-2 text-sm rounded-full text-green-600 bg-green-200 ">
                              Disponível
                            </span>
                          ) : (
                            <span className="px-4 py-2 text-sm rounded-full text-yellow-600 bg-yellow-200 ">
                              Adotado
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={`/app/animal/${animal.id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            Editar
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="ml-4 mt-2 text-gray-500">
          Nenhuma reserva encontrada :(
        </h1>
      )}
    </>
  );
}
