import {createContext} from "react";

// if !currentQuestion && !answerScore = startScreen
// if currentQuestion = quizScree
// if !currentQuestion && answerScore = resultScreen
export default createContext({
  currentQuestion: null,
  answerScore: null,
  finishedTime: null,
  currentQuestionDispatch: () => {},
  answerScoreDispatch: () => {},
  setFinishedTime: () => {},
});
