const QuizAddRow = (props) => {
    const {addQuiz, hide} = props;
    let data = {
        name: '',
        subject: '',
        topic: '',
        grade: '',
        id: ''
    }
    const saveData = () => {
        addQuiz(data);
        hide();
    }

    const onCancel = () => {
        hide();
    }

    const onChangeInput = (event) => {
        data = {
            ...data,
            [event.target.id] : event.target.value
        }
    }

    return (
        <tr>
            <td>
                <input placeholder="Quiz name" id="name" type="text" className="validate" defaultValue={data.name} onChange={onChangeInput}/>
            </td>
            <td>
                <input placeholder="Subject" id="subject" type="text" className="validate" defaultValue={data.subject} onChange={onChangeInput}/>
            </td>
            <td>
                <input placeholder="Topic" id="topic" type="text" className="validate" defaultValue={data.topic} onChange={onChangeInput}/>
            </td>
            <td>
                <input placeholder="Grade" id="grade" type="text" className="validate" defaultValue={data.grade} onChange={onChangeInput}/>
            </td>
            <td>
                <a onClick={saveData} style={{"cursor": "pointer"}}><i className="material-icons">save</i></a>
                <a onClick={onCancel} style={{"cursor": "pointer"}}><i className="material-icons">cancel</i></a>               
            </td>
        </tr>
    )
}

export { QuizAddRow };