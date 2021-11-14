import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import api from '../services/api';
import { ModalDelete } from './ModalDelete';

interface IAnimalImage {
  id: string;
  path: string;
}

interface IImageProps {
  images: IAnimalImage[];
  animalId: string;
  setImages: Dispatch<SetStateAction<any>>;
  altAnimalName: string;
  userHasPermission: boolean;
}

interface IHandleDeleteImage {
  animal_id: string;
  image_id: string;
}

export function EditImages({
  images,
  altAnimalName,
  setImages,
  animalId,
  userHasPermission,
}: IImageProps) {
  const [modalOpen, setModalOpen] = useState(false);

  const [deleteImageId, setDeleteAnimalImageId] = useState('');
  const [deleteImagePath, setDeleteAnimalImagePath] = useState('');

  const [uploadImages, setUploadImages] = useState<File[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [loadingUploadImages, setLoadingUploadImages] = useState(true);

  async function handleDeleteImage({
    animal_id,
    image_id,
  }: IHandleDeleteImage) {
    try {
      const { data } = await api.delete<IAnimalImage>(
        `/animal/${animal_id}/image/${image_id}`
      );

      setModalOpen(false);
      setImages(data);
    } catch {
      alert('Ocorreu algum erro ao excluir a imagem!');
    }
  }

  function handleSelectNewImages(event: ChangeEvent<HTMLInputElement>) {
    if (userHasPermission) {
      if (!event.target.files) {
        setLoadingUploadImages(true);
        return;
      }

      const selectedImages = Array.from(event.target.files);

      setUploadImages(selectedImages);

      const selectedImagesPreview = selectedImages.map((image) => {
        return URL.createObjectURL(image);
      });

      setPreviewImages(selectedImagesPreview);
      setLoadingUploadImages(false);
    }
  }

  async function handleUploadNewImages() {
    if (uploadImages.length < 1) {
      return;
    }

    const imagesData = new FormData();

    uploadImages.forEach((image) => {
      imagesData.append('images', image);
    });

    try {
      const { data } = await api.patch<IAnimalImage>(
        `/animal/${animalId}/image`,
        imagesData
      );
      setImages(data);
      setPreviewImages([]);
      setLoadingUploadImages(true);

      alert('Fotos do animal foram atualizadas com sucesso!');
    } catch {
      alert('Ocorreu algum erro ao enviar a imagem!');
    }
  }

  return (
    <>
      <div className="p-4 h-full">
        {userHasPermission && images.length > 0 && (
          <h1 className="text-xl">Editar imagens do animal</h1>
        )}
        <div className="flex">
          <div className={`flex-auto grid grid-cols-3 gap-x-1 gap-y-1 my-2`}>
            {images.map((image) => (
              <div
                key={image.id}
                className={`relative h-full border-0 cursor-pointer rounded-md bg-none outline-none`}
                onClick={() => {
                  console.log(userHasPermission);
                  if (userHasPermission) {
                    setDeleteAnimalImageId(image.id);
                    setDeleteAnimalImagePath(image.path);
                    setModalOpen(true);
                  }
                }}
              >
                <img
                  src={`${api.defaults.baseURL}/uploads/${image.path}`}
                  alt={altAnimalName}
                  className="h-72 w-full object-cover"
                />
                {userHasPermission && (
                  <div className="absolute h-full w-full inset-0 opacity-0 hover:opacity-80 hover:bg-red-50 m-0 py-20">
                    <div className="object-center left-0 top-2/4 text-red-600 text-center">
                      <FontAwesomeIcon
                        icon={faTrash}
                        size="8x"
                        className="opacity-50"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {/* Preview Images Array */}
            {previewImages.map((image) => (
              <div
                key={image}
                className={`relative h-full border-0 rounded-md bg-none outline-none`}
              >
                <img
                  src={image}
                  alt={`Preview`}
                  className="h-72 w-full object-cover"
                />
              </div>
            ))}
            {userHasPermission && (
              <div
                className={`relative h-full border-0 cursor-pointer bg-none outline-none`}
              >
                {/* Background color div */}
                <div className="h-72 w-full bg-gray-50 rounded-md"></div>

                <div
                  className={`absolute h-full w-full inset-0 
                text-blue-600 text-center opacity-60 
                hover:opacity-90  
                rounded-md m-0 py-20`}
                >
                  <div className="object-center left-0 top-2/4 cursor-pointer">
                    <label htmlFor="image[]">
                      <FontAwesomeIcon icon={faPlus} size="8x" />
                    </label>
                    <input
                      type="file"
                      id="image[]"
                      multiple
                      onChange={handleSelectNewImages}
                      className="mt-1 sr-only"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        {!loadingUploadImages && (
          <div className="flex mt-4 items-center">
            <button
              type="button"
              onClick={handleUploadNewImages}
              className="block ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Salvar Novas Fotos
            </button>
            <button
              type="button"
              className="block ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => {
                setUploadImages([]);
                setPreviewImages([]);
                setLoadingUploadImages(true);
              }}
            >
              Cancelar
            </button>
          </div>
        )}
      </div>
      <ModalDelete
        title={'Você deseja realmente excluir esta foto?'}
        handleSubmit={() => {
          handleDeleteImage({ animal_id: animalId, image_id: deleteImageId });
        }}
        imagePath={deleteImagePath}
        open={modalOpen}
        setOpen={setModalOpen}
      />
    </>
  );
}
