import { Dispatch, Fragment } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { Link, useLocation } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendar,
  faCat,
  faPlusCircle,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { faBell } from "@fortawesome/free-regular-svg-icons";

type SlideOverProps = {
  open: boolean;
  setOpen: Dispatch<React.SetStateAction<boolean>>;
};

type ClassesTypes = string[];

function classNames(...classes: ClassesTypes) {
  return classes.filter(Boolean).join(" ");
}

export function SlideOver({ open, setOpen }: SlideOverProps) {
  const location = useLocation();

  const adminNavigation = [
    {
      name: "Dashboard",
      href: "/app",
      current: location.pathname === "/app",
      icon: faBell,
    },
    {
      name: "Reservas",
      href: "/app/reservas",
      current: location.pathname === "/app/reservas",
      icon: faCalendar,
    },
    {
      name: "Animais",
      href: "/app/animais",
      current: location.pathname === "/app/animais",
      icon: faCat,
    },
    {
      name: "Adicionar animal",
      href: "/app/animal/novo",
      current: location.pathname === "/app/animal/new",
      icon: faPlusCircle,
    },
  ];

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden"
        onClose={setOpen}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>
          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="relative w-screen max-w-md">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-500"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-500"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                    <button
                      type="button"
                      className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                      onClick={() => setOpen(false)}
                    >
                      <span className="sr-only">Close panel</span>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className="h-6 w-8"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-lg font-medium text-gray-900">
                      Painel do Admin
                    </Dialog.Title>
                  </div>
                  <div className="mt-6 relative flex-1 px-4 sm:px-6">
                    {adminNavigation.map((item, index) => (
                      <Link key={index} to={item.href}>
                        <div className="mt-8">
                          <span
                            key={item.name}
                            className={classNames(
                              item.current
                                ? "bg-gray-600 bg-opacity-50 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:bg-opacity-75 hover:text-white",
                              "px-3 py-2 rounded-md text-sm font-medium"
                            )}
                            aria-current={item.current ? "page" : undefined}
                          >
                            <FontAwesomeIcon
                              className="mr-2"
                              icon={item.icon}
                            />
                            {item.name}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
