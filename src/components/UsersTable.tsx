import { ReactNode, useState } from 'react';

import { UserList } from './UserList';

import { IUser } from '../types';
import api from '../services/api';
import { useHistory } from 'react-router';
import { ModalChangeUserType } from './ModalChangeUserType';

interface IUsersDataProp {
  usersData: IUser[] | undefined;
  children: ReactNode;
}

export function UsersTable({ usersData, children }: IUsersDataProp) {
  const history = useHistory();

  const [userIdToBeChanged, setUserIdToBeChanged] = useState<string>('');
  const [userTypeToBeChanged, setUserTypeToBeChanged] = useState<string>('');

  const [openModal, setOpenModal] = useState(false);

  async function handleUserPromotion() {
    if (userTypeToBeChanged === 'user') {
      try {
        await api.patch(`/user/volunteer/${userIdToBeChanged}`);
        alert('Usuário promovido para voluntário!');
        history.go(0);
      } catch {
        alert('Ocorreu algum erro durante o processo.');
      }
    }
    if (userTypeToBeChanged === 'volunteer') {
      try {
        await api.patch(`/user/user/${userIdToBeChanged}`);
        alert('Voluntário agora é um usuário padrão!');
        history.go(0);
      } catch {
        alert('Ocorreu algum erro durante o processo.');
      }
    }
  }

  return (
    <main>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div>
          {children}
          <div className="px-4 py-6 sm:px-0">
            <div className="flex flex-col mt-4 mb-2">
              <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                  <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    {typeof usersData !== 'undefined' &&
                    usersData.length > 0 ? (
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Usuário
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              ID
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Nº Telefone
                            </th>
                            <th
                              scope="col"
                              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                            >
                              Tipo
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Ações</span>
                            </th>
                          </tr>
                        </thead>

                        <tbody className="bg-white divide-y divide-gray-200">
                          {usersData.map((user) => (
                            <UserList
                              key={user.id}
                              user={user}
                              setOpenModal={setOpenModal}
                              setUserIdToBeChanged={setUserIdToBeChanged}
                              setUserTypeToBeChanged={setUserTypeToBeChanged}
                            />
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="p-10 text-center">
                        <h1 className="text-2xl text-gray-700">
                          Nenhum usuário encontrado
                        </h1>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalChangeUserType
        handleSubmit={handleUserPromotion}
        open={openModal}
        setOpen={setOpenModal}
        text={
          userTypeToBeChanged === 'volunteer'
            ? 'Remover voluntário'
            : userTypeToBeChanged === 'user'
            ? 'Tornar voluntário'
            : 'erro'
        }
        title="Editar função do usuário"
      />
    </main>
  );
}
