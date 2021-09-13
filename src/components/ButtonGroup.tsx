type ButtonGroupProps = {
  handleButtonChanged: (event: React.MouseEvent<HTMLButtonElement>) => void;
  leftButton: string;
  middleButton: string;
  rightButton: string;
  selectedButton: string;
};

export function ButtonGroup({
  handleButtonChanged,
  leftButton,
  middleButton,
  rightButton,
  selectedButton,
}: ButtonGroupProps) {
  return (
    <div className="flex items-center w-full">
      <button
        type="button"
        value={leftButton}
        className={`w-full border-l border-t border-b text-base font-medium rounded-l-md text-black hover:bg-gray-200 px-4 py-2 ${
          selectedButton === leftButton ? "bg-gray-600 text-white" : "bg-white"
        }`}
        onClick={handleButtonChanged}
      >
        {leftButton}
      </button>
      <button
        type="button"
        value={middleButton}
        className={`w-full border text-base font-medium text-black bg-white hover:bg-gray-200 px-4 py-2 ${
          selectedButton === middleButton
            ? "bg-gray-600 text-white"
            : "bg-white"
        }`}
        onClick={handleButtonChanged}
      >
        {middleButton}
      </button>
      <button
        type="button"
        value={rightButton}
        className={`w-full border-t border-b border-r text-base font-medium rounded-r-md text-black bg-white hover:bg-gray-200 px-4 py-2 ${
          selectedButton === rightButton ? "bg-gray-600 text-white" : "bg-white"
        }`}
        onClick={handleButtonChanged}
      >
        {rightButton}
      </button>
    </div>
  );
}
