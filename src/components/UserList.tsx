import { IUser } from '../types';

import NoProfilePic from '../assets/images/no-profile-pic-icon-24.jpg';
import { Dispatch, SetStateAction } from 'react';

interface IUserProp {
  user: IUser;
  setUserIdToBeChanged: Dispatch<SetStateAction<string>>;
  setUserTypeToBeChanged: Dispatch<SetStateAction<string>>;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

export function UserList({
  user,
  setOpenModal,
  setUserIdToBeChanged,
  setUserTypeToBeChanged,
}: IUserProp) {
  return (
    <tr key={user.id}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img
              className="h-10 w-10 rounded-full"
              src={user.avatar_url || NoProfilePic}
              alt={`Usuário ${user.name}`}
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{user.name}</div>
            <div className="text-sm text-gray-500">{user.address.city}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.phone_number}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
        {user.type === 'volunteer' ? (
          <span className="px-4 py-2 text-sm rounded-full text-green-600 bg-green-200 ">
            Voluntário
          </span>
        ) : user.type === 'user' ? (
          <span className="px-4 py-2 text-sm rounded-full text-blue-600 bg-blue-200 ">
            Padrão
          </span>
        ) : (
          <span className="px-4 py-2 text-sm rounded-full text-gray-600 bg-gray-200 ">
            Admin
          </span>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {user.type === 'user' ? (
          <button
            className="text-green-600 hover:text-green-900"
            onClick={() => {
              setUserTypeToBeChanged(user.type);
              setUserIdToBeChanged(user.id);
              setOpenModal(true);
            }}
          >
            Tornar voluntário
          </button>
        ) : user.type === 'volunteer' ? (
          <button
            className="text-blue-600 hover:text-blue-900"
            onClick={() => {
              setUserTypeToBeChanged(user.type);
              setUserIdToBeChanged(user.id);
              setOpenModal(true);
            }}
          >
            Tornar usuário padrão
          </button>
        ) : (
          <span className="text-gray-800 cursor-not-allowed">Já é admin</span>
        )}
      </td>
    </tr>
  );
}
