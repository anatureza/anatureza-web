import { FormEvent, useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { QuizInput } from '../components/QuizInput';

import api from '../services/api';

export const questions = [
  'Por que motivos gostaria de adotar?',
  'Você tem condições financeiras de acrescentar no seu orçamento os gastos que terá com alimentação de boa qualidade (mínimo ração Golden), vacinas (espécie específica - v10 ou quádrupla) além da antirrábica e atendimento veterinário sempre que necessário?',
  'Qual a frequência de passeios que o animal terá?',
  'O que pensa sobre placa de identificação com nome e dados do tutor gravados? Caso você tenha algum animal, ele possui? Usa em quais ocasiões? O que acha do uso 24 horas por dia?',
  'Quantas pessoas moram na sua residência? Quantos adultos e quantas crianças? Qual a idade de todos? Todos querem adotar?',
  'Você é o responsável pela residência onde o animal ficará, inclusive, financeiramente? Se não, quem o é? O que pensa essa pessoa sobre sua decisão em adotar?',
  'Alguém na sua casa é alérgico? Se sim, a que?',
  'Caso sua casa seja alugada, o proprietário permite, por escrito, animais? E no caso de ter que se mudar, caso para onde pretenda ir não permita animais, como lidará com a questão da guarda do animal?',
  'Caso more em casa, o animal ficará só dentro da residência (o que inclui quintal e garagem) ou terá livre acesso para passear na rua sozinho?',
  'Quantas horas por dia, o animal ficará sozinho?',
  'Quem tomará conta do animal quando você e sua família viajarem?',
  'Qual sua opinião em relação a castração? Caso tenha outros animais, eles são castrados?',
  'Há previsão de algum evento próximo que irá alterar sua vida (casamento, nascimento, separação, mudanças etc.)?',
  'Lidando com um fato desagradável, mas real em nossas vidas, se você ou seu cônjuge ficarem desempregados, como fica a situação do animal?',
  'Já teve outros animais? O que aconteceu com eles?',
];

interface IReservationParams {
  animal_id: string;
}

export function NewReservationQuiz() {
  const history = useHistory();

  const { animal_id } = useParams<IReservationParams>();

  const [first, setFirst] = useState('');
  const [second, setSecond] = useState('');
  const [third, setThird] = useState('');
  const [fourth, setFourth] = useState('');
  const [fifth, setFifth] = useState('');
  const [sixth, setSixth] = useState('');
  const [seventh, setSeventh] = useState('');
  const [eighth, setEighth] = useState('');
  const [ninth, setNinth] = useState('');
  const [tenth, setTenth] = useState('');
  const [eleventh, setEleventh] = useState('');
  const [twelfth, setTwelfth] = useState('');
  const [thirteenth, setThirteenth] = useState('');
  const [fourteenth, setFourteenth] = useState('');
  const [fifteenth, setFifteenth] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await api.get(`/animal/${animal_id}`);
      } catch {
        alert('Animal não encontrado');
        history.push('/animais-adocao');
      }
    })();
  }, [animal_id, history]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      await api.post(`/reservation/${animal_id}`, {
        animal_id,
        first,
        second,
        third,
        fourth,
        fifth,
        sixth,
        seventh,
        eighth,
        ninth,
        tenth,
        eleventh,
        twelfth,
        thirteenth,
        fourteenth,
        fifteenth,
      });
      alert('Sucesso! Um de nossos voluntários entrará em contato em breve!');
      history.push('/');
    } catch {
      alert('Não Foi Possível Enviar o Formulário!');
    }
  }

  return (
    <section className="bg-gray-100 bg-opacity-50 pt-8 pb-14">
      <form
        onSubmit={handleSubmit}
        className="container max-w-2xl mx-auto shadow-md md:w-3/4 py-8 rounded-md bg-white"
      >
        <h1 className="text-4xl font-bold m-4">Questionário para reserva</h1>
        <input type="hidden" value={animal_id} disabled />
        <QuizInput
          question={questions[0]}
          answer={first}
          disabled={false}
          handleOnChange={(event) => {
            setFirst(event.target.value);
          }}
        />
        <QuizInput
          question={questions[1]}
          answer={second}
          disabled={false}
          handleOnChange={(event) => {
            setSecond(event.target.value);
          }}
        />
        <QuizInput
          question={questions[2]}
          answer={third}
          disabled={false}
          handleOnChange={(event) => {
            setThird(event.target.value);
          }}
        />
        <QuizInput
          question={questions[3]}
          answer={fourth}
          disabled={false}
          handleOnChange={(event) => {
            setFourth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[4]}
          answer={fifth}
          disabled={false}
          handleOnChange={(event) => {
            setFifth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[5]}
          answer={sixth}
          disabled={false}
          handleOnChange={(event) => {
            setSixth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[6]}
          answer={seventh}
          disabled={false}
          handleOnChange={(event) => {
            setSeventh(event.target.value);
          }}
        />
        <QuizInput
          question={questions[7]}
          answer={eighth}
          disabled={false}
          handleOnChange={(event) => {
            setEighth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[8]}
          answer={ninth}
          disabled={false}
          handleOnChange={(event) => {
            setNinth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[9]}
          answer={tenth}
          disabled={false}
          handleOnChange={(event) => {
            setTenth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[10]}
          answer={eleventh}
          disabled={false}
          handleOnChange={(event) => {
            setEleventh(event.target.value);
          }}
        />
        <QuizInput
          question={questions[11]}
          answer={twelfth}
          disabled={false}
          handleOnChange={(event) => {
            setTwelfth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[12]}
          answer={thirteenth}
          disabled={false}
          handleOnChange={(event) => {
            setThirteenth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[13]}
          answer={fourteenth}
          disabled={false}
          handleOnChange={(event) => {
            setFourteenth(event.target.value);
          }}
        />
        <QuizInput
          question={questions[14]}
          answer={fifteenth}
          disabled={false}
          handleOnChange={(event) => {
            setFifteenth(event.target.value);
          }}
        />
        <div className="px-4 mt-4">
          <button
            type="submit"
            className="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
          >
            Enviar questionário
          </button>
        </div>
      </form>
    </section>
  );
}
