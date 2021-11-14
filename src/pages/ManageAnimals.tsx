import { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../contexts/AuthContext';

import { AnimalsTable } from '../components/AnimalsTable';
import { AppHeader } from '../components/AppHeader';
import { ButtonGroup } from '../components/ButtonGroup';

import api from '../services/api';

export function ManageAnimals() {
  const { userType } = useContext(AuthContext);

  const [currentAnimals, setCurrentAnimals] = useState();
  const [allAnimals, setAllAnimals] = useState();
  const [availableAnimals, setAvailableAnimals] = useState();
  const [adoptedAnimals, setAdoptedAnimals] = useState();

  const [activeStatus, setActiveStatus] = useState('Disponíveis');

  const handleButtonChanged = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    buttonValue === 'Disponíveis'
      ? setActiveStatus('Disponíveis')
      : buttonValue === 'Adotados'
      ? setActiveStatus('Adotados')
      : buttonValue === 'Todos os animais'
      ? setActiveStatus('Todos os animais')
      : setActiveStatus('Disponíveis');
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get('/animals/unavailable');

        setAdoptedAnimals(data);
      } catch {
        setAdoptedAnimals(undefined);
      }
    })();
    (async () => {
      try {
        const { data } = await api.get('/animals/available');
        setAvailableAnimals(data);
      } catch {
        setAvailableAnimals(undefined);
      }
    })();
    (async () => {
      try {
        const { data } = await api.get('/all-animals');
        setAllAnimals(data);
      } catch {
        setAllAnimals(undefined);
      }
    })();
  }, [userType]);

  useEffect(() => {
    activeStatus === 'Todos os animais'
      ? setCurrentAnimals(allAnimals)
      : activeStatus === 'Adotados'
      ? setCurrentAnimals(adoptedAnimals)
      : activeStatus === 'Disponíveis'
      ? setCurrentAnimals(availableAnimals)
      : setCurrentAnimals(undefined);
  }, [activeStatus, allAnimals, adoptedAnimals, availableAnimals]);

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
