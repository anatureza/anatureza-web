import { useState } from "react";

type ImageProps = {
  images: Array<{
    id: string;
    path: string;
  }>;
  animalName: string;
};

export function SelectImages({ images, animalName }: ImageProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const imagesLenght = images.length;

  return (
    <div className="flex p-4 h-60">
      <img
        className="flex-1 h-full w-full rounded-md object-cover"
        src={images[activeImageIndex].path}
        alt={animalName}
      />
      <div
        className={`flex-1 grid grid-cols-${
          imagesLenght <= 3 ? "3" : "6"
        } gap-x-1 mx-2 overflow-y-scroll`}
      >
        {images.map((image, index) => (
          <button
            key={image.id}
            className={`border-0 h-60 cursor-pointer rounded-md bg-none overflow-hidden outline=none opacity-60 ${
              activeImageIndex === index ? "opacity-100" : ""
            }`}
            type="button"
            onClick={() => {
              setActiveImageIndex(index);
            }}
          >
            <img
              src={image.path}
              alt={animalName}
              className="h-60 object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
