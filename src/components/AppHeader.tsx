import { useState } from 'react';

import { SlideOver } from './SlideOver';

import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ButtonGoBack } from './ButtonGoBack';

type AppHeaderProps = {
  title: string;
  children: JSX.Element;
};

export function AppHeader({ title, children }: AppHeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-hidden">
      <SlideOver open={open} setOpen={setOpen} />
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 box-border">
          <ButtonGoBack />
          <h1 className="inline-block align-bottom text-3xl pt-1 font-bold text-gray-900">
            {title}
          </h1>
          <FontAwesomeIcon
            icon={faBars}
            size="lg"
            className="inline-block float-right cursor-pointer"
            onClick={() => setOpen((opened) => !opened)}
          />
        </div>
      </header>
      {children}
    </div>
  );
}
