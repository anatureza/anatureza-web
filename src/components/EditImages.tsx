import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import api from "../services/api";
import { ModalDelete } from "./ModalDelete";

interface IAnimalImage {
  id: string;
  path: string;
}

interface IImageProps {
  images: IAnimalImage[];
  setImages: React.Dispatch<React.SetStateAction<any>>;
  altAnimalName: string;
}

export function EditImages({ images, altAnimalName, setImages }: IImageProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteImagePath, setDeleteImagePath] = useState("");

  async function handleDeleteImage() {}

  return (
    <>
      <div className="p-4 h-full">
        <h1 className="text-xl">Editar imagens do animal</h1>
        <div className="flex">
          <div className={`flex-auto grid grid-cols-3 gap-x-1 gap-y-1 my-2`}>
            {images.map((image) => (
              <div
                key={image.id}
                className={`relative h-full border-0 cursor-pointer rounded-md bg-none outline-none}`}
                onClick={() => {
                  setDeleteImagePath(image.path);
                  setModalOpen(true);
                }}
              >
                <img
                  src={`${api.defaults.baseURL}/uploads/${image.path}`}
                  alt={altAnimalName}
                  className="h-72 w-full object-cover"
                />
                <div className="absolute h-full w-full inset-0 opacity-0 hover:opacity-80 hover:bg-red-50 m-0 py-20">
                  <div className="object-center left-0 top-2/4 text-red-600 text-center">
                    <FontAwesomeIcon
                      icon={faTrash}
                      size="8x"
                      className="opacity-50"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalDelete
        title={"Você deseja realmente excluir esta foto?"}
        handleSubmit={handleDeleteImage}
        imagePath={deleteImagePath}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </>
  );
}
