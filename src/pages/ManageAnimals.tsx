import { useContext, useEffect, useState } from "react";

import { AuthContext } from "../contexts/AuthContext";

import { AnimalsTable } from "../components/AnimalsTable";
import { AppHeader } from "../components/AppHeader";
import { ButtonGroup } from "../components/ButtonGroup";

import api from "../services/api";

export function ManageAnimals() {
  const { userType } = useContext(AuthContext);

  const [currentAnimals, setCurrentAnimals] = useState();
  const [allAnimals, setAllAnimals] = useState();
  const [availableAnimals, setAvailableAnimals] = useState();
  const [adoptedAnimals, setAdoptedAnimals] = useState();

  const [activeStatus, setActiveStatus] = useState("Disponíveis");

  const handleButtonChanged = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    buttonValue === "Disponíveis"
      ? setActiveStatus("Disponíveis")
      : buttonValue === "Adotados"
      ? setActiveStatus("Adotados")
      : buttonValue === "Todos os animais"
      ? setActiveStatus("Todos os animais")
      : setActiveStatus("Disponíveis");
  };

  useEffect(() => {
    (async () => {
      await api
        .get("/animals/unavailable")
        .then(({ data }) => {
          setAdoptedAnimals(data);
        })
        .catch(() => {
          setAdoptedAnimals(undefined);
        });
    })();
    (async () => {
      await api
        .get("/animals/available")
        .then(({ data }) => {
          setAvailableAnimals(data);
        })
        .catch(() => {
          setAvailableAnimals(undefined);
        });
    })();
    if (userType === "volunteer") {
      (async () => {
        await api
          .get("/animals")
          .then(({ data }) => {
            setAllAnimals(data);
          })
          .catch(() => {
            setAllAnimals(undefined);
          });
      })();
    } else {
      (async () => {
        await api
          .get("/all-animals")
          .then(({ data }) => {
            setAllAnimals(data);
          })
          .catch(() => {
            setAllAnimals(undefined);
          });
      })();
    }
  }, [userType]);

  useEffect(() => {
    activeStatus === "Todos os animais"
      ? setCurrentAnimals(allAnimals)
      : activeStatus === "Adotados"
      ? setCurrentAnimals(adoptedAnimals)
      : activeStatus === "Disponíveis"
      ? setCurrentAnimals(availableAnimals)
      : setCurrentAnimals(undefined);
  }, [activeStatus, allAnimals, adoptedAnimals, availableAnimals]);

  if (typeof currentAnimals === "undefined") {
    return <h1>Carregando Animais...</h1>;
  }

  return (
    <AppHeader title="Editar animais">
      <AnimalsTable animalsData={currentAnimals}>
        <ButtonGroup
          leftButton="Disponíveis"
          middleButton="Adotados"
          rightButton="Todos os animais"
          selectedButton={activeStatus}
          handleButtonChanged={handleButtonChanged}
        />
      </AnimalsTable>
    </AppHeader>
  );
}
