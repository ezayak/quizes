import { useState } from "react";


const QuizQuestionAnswerEdit = (props) => {
    const {save, cancel} = props;
    const [data, setData] = useState({
        id: props.id,
        questionId: props.questionId,
        answer: props.answer,
        correct: props.correct,
        points: props.points,
        imageLink: props.imageLink
    });

    const saveAnswer = () => {
        save(data);
    }

    const cancelEditing = () => {
        cancel();
    }

    const onChangeInput = (event) => {
        setData({
            ...data,
            [event.target.id] : event.target.value
        });
    }
    
    const onCheckboxChange = (event) => {
        setData({
            ...data,
            [event.target.id] : event.target.checked
        });
    }

    return (
        <tr>
            <td>
                <input placeholder="Answer" id="answer" type="text" className="validate" defaultValue={data.answer} onChange={onChangeInput}/>
            </td>
            <td>
                <label htmlFor="correct">
                    <input type="checkbox" id="correct" checked={data.correct} onChange={onCheckboxChange}/> <span> </span>
                </label>
            </td>
            <td>
                <input placeholder="Points" id="points" type="number" className="validate" defaultValue={data.points} onChange={onChangeInput}/>
            </td>
            <td>
                <input placeholder="Image link" id="imageLink" type="text" className="validate" defaultValue={data.imageLink} onChange={onChangeInput}/>
            </td>
            <td>
                <a onClick={saveAnswer} style={{"cursor": "pointer"}}><i className="material-icons">save</i></a>
                <a onClick={cancelEditing} style={{"cursor": "pointer"}}><i className="material-icons">cancel</i></a>               
            </td>
        </tr>
    );
}

export { QuizQuestionAnswerEdit };