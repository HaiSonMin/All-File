import { useQuizContext, quizDispatch } from "../contexts/QuizContext";

export default function StartScreen() {
  const { questions, dispatch } = useQuizContext();

  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>
      <h3>{questions.length} questions to test your React mastery</h3>
      {/* <h3>questions to test your React mastery</h3> */}
      <button
        className="btn btn-ui"
        onClick={() => dispatch(quizDispatch("start"))}
      >
        Let's start
      </button>
    </div>
  );
}
