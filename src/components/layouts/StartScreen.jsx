import Button from "../ui/Button";
import AppearingDiv from "../ui/AppearingDiv";
import {useContext} from "react";
import QuestionsContext from "../../store/questionsContext/QuestionsContext";

export default function StartScreen() {
  const {currentQuestionDispatch, answerScoreDispatch} = useContext(QuestionsContext);

  function handleStart() {
    currentQuestionDispatch("restart");
    answerScoreDispatch("restart");
  }

  return (
    <AppearingDiv>
      <h1 className="mb-2 text-center text-blue-300 text-8xl font-main text-cartoony-outline animate-wiggle">
        <span>REACT</span> <br /> QUIZ TIME!
      </h1>
      <Button className="bg-orange-200 border-orange-300 text-orange-400/40 animate-wiggle-more" onClick={handleStart}>
        Start
      </Button>
    </AppearingDiv>
  );
}
