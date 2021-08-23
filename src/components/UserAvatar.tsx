import { ChangeEvent, useState } from "react";

type AvatarProps = {
  user_avatar?: string;
};

export function UserAvatar({ user_avatar }: AvatarProps) {
  const [avatar, setAvatar] = useState<File>();
  const [previewAvatar, setPreviewAvatar] = useState<string | undefined>(
    user_avatar
  );

  function handleSelectAvatar(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      return;
    }

    const selectedAvatar = Array.from(event.target.files)[0];

    setAvatar(selectedAvatar);

    const selectedAvatarPreview = URL.createObjectURL(selectedAvatar);

    setPreviewAvatar(selectedAvatarPreview);
  }

  return (
    <form action={`/upload/`}>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Avatar
        </label>
        <div className="mt-1 flex items-center">
          <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
            {previewAvatar ? (
              <img src={previewAvatar} alt="User" />
            ) : (
              <svg
                className="h-full w-full text-gray-300"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            )}
          </span>
          <label
            htmlFor="file-upload"
            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
          >
            <span className="ml-4">Enviar foto de avatar</span>
            <input
              id="file-upload"
              name="avatar"
              type="file"
              className="sr-only"
              onChange={handleSelectAvatar}
            />
          </label>
        </div>
      </div>
    </form>
  );
}
