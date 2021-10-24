import { useEffect } from 'react';
import { Disclosure, Transition } from '@headlessui/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

const questions = [
  {
    id: '1',
    title: 'Quando devo castrar meus cães e gatos?',
    answer: 'Cachorros recomenda-se com no máximo 7 meses e gatos com 6 meses',
  },
  {
    id: '2',
    title: 'Qual importância do vermífugo na saúde geral dos animais?',
    answer:
      'Vermífugos são essenciais para manter a boa saúde dos animais, evitando' +
      'vários problemas que podem ocorrer caso os animais estejam infestados com vermes',
  },
  {
    id: '3',
    title: 'Devo castrar os cães e gatos machos? Por quê? Há contraindicação?',
    answer:
      'Os machos devem ser castrados, não há contraindicação e eles não' +
      ' deixam de ser felizes ou protetores da casa (no caso de cães)' +
      ' pelo ato da castração. Ao contrário, são só benefícios na saúde e' +
      ' longevidade. Evita também o problema de marcar território e fugas atrás' +
      ' de fêmeas no cio, que ocasionam brigas e até fuga de muitos animais machos.',
  },
  {
    id: '4',
    title: 'Quais as principais vacinas que devo dar nos cães e gatos?',
    answer:
      'Gatos: tríplice felina ou quádrupla e antirrábica.' +
      ' Iniciam com 60 dias ( 3 doses intervalo 21 a 30' +
      'dias). A antirrábica com4 meses de idade.' +
      ' Cães: v10 (ou v8) e antirrábica. Iniciam com 45 dias de idade' +
      ' ( 3 doses com intervalo de 21- 30 dias ) ',
  },
  {
    id: '5',
    title: 'O que configura maus tratos?',
    answer:
      'As leis contra maus tratos felizmente estão bastante severas.' +
      ' Considera-se que os animais sofrem maus tratos quando não tem alimentação' +
      ' diária adequada, água limpa, espaço suficiente e limpo, abrigo contra sol' +
      ' e chuva, atendimento veterinário em caso de necessidade.',
  },
  {
    id: '6',
    title: 'Quantas vezes devo alimentar meu pet ao dia?',
    answer:
      'Em geral a maioria das pessoas alimentam seus pets 2x ao dia e essa é a' +
      ' recomendação dos fabricantes de ração.',
  },
];
export function FAQ() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-gray-50 pt-12">
      <div className="container mx-auto leading-6 max-w-screen-md h-screen">
        <div className="block box-border w-auto">
          <div className="top text-center mb-4">
            <h2 className="font-sans text-4xl">Perguntas Frequentes</h2>
            <p className="text-gray-600">
              Algumas dúvidas mais recorrentes que recebemos
            </p>
          </div>
          <hr />
          <div className="w-full px-4 pt-16 mb-32">
            <div className="w-full max-w-md p-2 mx-auto  bg-white shadow-sm rounded-2xl max-h-screen overflow-y-auto">
              {questions.map((question, index) => (
                <Disclosure
                  as="div"
                  className={index > 0 ? 'mt-2' : ''}
                  key={index}
                >
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                        <span className="text-lg">{question.title}</span>
                        <FontAwesomeIcon
                          icon={faChevronUp}
                          className={`${
                            open ? 'transform rotate-180' : ''
                          } w-5 h-5 text-blue-500`}
                        />
                      </Disclosure.Button>
                      <Transition
                        enter="transition duration-100 ease-out"
                        enterFrom="transform scale-95 opacity-0"
                        enterTo="transform scale-100 opacity-100"
                        leave="transition duration-75 ease-out"
                        leaveFrom="transform scale-100 opacity-100"
                        leaveTo="transform scale-95 opacity-0"
                      >
                        <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                          {question.answer}
                        </Disclosure.Panel>
                      </Transition>
                    </>
                  )}
                </Disclosure>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
