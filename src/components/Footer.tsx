import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 w-full py-8">
      <div className="max-w-screen-xl mx-auto px-4">
        <ul className="max-w-screen-md mx-auto text-lg font-light flex flex-wrap justify-evenly">
          <li className="my-2">
            <Link to="/faq">
              <a
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                href="/faq"
              >
                FAQ
              </a>
            </Link>
          </li>
          <li className="my-2">
            <Link to="/animais-adocao">
              <a
                className="text-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white transition-colors duration-200"
                href="/animais-adocao"
              >
                Animais para adoção
              </a>
            </Link>
          </li>
        </ul>
        <div className="pt-8 flex max-w-xs mx-auto items-center justify-between">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-800 dark:hover:text-white transition-colors duration-200"
          >
            <FontAwesomeIcon
              icon={faFacebook}
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
