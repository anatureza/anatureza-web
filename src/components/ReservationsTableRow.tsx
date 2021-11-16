import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faDog } from '@fortawesome/free-solid-svg-icons';

import { ModalReservation } from './ModalReservation';

import api from '../services/api';

import { IReservation } from '../types';

interface IReservationsProp {
  reservations: IReservation[];
}

interface IScheduledAt {
  lastScheduledAt: string | boolean;
}

export function ReservationsTableRow({ reservations }: IReservationsProp) {
  const history = useHistory();

  const [modalTitle, setModalTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [isForApproval, setIsForApproval] = useState(true);

  const [scheduled_at, setScheduledAt] = useState('');
  const [reservationId, setReservationId] = useState('');

  const [animalId, setAnimalId] = useState('');
  const [lastScheduledAtError, setLastScheduledAtError] = useState('');

  function handleOnClickQuiz(formReservationId: string, animal_id: string) {
    setModalTitle('Confirmar Reserva');
    setReservationId(formReservationId);
    setAnimalId(animal_id);
    setIsForApproval(true);
    setOpen(true);
  }

  function handleResolveReservation(formReservationId: string) {
    setModalTitle('Confirmar Adoção');
    setReservationId(formReservationId);
    setIsForApproval(false);
    setOpen(true);
  }

  async function handleOnSubmitAdoption(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post(`/reservation/adopt/${reservationId}`);

      alert('Animal Adotado!');
      history.push('/app/animais');
    } catch {
      alert('Ocorreu algum erro!');
    }
  }

  async function handleOnSubmitReservation(event: FormEvent) {
    event.preventDefault();

    //Get last scheduled reservation from animal
    try {
      const {
        data: { lastScheduledAt },
      } = await api.get<IScheduledAt>(`/reservation/last/${animalId}`);

      // scheduled_at from current reservation
      const momentScheduledAt = moment(scheduled_at);

      if (typeof lastScheduledAt !== 'boolean') {
        // scheduled_at from another reservation of the same animal
        const momentLastScheduled = moment(lastScheduledAt);

        // throw error if there already is a reservation scheduled after current reservation
        if (momentScheduledAt.isSameOrBefore(momentLastScheduled)) {
          const error = `Data de reserva inválida última data de reserva de animal: ${moment(
            lastScheduledAt
          ).format('DD/MM/YYYY HH:mm')}`;
          setLastScheduledAtError(error);
          alert(error);

          return;
        }
      }

      if (momentScheduledAt.isSameOrBefore(moment())) {
        const error = `Data de reserva inválida, a reserva deve ser futura`;
        setLastScheduledAtError(error);
        alert(error);

        return;
      }
    } catch {
      alert('Não foi possível aprovar a reserva.');
      return;
    }

    try {
      await api.post(`/reservation/approve/${reservationId}`, {
        scheduled_at: moment(scheduled_at).format('YYYY-MM-DD HH:mm:ss'),
      });

      alert('Reserva Aprovada!');
      history.go(0);
    } catch (err) {
      alert('Ocorreu algum erro!');
    }
  }

  async function handleDisapproved() {
    try {
      await api.post(`/reservation/disapprove/${reservationId}`);

      alert('Reserva marcada como Não Aprovada!');
      history.go(0);
    } catch {
      alert('Ocorreu Algum Erro!');
    }
  }

  return (
    <>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Animal
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Adotante
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Data do pedido
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Data marcada
            </th>
            <th scope="col" className="relative px-6 py-3">
              <span className="sr-only">Editar</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {reservations.map((reservation, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <Link to={`/app/reservas?animalId=${reservation.animal.id}`}>
                    <div className="flex-shrink-0 h-10 w-10">
                      {reservation.animal.main_image_url ? (
                        <img
                          className="h-10 w-10 rounded-full"
                          src={reservation.animal.main_image_url}
                          alt={`Animal ${reservation.animal.name}`}
                        />
                      ) : reservation.animal.kind === 'cat' ? (
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
                  </Link>
                  <div className="ml-4">
                    <Link
                      to={`/app/reservas?animalId=${reservation.animal.id}`}
                    >
                      <div className="text-sm font-medium text-gray-900 cursor-pointer select-none">
                        {reservation.animal.name}
                      </div>
                    </Link>
                    <div className="text-sm text-gray-500">
                      Nº para contato: {reservation.animal.user.phone_number}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {reservation.userAdopter.name}
                </div>
                <div className="text-sm text-gray-500">
                  {`Telefone: ${reservation.userAdopter.phone_number}`}
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {moment(reservation.created_at).format('DD-MM-YYYY')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {!reservation.scheduled_at
                  ? 'Não marcada'
                  : moment(reservation.scheduled_at).format('DD-MM-YYYY HH:mm')}
              </td>
              {reservation.status !== 'adopted' && (
                <td className="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {reservation.status === 'new' ? (
                    <span
                      onClick={() => {
                        handleOnClickQuiz(
                          reservation.id,
                          reservation.animal_id
                        );
                      }}
                      className="flex-1 text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      Visualizar
                    </span>
                  ) : reservation.status === 'approved' ? (
                    <span
                      onClick={() => {
                        handleResolveReservation(reservation.id);
                      }}
                      className="flex-1 text-green-600 hover:text-blue-900 cursor-pointer"
                    >
                      Resolver
                    </span>
                  ) : (
                    <Link
                      className="flex-1 text-blue-600 hover:text-blue-900 cursor-pointer"
                      to={`/app/reserva/${reservation.id}`}
                    >
                      <span>Questionário</span>
                    </Link>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <ModalReservation
        title={modalTitle}
        reservationId={reservationId}
        open={open}
        setOpen={setOpen}
        inputItem={scheduled_at}
        setInputItem={setScheduledAt}
        isForApproval={isForApproval}
        handleSubmit={
          isForApproval ? handleOnSubmitReservation : handleOnSubmitAdoption
        }
        handleDisapproved={handleDisapproved}
        lastScheduledAtError={lastScheduledAtError}
      />
    </>
  );
}
