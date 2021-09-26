import { useContext, useEffect } from "react";
import { useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { AppHeader } from "../components/AppHeader";
import { ButtonGroup } from "../components/ButtonGroup";
import { ReservationsTable } from "../components/ReservationsTable";

import api from "../services/api";

interface IReservation {
  id: string;
  adopter_id: string;
  animal_id: string;
  status: string;
  quiz_id: string;
  scheduled_at: Date | string | null;
  created_at: Date;
  updated_at: Date;
  animal: {
    id: string;
    volunteer_id: string;
    address_id: string;
    name: string;
    description: string;
    available: boolean;
    kind: string;
    gender: string;
    birth_date: Date;
    created_at: Date;
    updated_at: Date;
    main_image_url: string | null;
  };
  userAdopter: {
    id: string;
    name: string;
    email: string;
    phone_number: string;
    address_id: string;
    birth_date: Date | string;
    type: string;
    authorizes_image: boolean;
    avatar: string | null;
    created_at: Date;
    updated_at: Date;
    avatar_url: string | null;
  };
  volunteer_id: string;
}

export function ManageReservation() {
  const { userId } = useContext(AuthContext);

  const [newReservations, setNewReservations] = useState<
    IReservation[] | undefined
  >();
  const [approvedReservations, setApprovedReservations] = useState<
    IReservation[] | undefined
  >();
  const [disapprovedReservations, setDisapprovedReservations] = useState<
    IReservation[] | undefined
  >();
  const [currentReservations, setCurrentReservations] = useState<
    IReservation[] | undefined
  >();

  const [activeStatus, setActiveStatus] = useState("Novos");

  const handleButtonChanged = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    buttonValue === "Novos"
      ? setActiveStatus("Novos")
      : buttonValue === "Aprovados"
      ? setActiveStatus("Aprovados")
      : buttonValue === "Desaprovados"
      ? setActiveStatus("Desaprovados")
      : setActiveStatus("Novos");
  };

  useEffect(() => {
    (async () => {
      await api
        .get<IReservation[]>("/reservations/new")
        .then(({ data }) => {
          setNewReservations(
            data.filter((reservation) => reservation.volunteer_id === userId)
          );
        })
        .catch(() => {
          setNewReservations(undefined);
        });
    })();

    (async () => {
      await api
        .get<IReservation[]>("/reservations/approved")
        .then(({ data }) => {
          setApprovedReservations(
            data.filter((reservation) => reservation.volunteer_id === userId)
          );
        })
        .catch(() => {
          setApprovedReservations(undefined);
        });
    })();

    (async () => {
      await api
        .get<IReservation[]>("/reservations/disapproved")
        .then(({ data }) => {
          setDisapprovedReservations(
            data.filter((reservation) => reservation.volunteer_id === userId)
          );
        })
        .catch(() => {
          setDisapprovedReservations(undefined);
        });
    })();
  }, [userId]);

  useEffect(() => {
    setCurrentReservations(undefined);

    if (activeStatus === "Aprovados") {
      setCurrentReservations(approvedReservations);
    }

    if (activeStatus === "Desaprovados") {
      setCurrentReservations(disapprovedReservations);
    }

    if (activeStatus === "Novos") {
      setCurrentReservations(newReservations);
    }
  }, [
    userId,
    activeStatus,
    newReservations,
    approvedReservations,
    disapprovedReservations,
  ]);

  return (
    <AppHeader title="Pedidos de reserva">
      <ReservationsTable reservationsData={currentReservations}>
        <ButtonGroup
          leftButton="Novos"
          middleButton="Aprovados"
          rightButton="Desaprovados"
          selectedButton={activeStatus}
          handleButtonChanged={handleButtonChanged}
        />
      </ReservationsTable>
    </AppHeader>
  );
}
