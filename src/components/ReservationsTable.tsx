import { ReactNode } from "react";
import { ReservationsTableRow } from "./ReservationsTableRow";

interface IReservation {
  id: string;
  adopter_id: string;
  animal_id: string;
  status: string;
  quiz_id: string;
  scheduled_at: Date | string | null;
  created_at: Date;
  updated_at: Date;
  animal: {
    id: string;
    volunteer_id: string;
    address_id: string;
    name: string;
    description: string;
    available: boolean;
    kind: string;
    gender: string;
    birth_date: Date;
    created_at: Date;
    updated_at: Date;
    main_image_url: string | null;
  };
  userAdopter: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    address_id: string;
    birth_date: Date | string;
    type: string;
    authorizes_image: boolean;
    avatar: string | null;
    created_at: Date;
    updated_at: Date;
    avatar_url: string | null;
  };
  volunteer_id: string;
}

type ReservationRequestTableProps = {
  reservationsData: IReservation[] | undefined;
  children: ReactNode;
};

export function ReservationsTable({
  reservationsData,
  children,
}: ReservationRequestTableProps) {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {reservationsData ? (
          <div>
            {children}
            <div className="px-4 py-6 sm:px-0">
              <h1 className="text-xl">Pedidos de Reserva</h1>
              <ReservationsTableRow reservations={reservationsData} />
            </div>
          </div>
        ) : (
          <div className="min-h-screen">
            <h1 className="text-2xl text-gray-700">Nenhuma reserva</h1>
          </div>
        )}
      </div>
    </main>
  );
}
