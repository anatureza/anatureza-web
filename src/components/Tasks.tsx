import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function Tasks() {
  return (
    <div className="card">
      <div className="container">
        <div className="max-w-xl mx-auto">
          <form>
            <label className="block mb-8" htmlFor="title">
              <span className="text-gray-700">Título</span>
              <input
                className="mt-1 w-full block rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                type="text"
                name="title"
                required
                // onChange={(e) => setTitle(e.target.value)}
              />
            </label>
            <label className="block my-8" htmlFor="description">
              <div className="flex flex-row items-center justify-between">
                <span className="text-gray-700">Description</span>
                <em className="text-gray-700 text-sm">Opcional</em>
              </div>
              <textarea
                className="mt-1 block w-full rounded-md bg-gray-200 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
                name="description"
                rows={3}
              ></textarea>
            </label>
            <div className="mt-8">
              <button
                className={`${
                  false
                    ? "bg-gray-200 cursor-not-allowed"
                    : "bg-green-500 hover:bg-green-600 text-white"
                } font-medium text-base tracking-wider py-3 px-8 rounded-lg w-full`}
              >
                Salvar
                {/* {loading ? 'Saving...' : 'Save'} */}
              </button>
              <button
                type="button"
                className={`${
                  false
                    ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                    : "text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100"
                }  flex flex-row justify-center items-center py-2 px-3 mt-3 rounded-lg w-full`}
                // onClick={deleteItem}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  size="1x"
                  title="Delete this to-do item"
                />
                <p className="ml-2 text-base">Excluir</p>
              </button>
            </div>
          </form>
          {true && (
            <h1>Oi</h1>
            // <Banner
            //   text="This to-do has been updated. Return to the "
            //   link="/"
            //   linkTitle="homepage"
            // />
          )}
        </div>
      </div>
    </div>
  );
}
