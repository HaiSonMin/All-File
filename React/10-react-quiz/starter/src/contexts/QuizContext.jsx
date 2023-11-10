import { createContext, useContext, useReducer, useEffect } from "react";
const QuizContext = createContext();

const initialize = {
  // loading, error, ready, active, finished
  questions: [],
  status: "loading",
  index: 0, // Index of question
  points: 0,
  highScore: 0,
  answer: null,
  secondsRemaining: null,
};

const SEC_PER_QUES = 5;

function questionReducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SEC_PER_QUES,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "answer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index++,
        answer: null,
      };
    }
    case "finished": {
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    }
    case "restart": {
      return {
        ...initialize,
        status: "ready",
        questions: state.questions,
      };
    }
    case "loading":
      return { ...state, status: "loading" };
    case "error":
      return { ...state, status: "error" };
    default:
      return;
  }
}
export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(questionReducer, initialize);
  const {
    status,
    answer,
    questions,
    index,
    points,
    highScore,
    secondsRemaining,
  } = state;
  const maxPossiblePoints = questions.reduce((acc, cur) => cur.points + acc, 0);
  // Fetch when mounted
  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:9000/questions");
        if (!response.ok) throw new Error("Some thing went wrong");
        const result = await response.json();
        dispatch(quizDispatch("dataReceived", result));
      } catch (error) {
        dispatch(quizDispatch("error"));
      }
    }
    fetchQuestions();
  }, []);
  return (
    <QuizContext.Provider
      value={{
        status,
        answer,
        questions,
        index,
        points,
        highScore,
        secondsRemaining,
        maxPossiblePoints,
        numQuestions: questions.length,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function quizDispatch(type, payload) {
  return { type, payload };
}

export function useQuizContext() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("Please use context in side provider");
  return context;
}
