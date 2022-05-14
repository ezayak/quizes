import {StudentAnswer} from "./student-anwer.component";
import "./student-answers.style.css";

const StudentAnswers = (props) => {
    return (
        <tr>
            <td colSpan="5">
                <div className="student-answers-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th></th>
                                <th>Answer</th>
                                <th>Correct</th>
                                <th>To check</th>
                                <th>Points</th>
                                <th>Max points</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.answers.map(answer => {
                                return <StudentAnswer key={answer.id} {...answer} onChangeAnswer={props.onChangeAnswer}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    );
}

export { StudentAnswers };