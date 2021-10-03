import { Fragment, useState, useContext } from "react";

import { Link, useLocation } from "react-router-dom";

import { AuthContext } from "../contexts/AuthContext";

import { Disclosure, Menu, Transition } from "@headlessui/react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import LogoNavbar from "../assets/images/logo-an-navbar.png";
import { useEffect } from "react";
import api from "../services/api";

type ClassesTypes = string[];

type UserData = {
  id: string;
  name: string;
  email: string;
  password: string;
  phone_number: string;
  birth_date: Date;
  type?: string;
  avatar_url: string | null | undefined;
};

function classNames(...classes: ClassesTypes) {
  return classes.filter(Boolean).join(" ");
}

export function Navbar() {
  const location = useLocation();

  const { handleLogout, authenticated } = useContext(AuthContext);
  const [user, setUser] = useState<UserData | undefined>();

  // const [userAvatar, setUserAvatar] = useState

  const navigation = [
    { name: "Página inicial", href: "/", current: location.pathname === "/" },
    { name: "Ajuda", href: "/faq", current: location.pathname === "/faq" },
    {
      name: "Animais para adoção",
      href: "/animais-adocao",
      current: location.pathname === "/animais-adocao",
    },
  ];

  useEffect(() => {
    if (authenticated) {
      api
        .get("/user")
        .then(({ data }) => {
          setUser(data);
        })
        .catch(() => {
          handleLogout();
        });
    }
  }, [authenticated, handleLogout]);

  if (authenticated) {
    if (!user) {
      return <h1>Carregando...</h1>;
    }
  }

  return (
    <Disclosure as="nav" className="bg-blue-400">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faBars}
                      className="block h-6 w-6"
                      aria-hidden="true"
                    />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src={LogoNavbar}
                    alt="Logo Amantes da Natureza"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src={LogoNavbar}
                    alt="Logo Amantes da Natureza"
                  />
                </div>
                <div className="hidden sm:block sm:ml-6">
                  <div className="flex space-x-4">
                    {navigation.map((item, index) => (
                      <Link key={index} to={item.href}>
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
                          {item.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {authenticated ? (
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>
                        {typeof user !== "undefined" && (
                          <img
                            className="h-8 w-8 rounded-full"
                            src={
                              user.avatar_url ||
                              "https://icon-library.com/images/no-profile-pic-icon/no-profile-pic-icon-24.jpg"
                            }
                            alt="User"
                          />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link to="/meus-dados">
                              <span
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm text-gray-700"
                                )}
                              >
                                Meus dados
                              </span>
                            </Link>
                          )}
                        </Menu.Item>
                        {/*Admin/Volunteer Only*/}
                        {user?.type !== "user" && (
                          <Menu.Item>
                            {({ active }) => (
                              <Link to="/app">
                                <span
                                  className={classNames(
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm text-gray-700"
                                  )}
                                >
                                  Dashboard
                                </span>
                              </Link>
                            )}
                          </Menu.Item>
                        )}
                        <Menu.Item>
                          {({ active }) => (
                            <span
                              onClick={handleLogout}
                              className={classNames(
                                active ? "bg-gray-100 cursor-pointer" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              Desconectar
                            </span>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                    <a
                      href="/signin"
                      className={`ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                        location.pathname === "/signin" ? "bg-blue-500" : ""
                      } hover:bg-blue-700`}
                    >
                      Já tem conta?
                    </a>
                    <a
                      href="/cadastre-se"
                      className={`ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white ${
                        location.pathname === "/cadastre-se"
                          ? "bg-blue-500"
                          : ""
                      } hover:bg-blue-700`}
                    >
                      Cadastre-se
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item, index) => (
                <Link key={index} to={item.href}>
                  <a
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 bg-opacity-50 text-white"
                        : "text-gray-200 hover:bg-gray-800 hover:bg-opacity-75 hover:text-white",
                      "block px-3 py-2 rounded-md text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </a>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
