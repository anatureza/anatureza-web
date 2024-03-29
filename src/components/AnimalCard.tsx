import { Link } from 'react-router-dom';

import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IAnimal } from '../types';

import DefaultImage from '../assets/images/default_image.png';

export function AnimalCard(animal: IAnimal) {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg sm:h-full w-60 md:w-80 cursor-pointer m-auto">
      <Link to={`/animal/${animal.id}`}>
        <div className="h-64 w-full">
          <img
            className="h-full w-full object-cover"
            src={animal.main_image_url || DefaultImage}
            alt={`Animal ${animal.name}`}
          />
        </div>
        <div className="bg-white w-full p-4">
          <p className="text-gray-600 text-sm font-medium">
            <span className="font-bold">Em: </span>
            {animal.address.city}
          </p>
          <p className="text-gray-800 text-xl font-medium mb-2 truncate">
            {animal.name}
          </p>
          <p className="text-gray-600 font-light text-md h-12 max-h-14 overflow-auto">
            {animal.description}
          </p>
          <div className="flex items-center mt-4">
            <span className="block relative">
              {animal.user.avatar_url ? (
                <img
                  className="mx-auto object-cover rounded-full w-12 h-12"
                  src={animal.user.avatar_url}
                  alt={`User ${animal.user.name}`}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUser}
                  size="2x"
                  className="mx-auto object-cover rounded-full w-12 h-12"
                />
              )}
            </span>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 truncate">
                <span className="font-semibold">Voluntário:</span>{' '}
                {`${animal.user.name}`}
              </p>
              <p className="text-gray-400">{`Contato: ${animal.user.phone_number}`}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
