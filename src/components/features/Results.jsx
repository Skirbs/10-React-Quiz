import {useContext} from "react";
import AppearingDiv from "../ui/AppearingDiv";
import Card from "../ui/Card";
import QuestionsContext from "../../store/questionsContext/QuestionsContext";
import Button from "../ui/Button";

function getFeedback(score) {
  if (score >= 9 && score <= 10) {
    return "Excellent work!";
  } else if (score >= 7 && score < 9) {
    return "Good job!";
  } else if (score >= 4 && score < 7) {
    return "Needs improvement.";
  } else if (score >= 0 && score < 4) {
    return "Try again.";
  } else {
    return "Invalid score. Please enter 0 to 10.";
  }
}

export default function Results() {
  const {answerScore, currentQuestionDispatch, answerScoreDispatch} = useContext(QuestionsContext);

  let feedback;

  feedback = getFeedback(answerScore);

  function handleHome() {
    currentQuestionDispatch("home");
    answerScoreDispatch("home");
  }
  function handleStart() {
    currentQuestionDispatch("restart");
    answerScoreDispatch("restart");
  }

  return (
    <>
      <AppearingDiv>
        <h1 className="mb-2 text-center text-blue-300 text-8xl font-main text-cartoony-outline animate-wiggle">
          QUIZ RESULT
        </h1>
      </AppearingDiv>
      <AppearingDiv className="animate-appear-longer-delay!">
        <Card className="flex flex-col items-center justify-center px-32 animate-wiggle-more font-main">
          <h2 className="text-2xl">~ Your Score ~</h2>
          <p className="text-6xl">{answerScore} / 10</p>
          <Card className="py-2! w-full text-xl text-center ">{feedback}</Card>
        </Card>
        <div className="flex gap-5 mt-5">
          <Button
            className="bg-orange-200 border-orange-300 text-orange-400/40 animate-wiggle-more"
            onClick={handleHome}>
            Home
          </Button>
          <Button
            className="bg-orange-200 border-orange-300 text-orange-400/40 animate-wiggle-more"
            onClick={handleStart}>
            Restart
          </Button>
        </div>
      </AppearingDiv>
    </>
  );
}
