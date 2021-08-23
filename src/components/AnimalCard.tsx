import { Link } from "react-router-dom";

type AnimalDataProps = {
  id: string;
  name: string;
  avatar: string;
  description: string;
  city: string;
  volunteer: {
    id: string;
    name: string;
    phone_number: string;
    avatar: string;
  };
};

export function AnimalCard({
  id,
  name,
  avatar,
  description,
  city,
  volunteer,
}: AnimalDataProps) {
  return (
    <div className="overflow-hidden shadow-lg rounded-lg h-90 w-60 md:w-80 cursor-pointer m-auto">
      <Link to={`/animal/${id}`} className="w-full block h-full">
        <img
          alt={`Animal ${name}`}
          src={`${avatar}`}
          className="max-h-40 w-full object-cover"
        />
        <div className="bg-white w-full p-4">
          <p className="text-gray-600 text-sm font-medium">
            <span className="font-bold">Em: </span>
            {city}
          </p>
          <p className="text-gray-800 text-xl font-medium mb-2 truncate">
            {name}
          </p>
          <p className="text-gray-600 font-light text-md h-12 max-h-14 overflow-auto">
            {description}
          </p>
          <div className="flex items-center mt-4">
            <a href={`/user/${volunteer.id}`} className="block relative">
              <img
                alt={`Volunteer ${volunteer.name} profile`}
                src={`${volunteer.avatar}`}
                className="mx-auto object-cover rounded-full w-10 "
              />
            </a>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 truncate">
                <span className="font-semibold">Voluntário:</span>{" "}
                {`${volunteer.name}`}
              </p>
              <p className="text-gray-400">
                {`Contato: ${volunteer.phone_number}`}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
