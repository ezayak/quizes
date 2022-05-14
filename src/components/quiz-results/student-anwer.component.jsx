import { useState } from "react";
import { saveQuizResult } from "../../utils/api/quiz-result.firebase";
import "./student-answer.style.css";

const StudentAnswer = (props) => {
    const [data, setData] = useState({
        id: props.id,
        quizId: props.quizId,
        questionId: props.questionId,
        eventId: props.eventId,
        question: props.question,
        answer: props.answer,
        correct: props.correct,
        points: props.points,
        pointsQuestion: props.pointsQuestion,
        student: props.student,
        toCheck: props.toCheck,
        imageLinkQuestion: props.imageLinkQuestion,
        answerId: props.answerId
    });

    const onChangeInput = (event) => {
        setData({
            ...data,
            points: +event.target.value
        });
    }

    const onChangeCheckBox = (event) => {
        setData({
            ...data,
            [event.target.id] : event.target.checked
        })
    }

    const onSaveAnswer = () => {
        console.log(data);
        saveQuizResult(data);
        props.onChangeAnswer(data);
    }

    return (
        <tr>
            <td>{data.question}</td>
            <td>{data.imageLinkQuestion && <img src={data.imageLinkQuestion} style={{"width": "50px"}} alt=""/>}</td>
            <td>{data.answer}</td>
            <td>
                <label><input type="checkbox" id="correct" checked={data.correct} onChange={onChangeCheckBox}/><span></span></label>
            </td>
            <td>
                <label><input type="checkbox" id="toCheck" checked={data.toCheck} onChange={onChangeCheckBox}/><span></span></label>
            </td>
            <td>
                <div className="input-field" style={{"width":"3rem"}}>
                    <input id="points" type="number" value={data.points} onChange={onChangeInput}/>
                </div>                
            </td>
            <td>{props.pointsQuestion}</td>
            <td>
                <a onClick={onSaveAnswer} style={{"cursor":"pointer"}}><i className="material-icons">save</i></a>
            </td>
        </tr>
    );
}

export { StudentAnswer }; 