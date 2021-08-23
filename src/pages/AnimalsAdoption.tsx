import { AnimalCard } from "../components/AnimalCard";

const animals = [
  {
    id: "1",
    name: "Rex",
    description: "orem ipsum dolor sit amet, conse",
    avatar:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80",
    city: "Águas de Lindoia",
    volunteer: {
      id: "123",
      name: "Amantes da natureza",
      phone_number: "12345678901",
      avatar: "https://github.com/anatureza.png",
    },
  },
];

export function AnimalsAdoption() {
  return (
    <>
      <div className="w-full bg-white p-12">
        <div className="header flex items-end justify-between mb-12">
          <div className="title">
            <p className="text-4xl font-bold text-gray-800 mb-4">
              Animais para adoção
            </p>
            <p className="text-2xl font-light text-gray-400">
              Animais disponíveis para adoção, prontos para fazer parte da sua
              família
            </p>
          </div>
          <div className="text-end">
            <form className="flex flex-col md:flex-row w-3/4 md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center">
              <div className="relative md:grid-cols-4">
                <input
                  type="text"
                  id="form-subscribe-Search"
                  className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Pesquisar"
                />
              </div>
            </form>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12">
          {animals.map((animal) => (
            <AnimalCard {...animal} />
          ))}
        </div>
      </div>
    </>
  );
}
