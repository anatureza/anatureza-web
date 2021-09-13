import { useEffect } from "react";
import { useState } from "react";

import { AppHeader } from "../components/AppHeader";
import { ButtonGroup } from "../components/ButtonGroup";
import { ReservationsTable } from "../components/ReservationsTable";

import api from "../services/api";

type CurrentRequestData = {
  request_id: string;
  adopter_id: string;
  date: string;
  adopter: {
    id: string;
    name: string;
    phone_number: string;
    avatar: string;
  };
  animal: {
    id: string;
    name: string;
    avatar: string;
    description: string;
    city: string;
    available: boolean;
    volunteer: {
      id: string;
      name: string;
      phone_number: string;
      avatar: string;
    };
  };
};

export function ManageReservation() {
  const [newRequests, setNewRequests] = useState<Array<CurrentRequestData>>([]);
  const [approvedRequests, setApprovedRequests] = useState<
    Array<CurrentRequestData>
  >([]);
  const [disapprovedRequests, setDisapprovedRequests] = useState<
    Array<CurrentRequestData>
  >([]);

  const [currentRequests, setCurrentRequests] =
    useState<Array<CurrentRequestData>>(newRequests);

  const [activeStatus, setActiveStatus] = useState("Novos");
  const [title, setTitle] = useState("Novas");

  const handleButtonChanged = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    buttonValue === "Novos"
      ? setActiveStatus("Novos")
      : buttonValue === "Aprovados"
      ? setActiveStatus("Aprovados")
      : buttonValue === "Desaprovados"
      ? setActiveStatus("Desaprovados")
      : setActiveStatus("Novos");

    setTitle(event.currentTarget.value);
  };

  useEffect(() => {
    activeStatus === "Aprovados"
      ? setCurrentRequests(approvedRequests)
      : activeStatus === "Desaprovados"
      ? setCurrentRequests(disapprovedRequests)
      : setCurrentRequests(newRequests);
  }, [activeStatus, newRequests, approvedRequests, disapprovedRequests]);

  useEffect(() => {
    (async () => {
      await api.get("/reservations/new").then(({ data }) => {
        setNewRequests(data);
      });
    })();
    (async () => {
      await api.get("/reservations/approved").then(({ data }) => {
        setApprovedRequests(data);
      });
    })();
    (async () => {
      await api.get("/reservations/approved").then(({ data }) => {
        setDisapprovedRequests(data);
      });
    })();
  }, []);

  return (
    <AppHeader title="Pedidos de reserva">
      <ReservationsTable title={title} currentRequests={currentRequests}>
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
