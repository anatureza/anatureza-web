import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Disclosure } from "@headlessui/react";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const questions = [
  {
    id: "1",
    title: "Quando devo castrar meus cães e gatos?",
    answer: "Cachorros recomenda-se com no máximo 7 meses e gatos com 6 meses",
  },
  {
    id: "2",
    title: "Qual importância do vermífugo na saúde geral dos animais?",
    answer:
      "Vermífugos são essenciais para manter a boa saúde dos animais, evitando" +
      "vários problemas que podem ocorrer caso os animais estejam infestados com vermes",
  },
  {
    id: "3",
    title: "Devo castrar os cães e gatos machos? Por quê? Há contraindicação?",
    answer:
      "Os machos devem ser castrados, não há contraindicação e eles não" +
      " deixam de ser felizes ou protetores da casa (no caso de cães)" +
      " pelo ato da castração. Ao contrário, são só benefícios na saúde e" +
      " longevidade. Evita também o problema de marcar território e fugas atrás" +
      " de fêmeas no cio, que ocasionam brigas e até fuga de muitos animais machos.",
  },
  {
    id: "4",
    title: "Quais as principais vacinas que devo dar nos cães e gatos?",
    answer:
      "Gatos: tríplice felina ou quádrupla e antirrábica." +
      " Iniciam com 60 dias ( 3 doses intervalo 21 a 30" +
      "dias). A antirrábica com4 meses de idade." +
      " Cães: v10 (ou v8) e antirrábica. Iniciam com 45 dias de idade" +
      " ( 3 doses com intervalo de 21- 30 dias ) ",
  },
  {
    id: "5",
    title: "O que configura maus tratos?",
    answer:
      "As leis contra maus tratos felizmente estão bastante severas." +
      " Considera-se que os animais sofrem maus tratos quando não tem alimentação" +
      " diária adequada, água limpa, espaço suficiente e limpo, abrigo contra sol" +
      " e chuva, atendimento veterinário em caso de necessidade.",
  },
  {
    id: "6",
    title: "Quantas vezes devo alimentar meu pet ao dia?",
    answer:
      "Em geral a maioria das pessoas alimentam seus pets 2x ao dia e essa é a" +
      " recomendação dos fabricantes de ração.",
  },
];

export function FAQ() {
  return (
    <>
      <div className="container ml-auto mr-auto mt-8 leading-6 max-w-screen-md">
        <div className="main px-32">
          <div className="block box-border w-auto m-auto">
            <div className="top text-center">
              <h2 className="font-sans text-4xl">Perguntas Frequentes</h2>
              <p className="text-gray-600">
                Algumas dúvidas mais recorrentes que recebemos
              </p>
            </div>
            <div className="my-12">
              {questions.map((question) => {
                return <AccordionItem key={question.id} {...question} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

type AccordionProps = {
  title: string;
  answer: string;
};

function AccordionItem({ title, answer }: AccordionProps) {
  return (
    <Disclosure>
      {({ open }) => (
        <div className="">
          <Disclosure.Button className="box-border w-full m-0 py-3.5 px-5 space-x-1 bg-gray-200 bg-opacity-75 border-2 text-left">
            <h2 className="inline-block font-sans text-md m-w-md">{title}</h2>
            <div className="inline-block">
              {open ? (
                <FontAwesomeIcon
                  icon={faChevronUp}
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="h-6 w-6"
                  aria-hidden="true"
                />
              )}
            </div>
          </Disclosure.Button>
          <Disclosure.Panel className="relative">
            <div className="pl-6 pr-5 pb-5">{answer}</div>
          </Disclosure.Panel>
        </div>
      )}
    </Disclosure>
  );
}
