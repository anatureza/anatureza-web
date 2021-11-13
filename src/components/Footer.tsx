import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube } from '@fortawesome/free-brands-svg-icons';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 w-full py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-evenly">
          <li className="my-2">
            <Link to="/faq">
              <span className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
                FAQ
              </span>
            </Link>
          </li>
          <Link to="/animais-adocao">
            <li className="my-2">
              <span className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200">
                Animais para adoção
              </span>
            </li>
          </Link>
        </ul>
        <div className="pt-8 flex max-w-xs mx-auto items-center justify-between">
          <a
            href="https://www.instagram.com/osamantesdanatureza/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={faInstagram}
              className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            />
          </a>
          <a
            href="https://www.instagram.com/osamantesdanatureza/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="text-xl hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
