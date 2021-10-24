import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog } from '@fortawesome/free-solid-svg-icons';
import { IAnimal } from '../types';

interface IAnimalProp {
  animal: IAnimal;
}

export function AnimalsTableRow({ animal }: IAnimalProp) {
  return (
    <tr key={animal.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <Link to={`/app/animal/${animal.id}`}>
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              {animal.main_image_url ? (
                <img
                  className="h-10 w-10 rounded-full"
                  src={animal.main_image_url}
                  alt={`Animal ${animal.name}`}
                />
              ) : animal.kind === 'cat' ? (
                <FontAwesomeIcon
                  icon={faCat}
                  className="h-10 w-10 rounded-full"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faDog}
                  className="h-10 w-10 rounded-full"
                />
              )}
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium text-gray-900">
                {animal.name}
              </div>
              <div className="text-sm text-gray-500">{animal.address.city}</div>
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
  );
}
