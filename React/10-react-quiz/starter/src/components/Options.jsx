// import { useQuiz } from "../contexts/QuizContext";

import { useQuizContext, quizDispatch } from "../contexts/QuizContext";

function Options() {
  const { questions, dispatch, answer,index } = useQuizContext();

  const question = questions.at(index);

  console.log(question);

  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          disabled={hasAnswered}
          onClick={() => dispatch(quizDispatch("answer", index))}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
