import { MouseEvent, useContext, useEffect } from 'react';
import { useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import { AppHeader } from '../components/AppHeader';
import { ButtonGroup } from '../components/ButtonGroup';
import { ReservationsTable } from '../components/ReservationsTable';

import api from '../services/api';

import { IReservation } from '../types';

export function ManageReservations() {
  const { userId } = useContext(AuthContext);

  const [newReservations, setNewReservations] = useState<
    IReservation[] | undefined
  >();
  const [approvedReservations, setApprovedReservations] = useState<
    IReservation[] | undefined
  >();
  const [disapprovedReservations, setDisapprovedReservations] = useState<
    IReservation[] | undefined
  >();
  const [currentReservations, setCurrentReservations] = useState<
    IReservation[] | undefined
  >();

  const [activeStatus, setActiveStatus] = useState('Novas');

  function handleButtonChanged(event: MouseEvent<HTMLButtonElement>) {
    const buttonValue = event.currentTarget.value;
    buttonValue === 'Novas'
      ? setActiveStatus('Novas')
      : buttonValue === 'Aprovadas'
      ? setActiveStatus('Aprovadas')
      : buttonValue === 'Não aprovadas'
      ? setActiveStatus('Não aprovadas')
      : setActiveStatus('Novas');
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<IReservation[]>('/reservations/new');
        setNewReservations(
          data.filter((reservation) => reservation.volunteer_id === userId)
        );
      } catch {
        setNewReservations(undefined);
      }

      try {
        const { data } = await api.get<IReservation[]>(
          '/reservations/approved'
        );
        setApprovedReservations(
          data.filter((reservation) => reservation.volunteer_id === userId)
        );
      } catch {
        setApprovedReservations(undefined);
      }

      try {
        const { data } = await api.get<IReservation[]>(
          '/reservations/disapproved'
        );
        setDisapprovedReservations(
          data.filter((reservation) => reservation.volunteer_id === userId)
        );
      } catch {
        setDisapprovedReservations(undefined);
      }
    })();
  }, [userId]);

  useEffect(() => {
    setCurrentReservations(undefined);

    if (activeStatus === 'Aprovadas') {
      setCurrentReservations(approvedReservations);
    }

    if (activeStatus === 'Não aprovadas') {
      setCurrentReservations(disapprovedReservations);
    }

    if (activeStatus === 'Novas') {
      setCurrentReservations(newReservations);
    }
  }, [
    userId,
    activeStatus,
    newReservations,
    approvedReservations,
    disapprovedReservations,
  ]);

  return (
    <AppHeader title="Pedidos de reserva">
      <ReservationsTable reservationsData={currentReservations}>
        <ButtonGroup
          leftButton="Novas"
          middleButton="Aprovadas"
          rightButton="Não aprovadas"
          selectedButton={activeStatus}
          handleButtonChanged={handleButtonChanged}
        />
      </ReservationsTable>
    </AppHeader>
  );
}
