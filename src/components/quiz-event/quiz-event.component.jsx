import { useEffect, useState } from 'react';
import * as dbQuizEvents from '../../utils/api/quiz-events.firebase';
import './quiz-event.style.css';
import { QuizEventRow } from './quiz-event-row.component';
import { QuizEventAdd } from './quiz-event-add.component';

const QuizEvent = ({quizId}) => {
    const [quizEvents, setQuizEvents] = useState([]);
    const [newEventVisible, setNewEventVisible] = useState(false);

    const loadQuizEvents = () => {
        dbQuizEvents.getAllQuizEvents(quizId)
            .then(res => {
                setQuizEvents(res);
            })
    };

    useEffect(function onLoad() {
        loadQuizEvents();
        // eslint-disable-next-line
    },[]);

    const onSaveEvent = (record) => {
        const isNewRecord = record.id === '';
        dbQuizEvents.saveQuizEvent(record)
            .then((id) => {
                if (isNewRecord) {
                    setQuizEvents([
                        ...quizEvents,
                        {...record, id}
                    ])
                } else {
                    setQuizEvents(quizEvents.map(quizEvent => {
                        if (quizEvent.id === record.id) {
                            return record;
                        } else {
                            return quizEvent;
                        }
                    }));
                }
            });
    }

    const onAddEvent = () => {
        setNewEventVisible(true);
    }

    const onHideNewEvent = () => {
        setNewEventVisible(false);
    };

    const onDeleteEvent = (eventId) => {
        dbQuizEvents.deleteQuizEvent(eventId)
            .then(() => {
                setQuizEvents(quizEvents.filter(quizEvent => {
                    return quizEvent.id !== eventId;
                }));
            });
    }

    return (
        <tr>
            <td colSpan="5">
                <div className="quiz-date-container">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Done</th>
                                <th>Checked</th>
                                <th>Results</th>
                                <th><button className="waves-effect waves-light btn-small" onClick={onAddEvent}>Add quiz event</button></th>
                            </tr>
                        </thead>
                        <tbody>
                            {newEventVisible && <QuizEventAdd  save={onSaveEvent} hide={onHideNewEvent} quizId={quizId}/>}
                            {quizEvents.map(quizEvent => {
                                return <QuizEventRow key={quizEvent.id} {...quizEvent} save={onSaveEvent} deleteEvent={onDeleteEvent}/>
                            })}
                        </tbody>
                    </table>
                </div>
            </td>
        </tr>
    );
}

export {QuizEvent};