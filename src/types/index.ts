export interface IAddress {
  id: string;
  uf: string;
  place: string;
  number: string;
  complement: string;
  neighborhood: string;
  zip: string;
  city: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  phone_number: string;
  address_id: string;
  birth_date: string;
  type: string;
  authorizes_image: boolean;
  avatar: string | null;
  address: IAddress;
  avatar_url: string | null;
}

export interface IAnimalImage {
  id: string;
  path: string;
}

export interface IAnimal {
  id: string;
  name: string;
  available: boolean;
  birth_date: string;
  description: string;
  gender: string;
  kind: string;
  volunteer_id: string;
  address_id: string;
  main_image_url?: string;
  images: Array<IAnimalImage> | [];
  user: IUser;
  address: IAddress;
}

export interface IReservation {
  id: string;
  adopter_id: string;
  animal_id: string;
  status: string;
  quiz_id: string;
  scheduled_at: string | null;
  created_at: string;
  updated_at: string;
  animal: IAnimal;
  quiz: {
    id: string;
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
    sixth: string;
    seventh: string;
    eighth: string;
    ninth: string;
    tenth: string;
    eleventh: string;
    twelfth: string;
    thirteenth: string;
    fourteenth: string;
    fifteenth: string;
    created_at: string;
  };
  userAdopter: IUser;
  volunteer_id: string;
}
