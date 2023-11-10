// import { useQuiz } from "../contexts/QuizContext";

import { quizDispatch, useQuizContext } from "../contexts/QuizContext";

function FinishScreen() {
  const { points, maxPossiblePoints, highScore, dispatch } = useQuizContext();

  const percentage = (points / maxPossiblePoints) * 100;

  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "🙃";
  if (percentage >= 0 && percentage < 50) emoji = "🤨";
  if (percentage === 0) emoji = "🤦‍♂️";

  return (
    <>
      <p className="result">
        <span>{emoji}</span> You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">(Highscore: {highScore} points)</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch(quizDispatch("restart"))}
      >
        Restart quiz
      </button>
    </>
  );
}

export default FinishScreen;
