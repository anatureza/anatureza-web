import { Link } from "react-router-dom";

type ReservationData = {
  request_id: string;
  adopter_id: string;
  date: string;
  date_scheduled?: string;
  adopter: {
    id: string;
    name: string;
    phone_number: string;
    avatar: string;
  };
  animal: {
    id: string;
    name: string;
    avatar: string;
    description: string;
    city: string;
    available: boolean;
    volunteer: {
      id: string;
      name: string;
      phone_number: string;
      avatar: string;
    };
  };
};

type CardInfoProp = {
  cardInfo: ReservationData[];
};

export function RequestsTableList({ cardInfo }: CardInfoProp) {
  return (
    <>
      {cardInfo.length > 0 ? (
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
                        Adotante
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Data do pedido
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Data marcada
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Editar</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {cardInfo.map((request) => (
                      <tr key={request.request_id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Link to={`/app/animal/${request.animal.id}`}>
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={request.animal.avatar}
                                  alt={`Animal ${request.animal.name}`}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {request.animal.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {request.animal.city}
                                </div>
                              </div>
                            </div>
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {request.adopter.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {`Telefone: ${request.adopter.phone_number}`}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {!request.date_scheduled
                            ? "Não marcada"
                            : request.date_scheduled}
                        </td>
                        <td className="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href={`/app/request/${request.request_id}`}
                            className="flex-1 text-blue-600 hover:text-blue-900"
                          >
                            Questionário
                          </a>
                          {/* {request.animal.available && ( MODAL FOR SCHEDULE )
                            <a
                              href={`/app/request/${request.}`}
                              className="flex-1 text-green-600 hover:text-blue-900"
                            >
                              Resolver
                            </a>
                          )} */}
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
