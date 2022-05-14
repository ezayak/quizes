import React, { useEffect, useState } from "react";
import { QuizAddRow } from "../../components/quiz/quiz-add-row.component";
import { QuizRow } from "../../components/quiz/quiz-row.component";
import './quiz-list.styles.css';
import { getAllQuizes, addQuiz, deleteQuiz } from "../../utils/api/quizes.firebase";

const QuizList = () => {
    const [quizList, setQuizList] = useState([]);
    const [addQuizVisibility, setAddQuizVisibility] = useState(false);

    const loadQuizes = () => {
        getAllQuizes()
            .then(res => {
                setQuizList(res);
            })
    }

    const showQuizAddRow = () => {
        setAddQuizVisibility(true);
    }

    const hideQuizAddRow = () => {
        setAddQuizVisibility(false);
    }

    useEffect(function onLoad(){
        loadQuizes();
        // eslint-disable-next-line
    }, [])

    /**Working with quizes */
    const addQuizToDB = async (data) => {
        setAddQuizVisibility(false);
        addQuiz(data)
            .then(() => {
                loadQuizes();
            });
    }

    const onDeleteQuiz = async (id) => {
        deleteQuiz(id)
            .then(() => {
                loadQuizes();
            })
    }

    /** */
    return (
        <div className="content quiz-list-container">
            <table className="highlight">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Subject</th>
                        <th>Topic</th>
                        <th>Grade</th>
                        <th>
                            <button className="btn waves-effect waves-light btn-small" onClick={showQuizAddRow}>ADD QUIZ</button>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {addQuizVisibility && <QuizAddRow addQuiz={addQuizToDB} hide={hideQuizAddRow} />}
                    {quizList.length ?
                        quizList.map(quiz => {
                            return <QuizRow key={quiz.id} {...quiz} deleteQuiz={onDeleteQuiz}/> 
                        })
                    : null
                    }
                </tbody>
            </table>
        </div>
    );
}

export { QuizList };