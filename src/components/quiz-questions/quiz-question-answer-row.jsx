import { Fragment, useState } from "react";
import { QuizQuestionAnswerEdit } from "./quiz-question-answer-edit";

const QuizQuestionAnwerRow = (props) => {
    const {deleteAnswer, save} = props;
    const [editMode, setEditMode] = useState(false);

    const editAnswer = () => {
        setEditMode(true);
    };

    const handleDeleteAnswer = () => {
        deleteAnswer(props.id);
    };

    const cancelEditing = () => {
        setEditMode(false);
    }

    const handleSave = (record) => {
        save(record);
        setEditMode(false);
    }


    return (
        <Fragment>
                {!editMode ? 
                    <tr>
                        <td>{props.answer}</td>
                        <td>{props.correct ? <i className="material-icons">check</i> : null}</td>
                        <td>{props.points}</td>
                        <td>{ props.imageLink && <img src={props.imageLink} style={{"maxHeight":"100px"}} alt=""/>}</td>
                        <td>
                            <a onClick={editAnswer} style={{"cursor": "pointer"}}><i className="material-icons">create</i></a>
                            <a onClick={handleDeleteAnswer} style={{"cursor": "pointer"}}><i className="material-icons">delete</i></a>
                        </td>
                    </tr>
                :
                    <QuizQuestionAnswerEdit cancel={cancelEditing} {...props} save={handleSave}/>
                }
        </Fragment>
    );
}

export { QuizQuestionAnwerRow };