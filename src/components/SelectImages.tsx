import { useEffect, useState } from "react";
import api from "../services/api";

type ImageProps = {
  images: Array<{
    id: string;
    path: string;
  }>;
  animalName: string;
};

export function SelectImages({ images, animalName }: ImageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imagesLength, setImagesLength] = useState(0);

  useEffect(() => {
    setImagesLength(images.length);
  }, [images.length]);

  return (
    <div className="flex p-4 h-72">
      <img
        className="flex-1 h-full w-full rounded-md object-cover"
        src={`${api.defaults.baseURL}/uploads/${images[activeImageIndex].path}`}
        alt={animalName}
      />
      {imagesLength > 1 && (
        <div className={`flex-1 grid grid-cols-3 gap-x-1 gap-y-1 mx-2`}>
          {images.map((image, index) => (
            <button
              key={image.id}
              className={`h-full border-0 cursor-pointer rounded-md bg-none overflow-hidden outline-none opacity-50 ${
                activeImageIndex === index ? "opacity-100" : ""
              }`}
              type="button"
              onClick={() => {
                setActiveImageIndex(index);
              }}
            >
              <img
                src={`${api.defaults.baseURL}/uploads/${image.path}`}
                alt={animalName}
                className="h-72 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
