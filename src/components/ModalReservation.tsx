import { FormEvent, Fragment, useRef } from 'react';

import { Link } from 'react-router-dom';

import { Dialog, Transition } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';

interface IModalProps {
  isForApproval: boolean;
  title: string;
  reservationId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<any>>;
  inputItem?: string;
  setInputItem?: React.Dispatch<React.SetStateAction<any>>;
  handleSubmit: (event: FormEvent) => void;
  handleDisapproved: () => void;
}

export function ModalReservation({
  isForApproval,
  title,
  reservationId,
  open,
  setOpen,
  inputItem,
  setInputItem,
  handleSubmit,
  handleDisapproved,
}: IModalProps) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <form
              onSubmit={handleSubmit}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FontAwesomeIcon
                      icon={faExclamation}
                      className="h-6 w-6 text-blue-600"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {title}
                    </Dialog.Title>
                    <div className="mt-2">
                      {isForApproval && typeof setInputItem !== 'undefined' && (
                        <>
                          <label
                            htmlFor="scheduled_at"
                            className="text-sm text-gray-500 mb-4"
                          >
                            Agendar data de Reserva
                          </label>
                          <input
                            type="datetime-local"
                            required
                            className="rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                            name="scheduled_at"
                            value={inputItem}
                            onChange={(event) => {
                              setInputItem(event.target.value);
                            }}
                          />
                        </>
                      )}
                      <Link to={`/app/reserva/${reservationId}`}>
                        <p className="text-sm text-gray-500">
                          Visualizar Questionário
                        </p>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="submit"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={handleDisapproved}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-yellow-600 text-base font-medium text-white hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {isForApproval
                    ? 'Reprovar Questionário'
                    : 'Marcar Como Desaprovado'}
                </button>

                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    setOpen(false);
                  }}
                  ref={cancelButtonRef}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
