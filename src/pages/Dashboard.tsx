import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { AppHeader } from "../components/AppHeader";
import { ReservationsTableRow } from "../components/ReservationsTableRow";

import api from "../services/api";
import moment from "moment";

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

export function Dashboard() {
  const { userId } = useContext(AuthContext);

  const [allReservations, setAllReservations] = useState<
    IReservation[] | undefined
  >(undefined);
  const [lateReservations, setLateReservations] = useState<
    IReservation[] | undefined
  >(undefined);
  const [currentWeekReservations, setCurrentWeekReservations] = useState<
    IReservation[] | undefined
  >(undefined);
  const [nextWeekReservations, setNextWeekReservations] = useState<
    IReservation[] | undefined
  >(undefined);

  useEffect(() => {
    (async () => {
      await api
        .get<IReservation[] | undefined>("/reservations/approved")
        .then(({ data }) => {
          if (typeof data !== "undefined") {
            // Get All Reservations From Current Volunteer
            setAllReservations(
              data.filter(
                (reservation) =>
                  reservation.volunteer_id === userId ||
                  reservation.scheduled_at !== null
              )
            );
          }
        });
    })();
  }, [userId]);

  useEffect(() => {
    const startOfWeek = moment().startOf("week");
    const endOfWeek = moment().endOf("week");

    if (typeof allReservations !== "undefined") {
      setCurrentWeekReservations(
        allReservations.filter(
          (reservation) =>
            moment(reservation.scheduled_at).isAfter(startOfWeek) ||
            moment(reservation.scheduled_at).isBefore(endOfWeek)
        )
      );

      setLateReservations(
        allReservations.filter((reservation) =>
          moment(reservation.scheduled_at).isBefore(startOfWeek)
        )
      );

      setNextWeekReservations(
        allReservations.filter((reservation) =>
          moment(reservation.scheduled_at).isBefore(endOfWeek)
        )
      );
    }
  }, [allReservations]);

  return (
    <AppHeader title="Dashboard">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            {typeof lateReservations !== "undefined" ? (
              <>
                <h1 className="text-xl">Reservas atrasadas</h1>
                <ReservationsTableRow reservations={lateReservations} />
              </>
            ) : (
              <h1 className="text-xl">Nenhuma Reserva Atrasada!</h1>
            )}
          </div>
          <hr />
          <div className="px-4 py-6 sm:px-0">
            {typeof currentWeekReservations !== "undefined" ? (
              <>
                <h1 className="text-xl">Reservas Nesta Semana</h1>
                <ReservationsTableRow reservations={currentWeekReservations} />
              </>
            ) : (
              <h1 className="text-xl">Nenhuma Reserva Para Esta Semana!</h1>
            )}
          </div>
          <hr />
          <div className="px-4 py-6 sm:px-0">
            {typeof nextWeekReservations !== "undefined" ? (
              <>
                <h1 className="text-xl">Próximas Reservas</h1>
                <ReservationsTableRow reservations={nextWeekReservations} />
              </>
            ) : (
              <h1 className="text-xl">
                Nenhuma Reserva Para A Próxima Semana!
              </h1>
            )}
          </div>
          <hr />
        </div>
      </main>
    </AppHeader>
  );
}
