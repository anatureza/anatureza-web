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
