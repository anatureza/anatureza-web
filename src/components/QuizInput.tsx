import { ChangeEvent } from 'react';

interface IQuiz {
  question: string;
  answer: string;
  handleOnChange?: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  disabled: boolean;
}

export function QuizInput({
  question,
  answer,
  handleOnChange,
  disabled,
}: IQuiz) {
  return (
    <div className="mt-6 px-4">
      <label className="text-gray-700 text-justify" htmlFor="answer">
        {question}
      </label>
      <textarea
        className="flex-1 bg-gray-100 appearance-none border border-gray-300 w-full py-2 px-4 text-gray-700 placeholder-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
        required
        placeholder="Insira sua resposta"
        value={answer}
        onChange={(event) => {
          if (handleOnChange && !disabled) {
            handleOnChange(event);
          }
        }}
        disabled={disabled}
        rows={2}
        cols={40}
      ></textarea>
    </div>
  );
}
