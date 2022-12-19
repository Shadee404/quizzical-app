import { useEffect, useState } from "react";

export default function Question(props) {
    const [answers, setAnswers] = useState(() => {
        let answersArray = Array.from(props.question.incorrect_answers);

        if (props.question.type != "boolean") {
            //Insert correct answer in random positon, so the correct answer position wouldn't be the same
            answersArray.splice(Math.floor(Math.random() * answersArray.length), 0, props.question.correct_answer);
        } else {
            answersArray.splice(props.question.correct_answer === "True" ? 0 : 1, 0, props.question.correct_answer)
        }

        return answersArray;
    });
    const [selectedAnswer, setSelectedAnswer] = useState("");


    useEffect(() => {
        let selectedAnswers = props.selectedAnswers;
        selectedAnswers[props.question.question] = selectedAnswer;
        props.setSelectedAnswers(selectedAnswers);
    }, [selectedAnswer]);


    return (
        <div className="question">
            <p className="question__title">{props.question.question}</p>
            <div className="question__answers">{answers.map(answer =>
                <div className="question__answer" key={answer}>
                    <input
                        className="question__radio"
                        type="radio"
                        value={answer}
                        id={`${props.question.question + answer}`}
                        name={props.question.question}
                        onClick={(event) => { setSelectedAnswer(event.target.value) }}
                    />
                    <label
                        htmlFor={`${props.question.question + answer}`}
                        className={
                            props.isCorrect[props.question.question] &&
                                typeof props.isCorrect[props.question.question][answer] != 'undefined' ?
                                props.isCorrect[props.question.question][answer] == true ?
                                    "correct-answer" :
                                    "incorrect-answer" : ""
                        }
                    >{answer}
                    </label>
                </div>)
            }
            </div>
        </div>
    );
}