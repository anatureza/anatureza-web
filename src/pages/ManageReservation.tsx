import { useContext, useEffect } from "react";
import { useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { AppHeader } from "../components/AppHeader";
import { ButtonGroup } from "../components/ButtonGroup";
import { ReservationsTable } from "../components/ReservationsTable";

import api from "../services/api";

export function ManageReservation() {
  const { userId } = useContext(AuthContext);

  const [newReservations, setNewReservations] = useState();
  const [approvedReservations, setApprovedReservations] = useState();
  const [disapprovedReservations, setDisapprovedReservations] = useState();
  const [currentReservations, setCurrentReservations] = useState();

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
      api
        .get("/reservations/new")
        .then(({ data }) => {
          setNewReservations(data);
        })
        .catch(() => {
          setNewReservations(undefined);
        });
    })();

    (async () => {
      api
        .get("/reservations/approved")
        .then(({ data }) => {
          setApprovedReservations(data);
        })
        .catch(() => {
          setApprovedReservations(undefined);
        });
    })();

    (async () => {
      api
        .get("/reservations/disapproved")
        .then(({ data }) => {
          setDisapprovedReservations(data);
        })
        .catch(() => {
          setDisapprovedReservations(undefined);
        });
    })();
  }, []);

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
