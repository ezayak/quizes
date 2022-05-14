const QuizQuestionsRow = (props) => {
    const {edit, deleteQuestion} = props;

    const editQuestion = () => {
        edit({
            id: props.id,
            quizId: props.quizId,
            question: props.question,
            questionType: props.questionType,
            points: props.points,
            imageLink: props.imageLink            
        });
    }

    const onDeleteQuestion = () => {
        deleteQuestion(props.id);
    }

    return (
        <tr>
            <td>{props.question}</td>
            <td>{props.points}</td>
            <td>
                <a onClick={editQuestion} style={{"cursor": "pointer"}}><i className="material-icons">create</i></a>
                <a onClick={onDeleteQuestion} style={{"cursor": "pointer"}}><i className="material-icons">delete</i></a>
            </td>
        </tr>
    );
}

export {QuizQuestionsRow}