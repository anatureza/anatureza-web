import { useHistory } from 'react-router';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ButtonGoBack() {
  const history = useHistory();

  return (
    <button
      className="ml-2 mr-2 p-1 rounded-lg bg-blue-100 shadow-md hover:bg-blue-300"
      onClick={() => {
        history.goBack();
      }}
      type="button"
    >
      <FontAwesomeIcon
        icon={faChevronLeft}
        className="inline-block text-blue-900"
      />
      <span className="font-semibold text-gray-700 text-sm ml-2 mr-1">
        Voltar
      </span>
    </button>
  );
}
