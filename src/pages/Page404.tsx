import { Link } from 'react-router-dom';

export function Page404() {
  return (
    <div className="w-full w-full text-center bg-gray-100 px-32 py-32">
      <div className="top-1/2 my-auto">
        <span className="m-0 w-full h-full text-gray-700">
          <span className="font-bold text-9xl">404</span>{' '}
          <span className="block font-medium mb-10">Página não encontrada</span>
        </span>
        <Link
          to="/"
          className="text-white bg-blue-500 border-0 px-12 py-2 focus:outline-none hover:bg-blue-600 rounded text-lg"
        >
          Voltar à página inicial
        </Link>
      </div>
    </div>
  );
}
