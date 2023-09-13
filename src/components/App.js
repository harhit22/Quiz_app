import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishedScreen from "./FinishedScreen";
//------------------------inital state------------------------//
const initialState = {
  questions: [],
  status: "loading", // 'loading','error','ready','active','finished'
  index: 0,
  answer: null,
  points: 0,
  highScore: 0
};

//------------------------reducer funtion------------------------//

function reducer(state, action) {
  switch (action.type) {
    case "dataRecevied":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.index);
      console.log(question)
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
      case "finshed":
      return {
        ...state,
        status: 'finished',
        highScore: 
          state.points > state.highScore ? state.points : state.highScore
      };
      case "restart":
      return {
        ...initialState, questions: state.questions, status: "ready"
      };

    default:
      throw new Error("action unknown");
  }
}

//--------------------------------main app--------------------------//

export default function App() {
  const [{ questions, status, index, answer, points, highScore }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev, cur)=>prev + cur.points,0)
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecevied", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              points={points}
            />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} />
          </>
        )}
        {status === 'finished' && <FinishedScreen points={points} maxPossisblePoints={maxPossiblePoints} highScore={highScore} dispatch={dispatch}/>}
      </Main>
    </div>
  );
}
