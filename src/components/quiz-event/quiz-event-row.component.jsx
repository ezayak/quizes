import { useState } from 'react';
import { Link } from 'react-router-dom';
import './quiz-event-row.style.css';

const QuizEventRow = (props) => {
    const [done, setDone] = useState(props.done);
    const [checked, setChecked] = useState(props.checked);
    const [showResult, setShowResult] = useState(props.showResult);
    const record = {
        id: props.id,
        quizId: props.quizId,
        date: props.date,
        checked: checked,
        done: done,
        showResult: showResult
    };

    const onSaveEvent = () => {
        record.checked = checked;
        record.done = done;
        record.showResult = showResult;

        props.save(record);
    };

    const onDeleteEvent = () => {
        props.deleteEvent(record.id);
    };

    const onCheckboxChange = (event) => {
        if (event.target.id === 'done') {
            setDone(!done);
        } else if (event.target.id === 'checked') {
            setChecked(!checked);
        } else if (event.target.id === 'showResult') {
            setShowResult(!showResult);
        };
    }

    return (
        <tr>
            <td>{record.date}</td>
            <td>
                <label htmlFor="done">
                    <input type="checkbox" id="done" checked={done} onChange={onCheckboxChange}/> <span> </span>
                </label>
            </td>
            <td>
                <label htmlFor="checked">
                    <input type="checkbox" id="checked" checked={checked} onChange={onCheckboxChange}/> <span> </span>
                </label>
            </td>
            <td>
                <label htmlFor="showResult">
                    <input type="checkbox" id="showResult" checked={showResult} onChange={onCheckboxChange}/> <span> </span>
                </label>
            </td>
            <td>
                <span><Link to={`/quiz-student/${props.quizId}/${props.id}`} target="_blank" rel="noopener noreferrer" style={{"cursor":"pointer"}}><i className="material-icons">open_in_new</i></Link></span>
                <span><Link to={`/quiz-check/${props.id}`} target="_blank" rel="noopener noreferrer" style={{"cursor":"pointer"}}><i className="material-icons">playlist_add_check</i></Link></span>
                <span><a onClick={onSaveEvent} style={{"cursor":"pointer"}}><i className="material-icons">save</i></a></span>
                <span><a onClick={onDeleteEvent} style={{"cursor":"pointer"}}><i className="material-icons">delete</i></a></span>

            </td>
        </tr>
    );
}   

export {QuizEventRow};