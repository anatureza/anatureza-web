import { ChangeEvent, useState } from "react";
import { useHistory } from "react-router";

import api from "../services/api";
interface IAvatar {
  loadingAvatar: boolean;
  setLoadingAvatar: React.Dispatch<React.SetStateAction<any>>;
}

export function UserAvatar({ loadingAvatar, setLoadingAvatar }: IAvatar) {
  const history = useHistory();

  const [avatar, setAvatar] = useState<File>();

  function handleUpdateAvatar() {
    if (typeof avatar !== "undefined") {
      const data = new FormData();

      data.append("avatar", avatar);

      api.patch("/user/avatar", data).then(() => {
        alert("Avatar Alterado com sucesso!");
        history.go(0);
      });
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
