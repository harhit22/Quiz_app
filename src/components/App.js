import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from './Loader'
import Error from './Error'
import StartScreen from "./StartScreen";
import Question from "./Question";
//------------------------inital state------------------------//
const initialState = {
  questions: [],
  status: 'loading', // 'loading','error','ready','active','finished'
  index: 0
  
}

//------------------------reducer funtion------------------------//

function reducer(state, action) {
  switch(action.type){
    case 'dataRecevied':
      return{
        ...state, 
        questions : action.payload,
        status: "ready"
      }
      case 'dataFailed':
      return{
        ...state,
        status: "error"
      }
      case 'start':
      return{
        ...state,
        status: "active"
      }
    default:
      throw new Error("action unknown")
  }
}


//--------------------------------main app--------------------------//

export default function App() {
  const [{questions, status, index}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  useEffect(function () {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json()) 
      .then((data) => dispatch({type:'dataRecevied', payload: data}))
      .catch((err) => dispatch({type: 'dataFailed'}));
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader/>}
        {status === "error" && <Error/>}
        {status === "ready" && <StartScreen numQuestions={numQuestions} dispatch={dispatch}/>}
        {status === "active" && <Question question={questions[index]}/>}
      </Main>
    </div>
  );
}
