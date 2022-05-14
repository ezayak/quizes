import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Preloader } from '../../components/common/preloader.component';
import { Student } from "../../components/quiz-results/student.component";
import { getQuizEventByID } from "../../utils/api/quiz-events.firebase";
import { getQuizByID, initialQuizData } from "../../utils/api/quizes.firebase";
import { getQuizMaxPoints } from "../../utils/api/quiz-questions.firebase";
import { getQuizEventResults } from "../../utils/api/quiz-result.firebase";

const QuizCheck = () => {
    const {eventId} = useParams();
    const [quizData, setQuizData] = useState(initialQuizData);
    const [quizResults, setQuizResults] = useState([]);
    const [students, setStudents] = useState([]);
    const [maxPoints, setMaxPoints] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(function onLoad() {
        getQuizEventByID(eventId)
            .then(res => {
                getQuizByID(res.quizId)
                    .then(quiz => {
                        getQuizMaxPoints(res.quizId)
                            .then(maxPoints => {
                                setMaxPoints(maxPoints);
                                setQuizData({
                                    ...quiz,
                                    points: maxPoints
                                });
        
                                getQuizEventResults(eventId)
                                    .then(results => {
                                        console.log('results', results);
                                        setQuizResults(results.sort(compareQuestions));
                                        getStudentData(results, maxPoints);
                                        setLoading(false);
                                    });
                            });

                    })
            });
        // eslint-disable-next-line
    }, []);

    const getStudentData = (res, maxPoints) => {
        const _students = []
        
        res.forEach(element => {
            const findStudent = _students.find(res => {
                return res.student === element.student;
            });

            if (findStudent) {
                findStudent.points = findStudent.points + element.points;
                findStudent.toCheck = findStudent.toCheck || element.toCheck;
            } else {
                _students.push({
                    student: element.student,
                    points: element.points,
                    maxPoints: maxPoints,
                    toCheck: element.toCheck
                });
            }
        });
        
        setStudents(_students.sort(compareStudents));
    }

    const compareStudents = (a, b) => {
        return a.student > b.student ? 1 : -1;
    };

    const compareQuestions = (a, b) => {
        return a.question > b.question ? 1 : -1;
    };    
    const onChangeAnswer = (answer) => {
        const _quizResults = [...quizResults];
        const findResult = _quizResults.find(result => {
            return result.id === answer.id;
        });

        findResult.points = answer.points;
        findResult.correct = answer.correct;
        findResult.toCheck = answer.toCheck;
        setQuizResults(_quizResults);
        getStudentData(_quizResults, maxPoints);
    }

    return (
        <div className="content">
            {loading ? <Preloader />
            :
                <Fragment>
                    <div className="row">
                        <h5 className="col-75">Name: {quizData.name}</h5>
                        <h5 className="col">Year: {quizData.grade}</h5>
                        <h5 className="col">Subject: {quizData.subject}</h5>
                        <h5 className="col">{quizData.date}</h5>
                        <div className="back-button"><Link to="/" className="col l2"><i className="material-icons left">arrow_back</i> Back to quizes</Link></div>
        
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Points</th>
                                <th>Max points</th>
                                <th>To check</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map(student => {
                                    return <Student key={student.student} {...student} answers={quizResults} onChangeAnswer={onChangeAnswer}/>
                                })
                            }
                        </tbody>
                    </table>
                </Fragment>
            }
        </div>
    );
}

export { QuizCheck };