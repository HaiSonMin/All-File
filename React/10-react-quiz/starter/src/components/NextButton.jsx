// import { useQuiz } from "../contexts/QuizContext";

import { quizDispatch, useQuizContext } from "../contexts/QuizContext";
function NextButton() {
  const { dispatch, answer, index, numQuestions } = useQuizContext();

  console.log("NextButton::::");

  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch(quizDispatch("nextQuestion"))}
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch(quizDispatch("finished"))}
      >
        Finish
      </button>
    );
}

export default NextButton;
