import { ChangeEvent, useContext, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import api from '../services/api';
import { IUser } from '../types';

interface IAvatar {
  loadingAvatar: boolean;
  setLoadingAvatar: React.Dispatch<React.SetStateAction<any>>;
  setUserPreviewAvatar: React.Dispatch<React.SetStateAction<any>>;
}

export function UserAvatar({
  loadingAvatar,
  setLoadingAvatar,
  setUserPreviewAvatar,
}: IAvatar) {
  const { handleUploadAvatar } = useContext(AuthContext);

  const [avatar, setAvatar] = useState<File>();

  async function handleUpdateAvatar() {
    if (typeof avatar !== 'undefined') {
      const data = new FormData();

      data.append('avatar', avatar);

      const response = await api.patch<IUser>('/user/avatar', data);
      if (response.data.avatar_url !== null) {
        setUserPreviewAvatar(response.data.avatar_url);
        handleUploadAvatar({ newUserAvatarUrl: response.data.avatar_url });
      }
      alert('Avatar Alterado com sucesso!');
    }
  }

  function handleSelectAvatar(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedAvatar = Array.from(event.target.files)[0];

    setAvatar(selectedAvatar);
  }

  return (
    <div className="px-4">
      <div>
        {loadingAvatar && (
          <div className="input-block items-center relative mt-6">
            <button
              type="button"
              className="block ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                setLoadingAvatar(false);
              }}
            >
              Mudar Foto de Perfil
            </button>
          </div>
        )}
        {!loadingAvatar && (
          <>
            <label className="block text-gray-500" htmlFor="avatar">
              Clique aqui para escolher uma nova foto
            </label>
            <input
              className="mt-1"
              onChange={handleSelectAvatar}
              type="file"
              id="avatar"
            />
          </>
        )}
      </div>
      {!loadingAvatar && (
        <div className="mt-4 flex items-center">
          <button
            type="button"
            onClick={handleUpdateAvatar}
            className="block ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Salvar Foto de Perfil
          </button>
          <button
            type="button"
            className="block ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => {
              setLoadingAvatar(true);
            }}
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
