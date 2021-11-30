import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ReservationsTableRow } from './ReservationsTableRow';

import { IReservation } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons';

interface IReservationRequestTableProps {
  reservationsData: IReservation[] | undefined;
  children: ReactNode;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ReservationsTable({
  reservationsData,
  children,
}: IReservationRequestTableProps) {
  const [filteredReservations, setFilteredReservations] = useState<
    IReservation[]
  >([]);
  const [isFilteredAnimal, setIsFilteredAnimal] = useState(false);
  const [animalId, setAnimalId] = useState('');

  const query = useQuery();

  useEffect(() => {
    const queryAnimalId = query.get('animalId');
    if (!!queryAnimalId) {
      setAnimalId(queryAnimalId);
    } else {
      setAnimalId('');
    }
  }, [query]);

  useEffect(() => {
    if (typeof reservationsData !== 'undefined') {
      const reservations = !!animalId
        ? reservationsData.filter((reservation) => {
            return reservation.animal.id.includes(animalId);
          })
        : reservationsData;

      setFilteredReservations(reservations);
    }
    setIsFilteredAnimal(animalId !== '' && animalId !== null);
  }, [animalId, reservationsData]);

  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div>
          {children}
          <div className="flex items-center w-full">
            {isFilteredAnimal && (
              <Link to="/app/reservas">
                <div className="flex-start">
                  <h6 className="text-md hover:text-red-800 mt-2">
                    Id do Animal selecionado:{' '}
                    <span className="text-red-600 hover:text-red-800 font-medium">
                      {query.get('animalId')}
                      <FontAwesomeIcon className="ml-2" icon={faTimesCircle} />
                    </span>{' '}
                  </h6>
                </div>
              </Link>
            )}
          </div>
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col mt-4 mb-2">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    {filteredReservations.length > 0 && (
                      <ReservationsTableRow
                        reservations={filteredReservations}
                      />
                    )}
                    {filteredReservations.length === 0 && (
                      <div className="w-full p-12">
                        <h1 className="text-2xl text-gray-500 text-center">
                          Nenhuma reserva
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
