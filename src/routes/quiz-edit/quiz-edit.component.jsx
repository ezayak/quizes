import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QuizQuestionEdit } from "../../components/quiz-questions/quiz-question-edit.component";
import { QuizQuestionsRow } from "../../components/quiz/quiz-questions-row.component";
import * as dbQuestions from "../../utils/api/quiz-questions.firebase";
import { getQuizByID } from "../../utils/api/quizes.firebase";
import './quiz-edit.styles.css';

const QuizEdit = () => {
    const {id} = useParams();
    const [quizData, setQuizData] = useState({});
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [editQuestionVisible, setEditQuestionVisible] = useState(false);
    const [questionEdit, setQuestionEdit] = useState(dbQuestions.initialQuestion);

    useEffect(function onLoad() {
        getQuizByID(id)
            .then((res) => {
                setQuizData(res);
            });
        loadQuestion();
        // eslint-disable-next-line
    }, []);

    const loadQuestion = () => {
        dbQuestions.getQuizQuestions(id)
            .then((res) => {
                setQuizQuestions(res);
            })
    };

    const showQuestion = () => {
        setEditQuestionVisible(true);
    }

    const hideQuestion = () => {
        setEditQuestionVisible(false);
    }

    const editQuestion = (record) => {
        setQuestionEdit(record);
        showQuestion();
    }

    const addQuestion = () => {
        setQuestionEdit({
            ...dbQuestions.initialQuestion,
            quizId: id
        });
        showQuestion();
    }

    const deleteQuestion = (id) => {
        dbQuestions.deleteQuestion(id)
            .then(() => {
                setQuizQuestions(quizQuestions.filter(question => {
                    return question.id !== id;
                }))
            });
    }

    const saveQuestion = (record) => {
        const newRecord = record.id === '' ? true : false;
        dbQuestions.saveQuestion(record)
            .then((id) => {
                if (newRecord) {
                    setQuizQuestions([
                        ...quizQuestions,
                        {
                            ...record,
                            id
                        }
                    ]);
                } else {
                    setQuizQuestions(quizQuestions.map(question => {
                        if (question.id === record.id) {
                            return record;
                        } else {
                            return question;
                        }
                    }));
                }

                setQuestionEdit({
                    ...record,
                    id
                });
            });
    }

    return (
        <div className="content quiz-edit">
            <div className="row">
                <h5 className="col-75">Name: {quizData.name}</h5>
                <h5 className="col">Year: {quizData.grade}</h5>
                <h5 className="col">Subject: {quizData.subject}</h5>
                <div className="back-button"><Link to="/" className="col l2"><i className="material-icons left">arrow_back</i> Back to quizes</Link></div>
            </div>
            <table className="highlight">
                <thead>
                    <tr>
                        <th>Quesion</th>
                        <th>Points</th>
                        <th><button className="btn waves-effect waves-light btn-small" onClick={addQuestion}>ADD QUESTION</button></th>
                    </tr>
                </thead>
                <tbody>
                    {quizQuestions.length !== 0 ?
                        quizQuestions.map((question, index) => {
                            return <QuizQuestionsRow key={question.id} {...question} edit={editQuestion} deleteQuestion={deleteQuestion}/>
                        })
                    : null
                    }
                </tbody>
            </table>
            {editQuestionVisible ? <QuizQuestionEdit hide={hideQuestion} save={saveQuestion} {...questionEdit}/> : null}
        </div>
    );

}

export { QuizEdit };