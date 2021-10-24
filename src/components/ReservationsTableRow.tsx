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

export function ReservationsTableRow({ reservations }: IReservationsProp) {
  const history = useHistory();

  const [modalTitle, setModalTitle] = useState('');
  const [open, setOpen] = useState(false);
  const [isForApproval, setIsForApproval] = useState(true);

  const [scheduled_at, setScheduledAt] = useState('');
  const [reservationId, setReservationId] = useState('');

  function handleOnClickQuiz(formReservationId: string) {
    setModalTitle('Confirmar Reserva');
    setReservationId(formReservationId);
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

    try {
      await api.post(`/reservation/approve/${reservationId}`, {
        scheduled_at: moment(scheduled_at).format('YYYY-MM-DD').toString(),
      });

      alert('Reserva Aprovada!');
      history.go(0);
    } catch {
      alert('Ocorreu algum erro!');
    }
  }

  async function handleDisapproved() {
    await api.post(`/reservation/disapprove/${reservationId}`);

    alert('Reserva marcada como Não Aprovada!');
    history.go(0);
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
                <Link to={`/app/animal/${reservation.animal.id}`}>
                  <div className="flex items-center">
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
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        {reservation.animal.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {reservation.animal.description}
                      </div>
                    </div>
                  </div>
                </Link>
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
                  : moment(reservation.scheduled_at).format('DD-MM-YYYY')}
              </td>
              {reservation.status !== 'adopted' && (
                <td className="flex px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {reservation.status === 'approved' ? (
                    <span
                      onClick={() => {
                        handleResolveReservation(reservation.id);
                      }}
                      className="flex-1 text-green-600 hover:text-blue-900 cursor-pointer"
                    >
                      Resolver
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        handleOnClickQuiz(reservation.id);
                      }}
                      className="flex-1 text-blue-600 hover:text-blue-900 cursor-pointer"
                    >
                      Visualizar
                    </span>
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
      />
    </>
  );
}
