import {useContext, useEffect, useRef, useState} from "react";

import questions from "../../questions";

import AppearingDiv from "../ui/AppearingDiv";
import Card from "../ui/Card";
import QuestionsContext from "../../store/questionsContext/QuestionsContext";
import Button from "../ui/Button";

function Stopwatch({answerState}) {
  const {currentQuestion, setFinishedTime} = useContext(QuestionsContext);
  const [currentTime, setCurrentTime] = useState(0);

  const intervalRef = useRef();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentTime((time) => time + 1);
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [currentQuestion]);

  return (
    <Card
      className={`p-2! min-w-16 text-center bottom-right-shadow-sm ${answerState === "incorrect" ? "duration-75 bg-red-300 border-red-900! text-red-900!" : ""} ${answerState === "correct" ? "duration-75 bg-green-300 border-green-900! text-green-900!" : ""}`}>
      {Math.floor(currentTime / 60)
        .toString()
        .padStart(2, "0")}
      :{(currentTime % 60).toString().padStart(2, "0")}
    </Card>
  );
}

function ProgressHeader({answerState}) {
  const {currentQuestion} = useContext(QuestionsContext);
  return (
    <Card
      className={`flex flex-col item-center bottom-right-shadow-sm ${answerState === "incorrect" ? "duration-75 bg-red-300 border-red-900! text-red-900!" : ""} ${answerState === "correct" ? "duration-75 bg-green-300 border-green-900! text-green-900!" : ""}`}>
      <span className="text-2xl">Question {currentQuestion + 1} of 10</span>
      <progress
        className="rounded-xl bg-black/10 [&::-webkit-progress-bar]:bg-black/10 [&::-webkit-progress-bar]:rounded-2xl [&::-webkit-progress-value]:rounded-2xl [&::-webkit-progress-value]:bg-blue-500"
        max={10}
        value={currentQuestion}>
        10%
      </progress>
    </Card>
  );
}

function Score({answerState}) {
  const {answerScore} = useContext(QuestionsContext);
  return (
    <Card
      className={`text-2xl bottom-right-shadow-sm ${answerState === "incorrect" ? "duration-75 bg-red-300 border-red-900! text-red-900!" : ""} ${answerState === "correct" ? "duration-75 bg-green-300 border-green-900! text-green-900!" : ""}`}>
      Score: {answerScore}
    </Card>
  );
}

function MainQuestionComponent({answerState}) {
  const {currentQuestion} = useContext(QuestionsContext);
  return (
    <Card
      className={`relative flex text-3xl min-h-32 font-main place-items-center ${answerState === "processing" ? "duration-500 opacity-60" : ""} ${answerState === "incorrect" ? "duration-75 bg-red-300 border-red-900! text-red-900!" : ""} ${answerState === "correct" ? "duration-75 bg-green-300 border-green-900! text-green-900!" : ""}`.trim()}>
      <Card
        className={`bottom-right-shadow-sm absolute -top-5 -left-5 w-16 h-12 text-2xl flex items-center justify-center text-center p-0! ${answerState === "incorrect" ? "duration-75 bg-red-300 border-red-900! text-red-900!" : ""} ${answerState === "correct" ? "duration-75 bg-green-300 border-green-900! text-green-900!" : ""}`}>
        {currentQuestion + 1}
      </Card>
      <p className="w-full text-center">{questions[currentQuestion].question}</p>
    </Card>
  );
}
function AnswersGrid({answerState, onPlayerAnswer}) {
  const {currentQuestion} = useContext(QuestionsContext);
  const answers = questions[currentQuestion].answers;
  return (
    <div className="grid h-48 grid-cols-2 grid-rows-2 gap-2 mt-8">
      <Button
        className={`text-red-800 bg-red-200 border-red-800 ${answerState !== "waiting" ? "opacity-50!" : "opacity-100"}`}
        disabled={answerState !== "waiting"}
        onClick={() => onPlayerAnswer(0)}>
        {answers[0]}
      </Button>
      <Button
        className={`text-yellow-600 bg-yellow-200 border-yellow-700 ${answerState !== "waiting" ? "opacity-50!" : "opacity-100"}`}
        disabled={answerState !== "waiting"}
        onClick={() => onPlayerAnswer(1)}>
        {answers[1]}
      </Button>
      <Button
        className={`text-green-500 bg-green-200 border-green-700 ${answerState !== "waiting" ? "opacity-50!" : "opacity-100"}`}
        disabled={answerState !== "waiting"}
        onClick={() => onPlayerAnswer(2)}>
        {answers[2]}
      </Button>
      <Button
        className={`text-purple-500 bg-purple-200 border-purple-700 ${answerState !== "waiting" ? "opacity-50!" : "opacity-100"}`}
        disabled={answerState !== "waiting"}
        onClick={() => onPlayerAnswer(3)}>
        {answers[3]}
      </Button>
    </div>
  );
}

export default function MainQuestions() {
  const {currentQuestion, currentQuestionDispatch, answerScoreDispatch} = useContext(QuestionsContext);
  const [answerState, setAnswerState] = useState("waiting");

  function handlePlayerAnswer(answer) {
    if (answerState != "waiting") return;
    setAnswerState("processing");

    setTimeout(() => {
      // setAnswerState("correct");
      if (questions[currentQuestion].correctIndex === answer) {
        setAnswerState("correct");
        answerScoreDispatch("increment");
      } else {
        setAnswerState("incorrect");
      }

      setTimeout(() => {
        setAnswerState("waiting");
        currentQuestionDispatch("increment");
      }, 1000);
    }, 600);
  }

  return (
    <AppearingDiv className="w-[50vw] flex flex-col  items-stretch">
      <div className="flex items-center justify-between w-full mb-10 font-main">
        <Stopwatch answerState={answerState} />
        <ProgressHeader answerState={answerState} />
        <Score answerState={answerState} />
      </div>
      <MainQuestionComponent answerState={answerState} />
      <AnswersGrid answerState={answerState} onPlayerAnswer={handlePlayerAnswer} />
    </AppearingDiv>
  );
}
