import Question from "./Question";
import data from "../data.json";
import { useState, useEffect } from "react";
import "../style/Quiz.css";

export default function Quiz(props) {
    let questions = props.questions;
    let answersToSelecte = {};
    questions.forEach(question => {
        answersToSelecte[question.question] = "";
    });
    const [selectedAnswers, setSelectedAnswers] = useState(answersToSelecte);
    const [isCorrect, setIsCorrect] = useState({});
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);

    function checkAnswers() {
        questions.forEach((question) => {
            let correctAnswer = question.correct_answer;
            let answer = selectedAnswers[question.question];
            let isCorrectAnswer = correctAnswer === answer ? true : false; 

            setScore(prevScore => isCorrectAnswer ? prevScore + 1 : prevScore);
            setIsCorrect((prevIsCorrect) => {
                return {
                    ...prevIsCorrect,
                    [question.question]: {[answer] : isCorrectAnswer},
                };
            });
        });

        setIsFinished(true);
    }

    function restartQuiz() {
        setSelectedAnswers(answersToSelecte);
        setIsCorrect({});
        props.setIsMainScreen(true);
    }

    return (
        <div className="quiz">
            <div className="quiz__questions">{questions.map((question) => (
                <Question 
                    key={question.question} 
                    question={question} 
                    setSelectedAnswers={setSelectedAnswers} 
                    selectedAnswers={selectedAnswers}
                    isCorrect={isCorrect}
                    />
            ))}
            </div>
            <div className="quiz__submit">
                { !isFinished ? 
                <button className="quiz__check button" onClick={checkAnswers}>Check answers</button> :
                <div className="quiz__play-again">
                    <span className="quiz__score">You scored {score}/5 answers</span>
                    <button className="quiz__restart button" onClick={restartQuiz}>Play again</button>
                </div>
                }      
            </div>

        </div>
    );
}
