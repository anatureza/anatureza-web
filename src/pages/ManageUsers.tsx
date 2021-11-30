import { MouseEvent, useEffect, useState } from 'react';
import { AppHeader } from '../components/AppHeader';
import { ButtonGroup } from '../components/ButtonGroup';
import { UsersTable } from '../components/UsersTable';

import api from '../services/api';
import { IUser } from '../types';

export function ManageUsers() {
  const [currentUsers, setCurrentUsers] = useState<IUser[] | undefined>(
    undefined
  );
  const [regularUsers, setRegularUsers] = useState<IUser[] | undefined>(
    undefined
  );
  const [volunteers, setVolunteers] = useState<IUser[] | undefined>(undefined);
  const [allUsers, setAllUsers] = useState<IUser[] | undefined>(undefined);

  const [activeStatus, setActiveStatus] = useState('Usuários');

  const handleButtonChanged = (event: MouseEvent<HTMLButtonElement>) => {
    const buttonValue = event.currentTarget.value;
    buttonValue === 'Usuários'
      ? setActiveStatus('Usuários')
      : buttonValue === 'Voluntários'
      ? setActiveStatus('Voluntários')
      : buttonValue === 'Todos os usuários'
      ? setActiveStatus('Todos os usuários')
      : setActiveStatus('Usuários');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get<IUser[]>('/users');
        if (typeof data !== 'undefined' || data !== null) {
          setAllUsers(data);

          setVolunteers(data.filter((user) => user.type === 'volunteer'));
          setRegularUsers(data.filter((user) => user.type === 'user'));
        }
      } catch {
        setAllUsers(undefined);
      }
    })();
  }, []);

  useEffect(() => {
    activeStatus === 'Todos os usuários'
      ? setCurrentUsers(allUsers)
      : activeStatus === 'Voluntários'
      ? setCurrentUsers(volunteers)
      : activeStatus === 'Usuários'
      ? setCurrentUsers(regularUsers)
      : setCurrentUsers(undefined);
  }, [activeStatus, allUsers, volunteers, regularUsers]);

  return (
    <AppHeader title="Gerenciar usuários">
      <UsersTable usersData={currentUsers}>
        <ButtonGroup
          leftButton="Usuários"
          middleButton="Voluntários"
          rightButton="Todos os usuários"
          selectedButton={activeStatus}
          handleButtonChanged={handleButtonChanged}
        />
      </UsersTable>
    </AppHeader>
  );
}
