import './quiz-question-edit.styles.css';
import React, { useEffect, useState } from 'react';
import { QuizQuestionAnwerRow } from './quiz-question-answer-row';
import M from 'materialize-css';
import * as dbAnswers from '../../utils/api/quiz-question-answers.firebase';
import { QuizQuestionAnswerEdit } from './quiz-question-answer-edit';
import * as constants from '../../utils/constants/constants';

const initialAnswer = {
    id: '',
    questionId: '',
    quizId: '',
    answer: '',
    points: 0,
    correct: false,
    imageLink: ''

};

const QuizQuestionEdit = ({hide, save, id, quizId, question, questionType, points, imageLink}) => {
    const [data, setData] = useState({
        id: id,
        quizId: quizId,
        question: question,
        questionType: questionType ? questionType : 'Single answer',
        points: points,
        imageLink: imageLink ? imageLink : ''
    });
    const [answer, setAnswer] = useState(initialAnswer);
    const [answers, setAnswers] = useState([]);
    const [answerVisibility, setAnswerVisibility] = useState(false);

    const closeQuestion = () => {
        hide();
    };

    const saveQuestion = () => {
        save(data);
    }

    const loadAnswers = () => {
        dbAnswers.getQuestionAnswers(id)
            .then((res) => {
                setAnswers(res);
            })
    };

    useEffect(function onLoad() {
        M.AutoInit();
        M.updateTextFields();
        loadAnswers();
        // eslint-disable-next-line
    },[]);

    useEffect(function OnIDChange(){
        setData({
            ...data,
            id
        })
        // eslint-disable-next-line
    }, [id]);

    const handleChangeInput = (event) => {
        setData({...data, [event.target.id]: event.target.value});
    }

    const addNewQuestion = () => {
        setAnswer(initialAnswer);
        setAnswerVisibility(true);
    }

    const saveAnswer = (record) => {
        const newRecord = record.id === '' ? true : false;
    
        dbAnswers.saveAnswer({
            ...record,
            questionId: id,
            quizId: quizId
        }).then(res => {
            if (newRecord) {
                setAnswers([
                    ...answers,
                    {...record, id: res}
                ]);
                setAnswerVisibility(false);
            } else {
                setAnswers(answers.map(answer => {
                    if (answer.id === res) {
                        return record;
                    } else {
                        return answer;
                    }
                }));
            }
        });

    }

    const deleteAnswer = (id) => {
        dbAnswers.deleteAnswer(id)
            .then(res => {
                if (res) {
                    setAnswers(answers.filter(answer => {
                        return (answer.id !== id);
                    }))
                }
            })
    }

    const cancelAddingAnswer = () => {
        setAnswerVisibility(false);
    }

    return (
        <div className="question-container">
            <div className="row">
                <div className="input-field col s12">
                    <textarea placeholder="Question" id="question" className="materialize-textarea" defaultValue={data.question} onChange={handleChangeInput}></textarea>
                    <label className="active" htmlFor="question">Question</label>
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12 l2">
                    <input placeholder="Points" id="points" defaultValue={data.points} onChange={handleChangeInput} />
                    <label className="active" htmlFor="question">Points</label>
                </div>
                <div className='col l10 s12'></div>
            </div>
            <div className="row">
                <div className="input-field col s12 l10 m10">
                    <input placeholder="Image link" id="imageLink" defaultValue={data.imageLink} onChange={handleChangeInput} />
                    <label className="active" htmlFor="question">Image link</label>
                </div>
                <div className="col l2 m2 s12">
                    {data.imageLink && <img src={data.imageLink} style={{"maxHeight":"100px"}} alt=""/>}
                </div>
            </div>
            <div className="row">
                <div className="input-field col s12" id="questionType">
                    <select id="questionType" value={data.questionType} onChange={handleChangeInput}>
                        <option value="" disabled>Question type</option>
                        <option value={constants.QUESTION_TYPES.multipleChoise}>{constants.QUESTION_TYPES.multipleChoise}</option>
                        <option value={constants.QUESTION_TYPES.singleChoise}>{constants.QUESTION_TYPES.singleChoise}</option>
                        <option value={constants.QUESTION_TYPES.description}>{constants.QUESTION_TYPES.description}</option>
                    </select>
                    <label>Question type</label>
                </div>
            </div>
            <div className="scroll-inner">
                <table>
                    <thead>
                        <tr>
                            <th>Answer</th>
                            <th>Correct</th>
                            <th>Points</th>
                            <th>Image link</th>
                            <th>
                                {id && <button className="waves-effect waves-light btn-small" onClick={addNewQuestion}>Add answer</button>}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {answerVisibility && <QuizQuestionAnswerEdit {...answer} cancel={cancelAddingAnswer} save={saveAnswer}/>}
                        {answers.length !== 0 ? 
                            answers.map(answer => {
                                return <QuizQuestionAnwerRow key={answer.id} {...answer} save={saveAnswer} deleteAnswer={deleteAnswer}/>
                            })
                        : null
                        }
                    </tbody>
                </table>
            </div>
            <div className='row action-row'>
                <div className='col s6'>
                    <button className="waves-effect waves-teal btn-flat action-button" onClick={saveQuestion}>SAVE</button>
                </div>
                <div className='col s6'>
                    <button className="waves-effect waves-teal btn-flat action-button" onClick={closeQuestion}>Close</button>
                </div>
            </div>
        </div>
    );
}

export {QuizQuestionEdit}