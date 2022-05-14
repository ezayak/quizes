import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { QuizEvent } from '../quiz-event/quiz-event.component';
import './quiz-row.styles.css';

const QuizRow = (props) => {
    const {id, name, subject, topic, grade, deleteQuiz} = props;
    const [showQuizEvent, setShowQuizEvent] = useState(false);

    const onDeleteQuiz = () => {
        deleteQuiz(id);
    }

    const setQuizDate = () => {
        setShowQuizEvent(!showQuizEvent);
    }

    return (
        <Fragment>
            <tr>
                <td>{name}</td>
                <td>{subject}</td>
                <td>{topic}</td>
                <td>{grade}</td>
                <td>
                    <span><Link to={`/quiz-edit/${id}`}><i className="material-icons">create</i></Link></span>
                    <span><a onClick={setQuizDate} style={{"cursor":"pointer"}}><i className="material-icons">today</i></a></span>
                    <span><a onClick={onDeleteQuiz} style={{"cursor":"pointer"}}><i className="material-icons">delete</i></a></span>
                </td>
            </tr>
            {showQuizEvent && <QuizEvent quizId={id}/>}
        </Fragment>
    )
}

export { QuizRow };