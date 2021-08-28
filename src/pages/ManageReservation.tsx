import { useEffect } from "react";
import { useState } from "react";

import { AppHeader } from "../components/AppHeader";
import { ButtonGroup } from "../components/ButtonGroup";
import { ReservationsTable } from "../components/ReservationsTable";

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
  enum ReservationStatus {
    NEW = "new",
    APPROVED = "approved",
    DISAPPROVED = "disapproved",
    ADOPTED = "adopted",
  }
  const mockData = [
    {
      request_id: "sdfsdfasdf",
      adopter_id: "dfksdhfkjd",
      date: "2020/01/2004",
      adopter: {
        id: "string",
        name: "string",
        phone_number: "string",
        avatar: "https://github.com/gusgalote.png",
      },
      animal: {
        id: "string",
        name: "string",
        avatar: "https://github.com/gusgalote.png",
        description: "string",
        city: "string",
        available: true,
        volunteer: {
          id: "string",
          name: "string",
          phone_number: "string",
          avatar: "https://github.com/gusgalote.png",
        },
      },
    },
  ];

  const [activeStatus, setActiveStatus] = useState(ReservationStatus.NEW);

  const [newRequests, NewRequests] =
    useState<Array<CurrentRequestData>>(mockData);
  const [approvedRequests, setApprovedRequests] = useState<
    Array<CurrentRequestData>
  >([]);
  const [disapprovedRequests, setDisapprovedRequests] = useState<
    Array<CurrentRequestData>
  >([]);

  const [currentRequests, setCurrentRequests] =
    useState<Array<CurrentRequestData>>(newRequests);

  const [title, setTitle] = useState("Novas");

  const handleOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.id;
    buttonValue === "NEW"
      ? setActiveStatus(ReservationStatus.NEW)
      : buttonValue === "APPROVED"
      ? setActiveStatus(ReservationStatus.APPROVED)
      : buttonValue === "DISAPPROVED"
      ? setActiveStatus(ReservationStatus.DISAPPROVED)
      : setActiveStatus(ReservationStatus.NEW);

    setTitle(event.currentTarget.value);
  };

  useEffect(() => {
    activeStatus === ReservationStatus.NEW
      ? setCurrentRequests(newRequests)
      : activeStatus === ReservationStatus.APPROVED
      ? setCurrentRequests(approvedRequests)
      : activeStatus === ReservationStatus.DISAPPROVED
      ? setCurrentRequests(disapprovedRequests)
      : setActiveStatus(ReservationStatus.NEW);
  }, [
    activeStatus,
    newRequests,
    approvedRequests,
    disapprovedRequests,
    ReservationStatus,
  ]);

  return (
    <AppHeader title="Pedidos de reserva">
      <ReservationsTable title={title} currentRequests={currentRequests}>
        <ButtonGroup handleOnClick={handleOnClick} />
      </ReservationsTable>
    </AppHeader>
  );
}
