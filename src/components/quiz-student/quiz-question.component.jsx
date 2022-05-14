import { Fragment, useEffect, useState } from "react";
import { QuizAnswers } from "./quiz-answers.component";
import './quiz-question.style.css';

const QuizQuestion = (props) => {
    const [answers, setAnswers] = useState(props.answers);

    const onPrevPage = () => {
        props.onChangePage(-1, answers);
    };

    const onNextPage = () => {
        props.onChangePage(1);
    };

    const onChangeAnswer = (newAnswers) => {
        props.onChangeAnswer(newAnswers, props.id);
    }

    const onEndQuiz = () => {
        props.endQuiz();
    }

    useEffect(function onChangeProps() {
        setAnswers(props.answers);
        // eslint-disable-next-line
    }, [props.answers]);

    return (
        <Fragment>
            <div className="page">
                <div className="page-content">
                    <div className="row">
                        <div className="col">
                            {props.question}
                        </div>
                        <div className="col">
                            <span className="new badge blue" data-badge-caption="points">{props.points}</span>
                        </div>
                    </div>
                    <div className="answers">
                        <div className="answers-cotainer">
                            <QuizAnswers answers={answers} questionType={props.questionType} onChangeAnswer={onChangeAnswer}/>
                        </div>
                        <div className="picture-cotainer">
                            <img src={props.imageLink} style={{"width":"250px"}} alt="question"/>
                        </div>
                        
                    </div>
                </div>
                <div className="row action-bar">
                    <div className="col">
                        <button className="btn" onClick={onPrevPage}><i className="material-icons">navigate_before</i></button>
                    </div>
                    <div className="col">
                        {props.pageNumber} out of {props.pages}
                    </div>
                    <div className="align-right">
                        {props.pageNumber !== props.pages ?
                            <button className="btn"  onClick={onNextPage}><i className="material-icons">navigate_next</i></button>
                        :
                            <button className="waves-effect waves-light btn red"  onClick={onEndQuiz}><i className="material-icons right">cloud_upload</i>end</button>
                        }
                    </div>
                </div>

            </div>
        </Fragment>    
    );
}

export { QuizQuestion };