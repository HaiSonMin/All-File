import React, { useEffect, useReducer } from "react";
import { funcDispatch } from "./utils/funcDispath";
import {
  Header,
  Main,
  Loader,
  Error,
  StartScreen,
  Question,
  Process,
  NextButton,
  FinishScreen,
  Timer,
  Footer,
} from "./components";
import { QuizProvider, useQuizContext } from "./contexts/QuizContext";

export default function App() {
  // const [state, dispatch] = useReducer(questionReducer, initialize);
  // const {
  //   status,
  //   answer,
  //   questions,
  //   index,
  //   points,
  //   highScore,
  //   secondsRemaining,
  // } = state;
  // const maxPossiblePoints = questions.reduce((acc, cur) => cur.points + acc, 0);
  // // Fetch when mounted
  // useEffect(() => {
  //   async function fetchQuestions() {
  //     try {
  //       const response = await fetch("http://localhost:9000/questions");
  //       if (!response.ok) throw new Error("Some thing went wrong");
  //       const result = await response.json();
  //       dispatch(funcDispatch("dataReceived", result));
  //     } catch (error) {
  //       console.error("Error:::", error);
  //       dispatch(funcDispatch("error"));
  //     }
  //   }
  //   fetchQuestions();
  // }, []);
  const { status } = useQuizContext();
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Process />
            <Question />
            <Footer>
              <Timer />
              <NextButton />
            </Footer>
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
