import { ReactNode } from 'react';
import { ReservationsTableRow } from './ReservationsTableRow';

import { IReservation } from '../types';

interface IReservationRequestTableProps {
  reservationsData: IReservation[] | undefined;
  children: ReactNode;
}

export function ReservationsTable({
  reservationsData,
  children,
}: IReservationRequestTableProps) {
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
                    {typeof reservationsData !== 'undefined' &&
                    reservationsData.length > 0 ? (
                      <ReservationsTableRow reservations={reservationsData} />
                    ) : (
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
