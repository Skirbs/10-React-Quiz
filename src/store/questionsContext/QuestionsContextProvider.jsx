import {useReducer, useState} from "react";
import QuestionsContext from "./QuestionsContext";

function currentQuestionReducer(state, action) {
  switch (action) {
    case "increment":
      return state + 1;
    case "restart":
      return 0;
    case "home":
      return null;
    default:
      console.warn("Current question reducer's action dont exist");
      return state;
  }
}
function answerScoreReducer(state, action) {
  switch (action) {
    case "increment":
      return state + 1;
    case "restart":
      return 0;
    case "home":
      return null;
    default:
      console.warn("Answer score reducer's action dont exist");
      return state;
  }
}

export default function QuestionsContextProvider({children}) {
  const [currentQuestion, currentQuestionDispatch] = useReducer(currentQuestionReducer, null);
  const [answerScore, answerScoreDispatch] = useReducer(answerScoreReducer, null);

  const [finishedTime, setFinishedTime] = useState(null);

  const ctxValue = {
    currentQuestion,
    answerScore,
    finishedTime,
    currentQuestionDispatch,
    answerScoreDispatch,
    setFinishedTime,
  };

  return <QuestionsContext value={ctxValue}>{children}</QuestionsContext>;
}
