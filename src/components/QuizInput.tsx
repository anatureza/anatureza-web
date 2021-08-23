type QuizProps = {
  question: string;
  answer: string;
  editable: boolean;
};

export function QuizInput({ question, answer, editable }: QuizProps) {
  return (
    <div className="mt-6 px-4">
      <label className="text-gray-700 text-justify" htmlFor="answer">
        {question}
      </label>
      <textarea
        className="flex-1 bg-gray-100 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
        required
        placeholder="Insira sua resposta"
        value={answer}
        disabled={!editable}
        rows={5}
        cols={40}
      ></textarea>
    </div>
  );
}
