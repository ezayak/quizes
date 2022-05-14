import { useState } from 'react';
import { Link } from 'react-router-dom';
import './quiz-event-row.style.css';

const QuizEventAdd = (props) => {
    const initialRecord = {
        id: '',
        quizId: props.quizId,
        date: '',
        checked: false,
        done: false,
        showResult: false
    };
    const [record, setRecord] = useState(initialRecord);

    const onSaveEvent = () => {
        props.save(record);
        props.hide();
    };

    const onCancelEvent = () => {
       props.hide();
    };

    const onCheckboxChange = (event) => {
        setRecord({
            ...record,
            [event.target.id] : event.target.checked
        });
    }

    const onInputChange = (event) => {
        setRecord({
            ...record,
            [event.target.id]: event.target.value
        });
    }

    return (
        <tr>
            <td>
                <div className="input-field">
                    <input value={record.date} id="date" type="date" className="validate" onChange={onInputChange}/>
                    <label className="active" htmlFor="date">Date</label>
                </div>            
            </td>
            <td>
                <label htmlFor="done">
                    <input type="checkbox" id="done" checked={record.done} onChange={onCheckboxChange}/> <span> </span>
                </label>
            </td>
            <td>
                <label htmlFor="checked">
                    <input type="checkbox" id="checked" checked={record.checked} onChange={onCheckboxChange}/> <span> </span>
                </label>
            </td>
            <td>
                <label htmlFor="showResult">
                    <input type="checkbox" id="showResult" checked={record.showResult} onChange={onCheckboxChange}/> <span> </span>
                </label>
            </td>
            <td>
                <span><a onClick={onSaveEvent} style={{"cursor":"pointer"}}><i className="material-icons">save</i></a></span>
                <span><a onClick={onCancelEvent} style={{"cursor":"pointer"}}><i className="material-icons">cancel</i></a></span>

            </td>
        </tr>
    );
}   

export {QuizEventAdd};