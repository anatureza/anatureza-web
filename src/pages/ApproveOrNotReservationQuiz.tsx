import { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { QuizInput } from "../components/QuizInput";

type ReservationParams = {
  animal_id: string;
};

type QuizData = {
  id: string;
  first: string;
  second: string;
  third: string;
  fourth: string;
  fifth: string;
  sixth: string;
  seventh: string;
  eighth: string;
  ninth: string;
  tenth: string;
  eleventh: string;
  twelfth: string;
  thirteenth: string;
  fourteenth: string;
  fifteenth: string;
};

export function NewReservationQuiz() {
  const history = useHistory();
  const { animal_id } = useParams<ReservationParams>();
  const questions = [
    "Por que motivos gostaria de adotar?",
    "Você tem condições financeiras de acrescentar no seu orçamento os gastos que terá com alimentação de boa qualidade (mínimo ração Golden), vacinas (espécie específica - v10 ou quádrupla) além da antirrábica e atendimento veterinário sempre que necessário?",
    "Qual a frequência de passeios que o animal terá?",
    "O que pensa sobre placa de identificação com nome e dados do tutor gravados? Caso você tenha algum animal, ele possui? Usa em quais ocasiões? O que acha do uso 24 horas por dia?",
    "Quantas pessoas moram na sua residência? Quantos adultos e quantas crianças? Qual a idade de todos? Todos querem adotar?",
    "Você é o responsável pela residência onde o animal ficará, inclusive, financeiramente? Se não, quem o é? O que pensa essa pessoa sobre sua decisão em adotar?",
    "Alguém na sua casa é alérgico? Se sim, a que?",
    "Caso sua casa seja alugada, o proprietário permite, por escrito, animais? E no caso de ter que se mudar, caso para onde pretenda ir não permita animais, como lidará com a questão da guarda do animal?",
    "Caso more em casa, o animal ficará só dentro da residência (o que inclui quintal e garagem) ou terá livre acesso para passear na rua sozinho?",
    "Quantas horas por dia, o animal ficará sozinho?",
    "Quem tomará conta do animal quando você e sua família viajarem?",
    "Qual sua opinião em relação a castração? Caso tenha outros animais, eles são castrados?",
    "Há previsão de algum evento próximo que irá alterar sua vida (casamento, nascimento, separação, mudanças etc.)?",
    "Lidando com um fato desagradável, mas real em nossas vidas, se você ou seu cônjuge ficarem desempregados, como fica a situação do animal?",
    "Já teve outros animais? O que aconteceu com eles?",
  ];
  const [quiz, setQuiz] = useState<QuizData>();

  const handleApproveOrNot = (event: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = event.currentTarget;
  };

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <form className="container max-w-2xl mx-auto shadow-md md:w-3/4 py-8 rounded-md bg-gray-200">
        <h1 className="text-4xl font-bold m-4">Questionário para reserva</h1>
        {/* <QuizInput editable={false} question={questions[0]} answer={quiz.first} />
        <QuizInput editable={false} question={questions[1]} answer={quiz.second} />
        <QuizInput editable={false} question={questions[2]} answer={quiz.third} />
        <QuizInput editable={false} question={questions[3]} answer={quiz.fourth} />
        <QuizInput editable={false} question={questions[4]} answer={quiz.fifth} />
        <QuizInput editable={false} question={questions[5]} answer={quiz.sixth} />
        <QuizInput editable={false} question={questions[6]} answer={quiz.seventh} />
        <QuizInput editable={false} question={questions[7]} answer={quiz.eight} />
        <QuizInput editable={false} question={questions[8]} answer={quiz.ninth} />
        <QuizInput editable={false} question={questions[9]} answer={quiz.tenth} />
        <QuizInput editable={false} question={questions[10]} answer={quiz.eleventh} />
        <QuizInput editable={false} question={questions[11]} answer={quiz.twelfth} />
        <QuizInput editable={false} question={questions[12]} answer={quiz.thirteenth} />
        <QuizInput editable={false} question={questions[13]} answer={quiz.fourteenth} />
        <QuizInput editable={false} question={questions[14]} answer={quiz.fifth} /> */}

        <div className="px-4">
          <button
            id="disapprove"
            type="button"
            onClick={handleApproveOrNot}
            className="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
          >
            Adotar
          </button>
          <button
            id="approve"
            type="button"
            onClick={handleApproveOrNot}
            className="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
          >
            Adotar
          </button>
        </div>
      </form>
    </section>
  );
}
