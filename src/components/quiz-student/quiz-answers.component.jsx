import { useEffect, useState } from 'react';
import * as constants from '../../utils/constants/constants';

const QuizAnswers = (props) => {
    const [answers, setAnswers] = useState(props.answers);

    const onChangeInput = (event) => {
        const checked = event.target.checked;
        const newAnswers = answers.map(answer => {
            if (event.target.value === answer.id) {
                return {
                    ...answer,
                    marked: checked
                }
            } else {
                return {
                    ...answer,
                    marked: !checked
                }

            }
        });

        setAnswers(newAnswers);
        props.onChangeAnswer(newAnswers);
    }

    const onChangeTextbox = (event) => {
        setAnswers([{
            ...answers[0], 
            answerId: '',
            answer: event.target.value, 
            marked: true}]);
        props.onChangeAnswer([{
            ...answers[0], 
            answerId: '',
            answer: event.target.value, 
            marked: true}]);
    }

    useEffect(function onChangeProps() {
        setAnswers(props.answers);
        // eslint-disable-next-line
    }, [props.answers]);

    const onChangeCheckbox = (event) => {
        const checked = event.target.checked;
        const newAnswers = answers.map(answer => {
            if (event.target.id === answer.id) {
                return {
                    ...answer,
                    marked: checked
                };
            } else {
                return answer;
            }
        });

        setAnswers(newAnswers);
        props.onChangeAnswer(newAnswers);
    }

    return (
        <>  
            {props.questionType === constants.QUESTION_TYPES.singleChoise &&
                answers.map(answer => {
                    return (
                    <p key={answer.id}>
                        <label>
                            <input 
                                name={props.questionId} 
                                type="radio" checked={answer.marked}  
                                onChange={onChangeInput}
                                value={answer.id}
                            />
                            <span>{answer.answer}</span>
                        </label>
                    </p>)
                })
            }
            {props.questionType === constants.QUESTION_TYPES.multipleChoise &&
                answers.map(answer => {
                    return (
                    <p key={answer.id}>
                        <label>
                            <input 
                                type="checkbox"
                                id={answer.id}
                                checked={answer.marked}  
                                onChange={onChangeCheckbox}

                            />
                            <span>{answer.answer}</span>
                        </label>
                    </p>)                    
                })
            }
            {props.questionType === constants.QUESTION_TYPES.description &&
                <div className="row">
                    <div className="input-field col s12">
                        <textarea id="answer" className="materialize-textarea" value={answers[0].answer} onChange={onChangeTextbox}></textarea>
                        <label htmlFor="answer" className="active">Answer</label>
                    </div>
                </div>            
            }
        </>
    );
}

export { QuizAnswers };