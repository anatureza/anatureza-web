import { useState } from "react";
import { AppHeader } from "../components/AppHeader";
// import { NotificationRequests } from "../components/NotificationRequests";
import { ReservationsTableList } from "../components/ReservationsTableList";

export function Dashboard() {
  const mockData = [
    {
      request_id: "sdfsdfasdf",
      adopter_id: "dfksdhfkjd",
      date: "2020/01/2004",
      adopter: {
        id: "string",
        name: "string",
        phone_number: "string",
        avatar: "https://github.com/anatureza.png",
      },
      animal: {
        id: "string",
        name: "string",
        avatar: "https://github.com/anatureza.png",
        description: "string",
        city: "string",
        available: true,
        volunteer: {
          id: "string",
          name: "string",
          phone_number: "string",
          avatar: "https://github.com/anatureza.png",
        },
      },
    },
  ];

  const [lateRequests, setLateRequests] = useState(mockData);
  const [currentWeekRequests, setCurrentWeekRequests] = useState(mockData);
  const [nextWeekRequests, setNextWeekRequests] = useState(mockData);

  const noRequests =
    lateRequests.length <= 0 &&
    currentWeekRequests.length <= 0 &&
    nextWeekRequests.length <= 0;

  return (
    <AppHeader title="Dashboard">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {!noRequests ? (
            <>
              <div className="px-4 py-6 sm:px-0">
                <h1 className="text-xl">Reservas atrasadas</h1>
                <ReservationsTableList cardInfo={lateRequests} />
              </div>
              <hr />
              <div className="px-4 py-6 sm:px-0">
                <h1 className="text-xl">Reservas Feitas essa semana</h1>
                <ReservationsTableList cardInfo={currentWeekRequests} />
              </div>
              <div className="px-4 py-6 sm:px-0">
                <h1 className="text-xl">Próximas Reservas</h1>
                <ReservationsTableList cardInfo={nextWeekRequests} />
              </div>
            </>
          ) : (
            <div className="min-h-screen">
              <h1 className="text-2xl text-gray-700">Reservas resolvidas :)</h1>
            </div>
          )}
        </div>
      </main>
    </AppHeader>
  );
}
