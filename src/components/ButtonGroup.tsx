// type ToggleProps {
//   ClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void
// }
type ButtonGroupProps = {
  handleOnClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

export function ButtonGroup({ handleOnClick }: ButtonGroupProps) {
  return (
    <div className="flex items-center w-full">
      <button
        id="NEW"
        type="button"
        value="Novas"
        className="w-full border-l border-t border-b text-base font-medium rounded-l-md text-black bg-white hover:bg-gray-100 px-4 py-2"
        onClick={handleOnClick}
      >
        Novos
      </button>
      <button
        id="APPROVED"
        type="button"
        value="Aprovadas"
        className="w-full border text-base font-medium text-black bg-white hover:bg-gray-100 px-4 py-2"
        onClick={handleOnClick}
      >
        Aprovados
      </button>
      <button
        id="DISAPPROVED"
        type="button"
        value="Recusadas"
        className="w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-100 px-4 py-2"
        onClick={handleOnClick}
      >
        Recusadas
      </button>
    </div>
  );
}
