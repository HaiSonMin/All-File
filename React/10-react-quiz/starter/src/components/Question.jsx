// import { useQuiz } from "../contexts/QuizContext";
import { useQuizContext } from "../contexts/QuizContext";
import Options from "./Options";

function Question() {
  const { questions, index } = useQuizContext();
  //   const question = questions.at(index);
  const question = questions.at(index);

  console.log(question);

  return (
    <div>
      <h4>{question.question}</h4>
      <Options />
    </div>
  );
}

export default Question;
