import { Fragment, useState } from "react";
import { StudentAnswers } from "./student-answers.component";

const Student = (props) => {
    const [showAnswers, setShowAnswers] = useState(false);
    const answers = props.answers.filter(answer => {
        return answer.student === props.student;
    });

    const onShowAnswers = () => {
        setShowAnswers(!showAnswers);
    };

    return (
        <Fragment>
            <tr>
                <td>{props.student}</td>
                <td>{props.points}</td>
                <td>{props.maxPoints}</td>
                <td>{props.toCheck && <i className="material-icons">check</i>}</td>
                <td>
                    <a onClick={onShowAnswers} style={{"cursor":"pointer"}}><i className="material-icons">playlist_add_check</i></a>
                </td>
            </tr>
            {
                !showAnswers ? null : <StudentAnswers answers={answers} onChangeAnswer={props.onChangeAnswer}/>
            }
        </Fragment>
    );
}

export { Student };

