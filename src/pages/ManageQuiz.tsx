import { useEffect, useState, FormEvent, useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import {
  faExternalLinkAlt,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { ButtonGoBack } from '../components/ButtonGoBack';
import { QuizInput } from '../components/QuizInput';
import { questions } from './NewReservationQuiz';

import api from '../services/api';

import { IReservation } from '../types';

import NoProfilePic from '../assets/images/no-profile-pic-icon-24.jpg';
import { AuthContext } from '../contexts/AuthContext';
import moment from 'moment';

interface IReservationParams {
  reservation_id: string;
}

interface IScheduledAt {
  lastScheduledAt: string;
}

export function ManageQuiz() {
  const { reservation_id } = useParams<IReservationParams>();
  const history = useHistory();

  const { userId, userType } = useContext(AuthContext);

  const [animaIsAvailable, setAnimaIsAvailable] = useState(false);
  const [reservationIsNew, setReservationIsNew] = useState(false);
  const [reservationIsApproved, setReservationIsApproved] = useState(false);

  const [reservation, setReservation] = useState<IReservation | undefined>(
    undefined
  );
  const [loadingReservation, setLoadingReservation] = useState(true);
  const [scheduled_at, setScheduledAt] = useState('');

  const [animalVolunteerId, setAnimalVolunteerId] = useState('');
  const [userHasPermission, setUserHasPermission] = useState(false);

  const [lastScheduledAtError, setLastScheduledAtError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setUserHasPermission(false);
    if (userId === animalVolunteerId) setUserHasPermission(true);
    if (userType === 'admin') setUserHasPermission(true);
  }, [userId, userType, animalVolunteerId]);

  useEffect(() => {
    (async () => {
      setLoadingReservation(true);
      try {
        const { data } = await api.get<IReservation | undefined>(
          `/reservation/${reservation_id}`
        );
        if (typeof data !== 'undefined') {
          setReservation(data);

          setAnimalVolunteerId(data.animal.volunteer_id);

          setLoadingReservation(false);
        } else {
          alert('Dados Não Encontrados');
        }
      } catch {
        alert('Reserva não encontrada!');
        history.goBack();
      }
    })();
  }, [reservation_id, history]);

  useEffect(() => {
    if (typeof reservation !== 'undefined') {
      setAnimaIsAvailable(reservation.animal.available);

      if (reservation.status === 'new') {
        setReservationIsNew(true);
      } else {
        setReservationIsNew(false);
      }
      if (reservation.status === 'approved') {
        setReservationIsApproved(true);
      } else {
        setReservationIsApproved(false);
      }
    }
  }, [reservation]);

  async function handleApproveReservation() {
    if (typeof reservation !== 'undefined') {
      //Get last scheduled reservation from animal
      try {
        const {
          data: { lastScheduledAt },
        } = await api.get<IScheduledAt>(
          `/reservation/last/${reservation.animal_id}`
        );

        // scheduled_at from another reservation of the same animal
        const momentLastScheduled = moment(lastScheduledAt);

        // scheduled_at from current reservation
        const momentScheduledAt = moment(scheduled_at);

        if (momentScheduledAt.isSameOrBefore(momentLastScheduled)) {
          const error = `Data de nascimento inválida: última data de reserva de animal: ${moment(
            lastScheduledAt
          ).format('DD/MM/YYYY HH:mm')}`;
          setLastScheduledAtError(error);
          alert(error);

          return;
        }
      } catch {
        alert('Não foi possível aprovar a reserva.');
        return;
      }
      await api.post(`/reservation/approve/${reservation_id}`);
      alert('Reserva aprovada!');
    }
  }

  async function handleOnSubmit(event: FormEvent) {
    event.preventDefault();

    if (typeof reservation !== 'undefined') {
      try {
        if (reservation.status === 'new') {
          handleApproveReservation();
        }

        if (reservation.status === 'approved') {
          await api.post(`/reservation/adopt/${reservation_id}`);
          alert('Animal adotado!');
          history.push('/app/reservas');
          return;
        }
      } catch {
        alert('Não foi possível concluir a ação!');
      } finally {
        return;
      }
    }
  }

  async function handleDisapproveReservation() {
    try {
      await api.post(`/reservation/disapprove/${reservation_id}`);

      alert('Reserva marcada como Não Aprovada!');
      history.go(0);
    } catch {
      alert('Ocorreu Algum Erro!');
    }
  }

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-8">
      <form onSubmit={handleOnSubmit}>
        <div className="container max-w-2xl mx-auto shadow-lg md:w-3/4 rounded-lg border-t-2 border-blue-400">
          <div className="m-4">
            <ButtonGoBack />
            <h1 className="inline-block align-bottom text-4xl font-bold select-none">
              {reservation?.status === 'adopted'
                ? 'Informações da adoção'
                : 'Gerenciar reserva'}
            </h1>
          </div>

          <hr className="my-4" />

          <div className="px-4">
            <h6 className="text-2xl text-gray-900 font-semibold select-none">
              Informações do animal
            </h6>
            {typeof reservation !== 'undefined' &&
              reservation.animal.main_image_url !== null && (
                <div className="p-2">
                  <img
                    className="h-14 w-14 object-cover rounded-md"
                    src={`${api.defaults.baseURL}/uploads/${reservation.animal.images[0].path}`}
                    alt="animal"
                  />
                </div>
              )}
            <p className="select-none font-semibold object-cover ">
              Nome:{' '}
              <span className="font-normal">
                {typeof reservation !== 'undefined'
                  ? reservation.animal.name
                  : '...'}
              </span>
            </p>
            <p className="select-none font-semibold">
              Voluntário responsável:{' '}
              <span className="font-normal">
                {typeof reservation !== 'undefined'
                  ? reservation.animal.user.name
                  : '...'}
              </span>
            </p>
            {typeof reservation !== 'undefined' && (
              <Link to={`/app/animal/${reservation.animal_id}`}>
                <span className="font-medium text-blue-400 hover:text-blue-500 hover:underline">
                  Ver mais sobre o animal{' '}
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </span>
              </Link>
            )}
          </div>

          <hr className="my-4" />

          <div className="p-4">
            <h6 className="text-2xl text-gray-900 font-semibold select-none">
              Informações do adotante
            </h6>
            {typeof reservation !== 'undefined' && (
              <div className="p-2">
                <img
                  className="h-14 w-14 rounded-md"
                  src={reservation.userAdopter.avatar_url || NoProfilePic}
                  alt="user"
                />
              </div>
            )}
            <p>
              <span className="font-semibold">Nome: </span>
              {typeof reservation === 'undefined'
                ? '...'
                : reservation.userAdopter.name}
            </p>
            <p>
              <span className="font-semibold">Número para contato: </span>
              {typeof reservation !== 'undefined' && (
                <a
                  className=""
                  href={`https://api.whatsapp.com/send?phone=+55${
                    reservation.userAdopter.phone_number
                  }&text=Olá,%20quero%20falar%20sobre%20o%20animal%20${
                    typeof reservation !== 'undefined'
                      ? reservation.animal.name
                      : ''
                  }`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {typeof reservation !== 'undefined'
                    ? reservation.userAdopter.phone_number
                    : '...'}{' '}
                  <FontAwesomeIcon icon={faExternalLinkAlt} />
                </a>
              )}
            </p>
            <p>
              <span className="font-semibold">Endereço: </span>
              {typeof reservation === 'undefined'
                ? '...'
                : `${reservation.userAdopter.address.place}, ${reservation.userAdopter.address.number}, ${reservation.userAdopter.address.complement}`}
            </p>
            <p>
              <span className="font-semibold">Bairro: </span>
              {typeof reservation === 'undefined'
                ? '...'
                : ` ${reservation.userAdopter.address.neighborhood}`}
            </p>
            <p>
              <span className="font-semibold">Cidade: </span>
              {typeof reservation === 'undefined'
                ? '...'
                : ` ${reservation.userAdopter.address.city}`}
            </p>
            <p>
              <span className="font-semibold">CEP: </span>
              {typeof reservation === 'undefined'
                ? '...'
                : reservation.userAdopter.address.zip}
            </p>
            {typeof reservation !== 'undefined' && (
              <p>
                <span className="font-semibold p-2">
                  O Usuário{' '}
                  <span
                    className={`${
                      reservation.userAdopter.authorizes_image
                        ? 'text-green-600'
                        : 'text-red-600'
                    } font-medium`}
                  >
                    {reservation.userAdopter.authorizes_image
                      ? 'Aceita'
                      : 'Não'}
                  </span>{' '}
                  a divulgação de imagem
                </span>
              </p>
            )}
          </div>
          <hr className="my-4" />
          <div className="p-4">
            <h1 className="inline-block align-bottom text-2xl font-bold">
              Respostas do questionário
            </h1>
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.first
                  : ''
              }
              disabled={true}
              question={questions[0]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.second
                  : ''
              }
              disabled={true}
              question={questions[1]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.third
                  : ''
              }
              disabled={true}
              question={questions[2]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.fourth
                  : ''
              }
              disabled={true}
              question={questions[3]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.fifth
                  : ''
              }
              disabled={true}
              question={questions[4]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.sixth
                  : ''
              }
              disabled={true}
              question={questions[5]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.seventh
                  : ''
              }
              disabled={true}
              question={questions[6]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.eighth
                  : ''
              }
              disabled={true}
              question={questions[7]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.ninth
                  : ''
              }
              disabled={true}
              question={questions[8]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.tenth
                  : ''
              }
              disabled={true}
              question={questions[9]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.eleventh
                  : ''
              }
              disabled={true}
              question={questions[10]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.twelfth
                  : ''
              }
              disabled={true}
              question={questions[11]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.thirteenth
                  : ''
              }
              disabled={true}
              question={questions[12]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.fourteenth
                  : ''
              }
              disabled={true}
              question={questions[13]}
            />
            <QuizInput
              answer={
                loadingReservation
                  ? '...'
                  : typeof reservation !== 'undefined'
                  ? reservation.quiz.fifteenth
                  : ''
              }
              disabled={true}
              question={questions[14]}
            />
          </div>
          <hr className="my-4" />
          {reservationIsNew && (
            <>
              <div className="m-4">
                <label
                  htmlFor="scheduled_at"
                  className="text-sm text-gray-500 mb-4"
                >
                  Agendar data de Reserva
                </label>
                <input
                  type="datetime-local"
                  required
                  className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  name="scheduled_at"
                  value={scheduled_at}
                  onChange={(event) => {
                    setScheduledAt(event.target.value);
                  }}
                />
                {lastScheduledAtError !== '' && (
                  <>
                    <span className="text-red-600">{lastScheduledAtError}</span>
                    <br />
                  </>
                )}
              </div>
              <hr className="my-4" />
            </>
          )}

          <div className="w-full pb-4 px-4 focus-within:text-gray-500 flex">
            {/* CANCEL - Go Back */}
            <button
              className="inline-block py-2 bg-gray-600 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
              type="button"
              onClick={() => {
                history.goBack();
              }}
            >
              Voltar
            </button>
            {userHasPermission && (
              <>
                {animaIsAvailable && (
                  <button
                    type="button"
                    onClick={handleDisapproveReservation}
                    className="inline-block ml-2 py-2 left-0 inset-y-0 items-center pl-3 bg-red-600 hover:bg-red-700 focus:ring-red-500 focus:ring-offset-red-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  >
                    <FontAwesomeIcon
                      icon={faTimesCircle}
                      size="sm"
                      className="mr-2 text-orange-300 group-hover:text-orange-700"
                    />
                    Reprovar reserva
                  </button>
                )}

                {reservationIsNew || reservationIsApproved ? (
                  <button
                    type="submit"
                    className="inline-block ml-2 py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    {reservationIsNew && 'Aprovar questionário'}
                    {reservationIsApproved && 'Confirmar adoção'}
                  </button>
                ) : (
                  ''
                )}
              </>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
