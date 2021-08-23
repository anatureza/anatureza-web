import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserFriends,
  faHeart,
  faDog,
} from "@fortawesome/free-solid-svg-icons";

import "../styles/pages/home.css";

export function Home() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="text-center mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 mb-4">
              Amantes da Natureza
            </h1>
            <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto text-gray-500s">
              Somos um grupo sem fins financeiros, focados em cuidados animais
            </p>
            <div className="flex mt-6 justify-center">
              <div className="w-16 h-1 rounded-full bg-blue-500 inline-flex"></div>
            </div>
          </div>
          <div className="flex flex-wrap sm:-m-4 -mx-4 -mb-10 -mt-4 md:space-y-0 space-y-6">
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                <FontAwesomeIcon icon={faHeart} size="2x" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  Adote com amor
                </h2>
                <p className="leading-relaxed text-base">
                  Adotar é um ato que exige responsabilidade. Tenha em mente que
                  é para vida toda!
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-5 flex-shrink-0">
                <FontAwesomeIcon icon={faUserFriends} size="2x" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  A família tem que participar
                </h2>
                <p className="leading-relaxed text-base">
                  Adote somente se toda a família concordar. Um animal deve
                  trazer alegria e não discordia
                </p>
              </div>
            </div>
            <div className="p-4 md:w-1/3 flex flex-col text-center items-center">
              <div className="w-20 h-20 inline-flex items-center justify-center rounded-full bg-red-100 text-red-500 mb-5 flex-shrink-0">
                <FontAwesomeIcon icon={faDog} size="2x" />
              </div>
              <div className="flex-grow">
                <h2 className="text-gray-900 text-lg title-font font-medium mb-3">
                  O animal é um membro da família
                </h2>
                <p className="leading-relaxed text-base">
                  Um novo animal na casa muda a rotina familiar. Deve ser
                  tratado como um novo morador
                </p>
              </div>
            </div>
          </div>
          <button className="flex mx-auto mt-16 text-white bg-blue-500 border-0 py-2 px-8 focus:outline-none hover:bg-blue-600 rounded text-lg">
            <a href="/animais-adocao">Quero adotar agora!</a>
          </button>
        </div>
      </section>
      <section>
        {/* Card 1 */}
        <div>
          <div className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
              <div className="lg:w-1/2">
                <div
                  id="image-showcase-top"
                  className="h-64 bg-cover lg:rounded-lg lg:h-full"
                ></div>
              </div>
              <div className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
                <h2 className="text-3xl text-gray-800 font-bold">
                  O Bem-estar dos Animais{" "}
                  <span className="text-blue-600">Importam</span>
                </h2>
                <p className="mt-4 text-gray-600">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem modi reprehenderit vitae exercitationem aliquid dolores
                  ullam temporibus enim expedita aperiam mollitia iure
                  consectetur dicta tenetur, porro consequuntur saepe
                  accusantium consequatur.
                </p>
                <div className="mt-8">
                  <a
                    href="https://www.instagram.com/osamantesdanatureza/"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-5 py-3 text-white font-semibold rounded"
                  >
                    Acompanhe nosso Instagram!
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Card #2 */}
        <div>
          <div className="bg-gray-100 lg:py-12 lg:flex lg:justify-center">
            <div className="bg-white lg:mx-8 lg:flex lg:max-w-5xl lg:shadow-lg lg:rounded-lg">
              <div className="py-12 px-6 max-w-xl lg:max-w-5xl lg:w-1/2">
                <h2 className="text-3xl text-gray-800 font-bold">
                  Juntos Podemos Ser{" "}
                  <span className="text-red-600">Melhores</span>
                </h2>
                <p className="mt-4 text-gray-600">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Quidem modi reprehenderit vitae exercitationem aliquid dolores
                  ullam temporibus enim expedita aperiam mollitia iure
                  consectetur dicta tenetur, porro consequuntur saepe
                  accusantium consequatur.
                </p>
                <div className="mt-8">
                  <a
                    href="https://www.youtube.com/channel/UCvg9nSsPqw_mfNYGWRPFsdw"
                    target="_blank"
                    rel="noreferrer"
                    className="bg-red-600 text-gray-100 px-5 py-3 font-semibold rounded"
                  >
                    Veja nosso canal no YouTube!
                  </a>
                </div>
              </div>
              <div className="lg:w-1/2">
                <div
                  id="image-showcase-bottom"
                  className="h-64 bg-cover lg:rounded-lg lg:h-full"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
