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
  user: {
    id: string;
    name: string;
    email: string;
    password: string;
    phone_number: string;
    birth_date: string;
    type: string;
    avatar?: string;
    avatar_url?: string;
    address_id: string;
    authorizes_image: boolean;
    created_at: string;
    updated_at: string;
  };
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
  animal: {
    id: string;
    volunteer_id: string;
    address_id: string;
    name: string;
    description: string;
    available: boolean;
    kind: string;
    gender: string;
    birth_date: string;
    created_at: string;
    updated_at: string;
    main_image_url: string | null;
  };
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
  userAdopter: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    address_id: string;
    birth_date: string;
    type: string;
    authorizes_image: boolean;
    avatar: string | null;
    created_at: string;
    updated_at: string;
    avatar_url: string | null;
  };
  volunteer_id: string;
}
