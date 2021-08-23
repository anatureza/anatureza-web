import { useState } from "react";
import { AnimalsTable } from "../components/AnimalsTable";
import { AppHeader } from "../components/AppHeader";
import { ButtonGroup } from "../components/ButtonGroup";

export function ManageAnimals() {
  const birthDate = new Date(Date.now());
  const mockAnimals = [
    {
      id: "1",
      name: "Rex",
      description: "orem ipsum dolor sit amet, conse",
      available: true,
      avatar:
        "https://images.unsplash.com/photo-1456926631375-92c8ce872def?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
      city: "Águas de Lindoia",
      birth_date: "2020-01-01",
      volunteer: {
        id: "123",
        name: "Amantes da natureza",
        phone_number: "12345678901",
        avatar: "https://github.com/anatureza.png",
      },
    },
  ];

  const [animals, setAnimals] = useState(mockAnimals);

  return (
    <AppHeader title="Editar animais">
      <AnimalsTable animalsData={animals}></AnimalsTable>
    </AppHeader>
  );
}
