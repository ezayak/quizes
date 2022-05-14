import './quiz-student.style.css';
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getQuizByID } from '../../utils/api/quizes.firebase';
import { getQuizQuestions } from '../../utils/api/quiz-questions.firebase';
import { getQuizAnswers,  initialAnswer} from '../../utils/api/quiz-question-answers.firebase';
import { QuizQuestion } from "../../components/quiz-student/quiz-question.component";
import * as constants from '../../utils/constants/constants';
import { saveQuizResult } from "../../utils/api/quiz-result.firebase";
import { shuffleArray } from '../../utils/common/common';

const QuizStudent = () => {
    const navigate = useNavigate();
    const {quizId, eventId} = useParams();
    const [pageNumber, setPageNumber] = useState(0);
    const [quizInfo, setQuizInfo] = useState({
        eventId: eventId,
        quizId: quizId,
        name: '',
        subject: '',
        topic: '',
        grade: '',
        student: ''
    });
    const [quizQuestions, setQuizQuestions] = useState([]);
    const [quizAnswers, setQuizAnswers] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState({
        evetnId: eventId,
        quizId: quizId,
        id: '',
        question: '',
        questionType: '',
        points: 0
    });
    const [currentAnswers, setCurrentAnswers] = useState([]);
    const [studentAnswers, setStudentAnswers] = useState([]);

    useEffect(function onLoad() {
        getQuizByID(quizId)
            .then((data) => {
                setQuizInfo({
                    ...quizInfo,
                    name: data.name,
                    subject: data.subject,
                    topic: data.topic,
                    grade: data.grade
                })
            });

        getQuizQuestions(quizId)
            .then((data) => {
                setQuizQuestions(shuffleArray(data));
            });

        getQuizAnswers(quizId)
            .then((data) => {
                setQuizAnswers(shuffleArray(data));
            });
        // eslint-disable-next-line
    },[]);

    const onChangeInput = (event) => {
        setQuizInfo({
            ...quizInfo,
            [event.target.id] : event.target.value
        });
    }
    
    const onStartClick = () => {
        setPageNumber(1);

        if (quizQuestions.length > 0) {
            changeCurrentQuestion(1);
        }
    }

    const changeStudentAnswers = (answwers, questionId) => {
        const newAsnwers = studentAnswers.filter(answer => {
            return answer.questionId !== questionId;
        });

        answwers.forEach(answer => {
            if (answer.marked) {
                newAsnwers.push({
                    ...answer,
                    questionId,
                    toCheck: currentQuestion.questionType === constants.QUESTION_TYPES.description,
                    imageLinkQuestion: currentQuestion.imageLink
                });
            }
        });

        setStudentAnswers(newAsnwers);
    }

    const onChangeAnswer = (newAnswers, questionId) => {
        changeStudentAnswers(newAnswers, questionId);
    }

    const onChangePage = (numberPlusMinus) => {
        changeCurrentQuestion(pageNumber + numberPlusMinus);
        setPageNumber(pageNumber + numberPlusMinus);
     }

    const changeCurrentQuestion = (index) => {
        if (index === 0) {
            return;
        }

        setCurrentQuestion({...quizQuestions[index-1]});
        let answers = quizAnswers.filter(answer => {
            return answer.questionId === quizQuestions[index-1].id;
        }).map(answer => {
            const findAnswer = studentAnswers.find(studentAnswer => {
                return studentAnswer.id === answer.id;
            });

            return {
                ...answer,
                question: quizQuestions[index-1].question,
                pointsQuestion: quizQuestions[index-1].points,
                marked: (findAnswer !== undefined),
                student: quizInfo.student
            };
        });

        if (answers.length === 0 && quizQuestions[index-1].questionType === constants.QUESTION_TYPES.description)  {
            answers = [{...initialAnswer,
                        question: quizQuestions[index-1].question, 
                        marked: true, 
                        points: 0,
                        pointsQuestion: quizQuestions[index-1].points,
                        questionId: quizQuestions[index-1].id,
                        quizId: quizQuestions[index-1].quizId,
                        student: quizInfo.student
                    }];
        }
        setCurrentAnswers(answers);
    };

    const endQuiz = () => {
        studentAnswers.forEach(answer => {
            saveQuizResult({
                id: '',
                quizId: quizId,
                answerId: answer.id,
                questionId: answer.questionId,
                eventId: eventId,
                question: answer.question,
                answer: answer.answer,
                correct: answer.correct,
                points: answer.points,
                pointsQuestion: answer.pointsQuestion,
                student: answer.student,
                toCheck: answer.toCheck,
                imageLinkQuestion: answer.imageLinkQuestion
            });
        });

        navigate('/quiz-end');
    }

    return (
        <div className="main-container valign-wrapper">
            <div className="quiz-content container">
                <div className="row quiz-header">
                    <div style={{"textDecoration": "underline", "width":"70vh"}}><h5>{quizInfo.name}</h5></div>
                    <div className="col right-align"><i>{quizInfo.student}</i></div>
                </div>
                {pageNumber === 0 ?
                    <div className="page">
                        <div className="page-content">
                            <div className="row">
                                <div className="col s2">
                                    <h6>Subject</h6>
                                </div>
                                <div className="col s10">
                                    <h6>{quizInfo.subject}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s2">
                                    <h6>Topic</h6>
                                </div>
                                <div className="col s10">
                                    <h6>{quizInfo.topic}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s2">
                                    <h6>Year</h6>
                                </div>
                                <div className="col s10">
                                    <h6>{quizInfo.grade}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s2">
                                    <h6>Student name:</h6>
                                </div>
                                <div className="col s10">
                                    <input id="student" value={quizInfo.student} onChange={onChangeInput}/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <button className="waves-effect waves-light btn-large" onClick={onStartClick}>Start</button>
                        </div>
                    </div>
                :
                    <div>
                        {
                            pageNumber !== 0 && 
                            <QuizQuestion 
                                {...currentQuestion} 
                                quizId={quizId} 
                                eventId={eventId} 
                                pageNumber={pageNumber}
                                pages={quizQuestions.length}
                                onChangePage={onChangePage}
                                answers={currentAnswers}
                                changeStudentAnswers={changeStudentAnswers}
                                onChangeAnswer={onChangeAnswer}
                                endQuiz={endQuiz}
                            />
                        }
                    </div>
                }
            </div>
        </div>
    );
}

export { QuizStudent };