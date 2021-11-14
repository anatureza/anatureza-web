import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import { AppHeader } from '../components/AppHeader';
import { ReservationsTableRow } from '../components/ReservationsTableRow';

import moment from 'moment';

import api from '../services/api';

import { IReservation } from '../types';

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
      const { data } = await api.get<IReservation[] | undefined>(
        '/reservations/approved'
      );
      if (typeof data !== 'undefined') {
        // Get All Reservations From Current Volunteer
        setAllReservations(
          data.filter(
            (reservation) =>
              reservation.volunteer_id === userId ||
              reservation.scheduled_at !== null
          )
        );
      }
    })();
  }, [userId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const startOfWeek = moment().startOf('week');
    const endOfWeek = moment().endOf('week');

    if (typeof allReservations !== 'undefined') {
      setCurrentWeekReservations(
        allReservations.filter(
          (reservation) =>
            moment(reservation.scheduled_at).isAfter(startOfWeek) &&
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
          moment(reservation.scheduled_at).isAfter(endOfWeek)
        )
      );
    }
  }, [allReservations]);

  return (
    <AppHeader title="Dashboard">
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0 overflow-auto">
            {typeof lateReservations !== 'undefined' &&
            lateReservations.length > 0 ? (
              <>
                <h1 className="text-xl">Reservas atrasadas</h1>
                <ReservationsTableRow reservations={lateReservations} />
              </>
            ) : (
              <h1 className="text-xl">Nenhuma Reserva Atrasada!</h1>
            )}
          </div>
          <hr />
          <div className="px-4 py-6 sm:px-0 overflow-auto">
            {typeof currentWeekReservations !== 'undefined' &&
            currentWeekReservations.length > 0 ? (
              <>
                <h1 className="text-xl">Reservas Nesta Semana</h1>
                <ReservationsTableRow reservations={currentWeekReservations} />
              </>
            ) : (
              <h1 className="text-xl">Nenhuma Reserva Para Esta Semana!</h1>
            )}
          </div>
          <hr />
          <div className="px-4 py-6 sm:px-0 overflow-auto">
            {typeof nextWeekReservations !== 'undefined' &&
            nextWeekReservations.length > 0 ? (
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
