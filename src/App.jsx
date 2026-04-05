import {useContext} from "react";
import MainQuestions from "./components/features/MainQuestions";
import StartScreen from "./components/layouts/StartScreen";
import QuestionsContext from "./store/questionsContext/QuestionsContext";
import QuestionsContextProvider from "./store/questionsContext/QuestionsContextProvider";
import Results from "./components/features/Results";

function MainContent() {
  const {currentQuestion, answerScore} = useContext(QuestionsContext);

  return (
    <>
      {currentQuestion === null && answerScore === null && <StartScreen />}
      {currentQuestion != null && currentQuestion < 10 && <MainQuestions />}
      {currentQuestion >= 10 && <Results />}
    </>
  );
}

export default function App() {
  return (
    <QuestionsContextProvider>
      <MainContent />
    </QuestionsContextProvider>
  );
}
