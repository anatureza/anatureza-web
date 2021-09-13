import { ReservationsTableList } from "./ReservationsTableList";

type CurrentRequestData = {
  request_id: string;
  adopter_id: string;
  date: string;
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

type ReservationRequestTableProps = {
  currentRequests: CurrentRequestData[];
  children: JSX.Element;
  title: string;
};

export function ReservationsTable({
  currentRequests,
  children,
  title,
}: ReservationRequestTableProps) {
  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {currentRequests ? (
          <div>
            {children}
            <div className="px-4 py-6 sm:px-0">
              <h1 className="text-xl">
                Pedidos de Reserva: <span className="font-bold">{title}</span>
              </h1>
              <ReservationsTableList cardInfo={currentRequests} />
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
