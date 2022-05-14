import { db } from '../firebase/firebase';
import { collection, query, getDocs, addDoc, setDoc, doc, where, deleteDoc, Timestamp } from "firebase/firestore";
import { timeStampToDate } from '../common/dateTimeFormat';
import { deleteQuizResults } from './quiz-result.firebase';

const TABLE_NAME = 'quiz-event';
const initialEvent = {
    id: '',
    quizId: '',
    done: '',
    checked: '',
    showResult: false
};

const getAllQuizEvents = async (quizId) => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef, where('quizId','==',quizId));

    const querySnapshot = await getDocs(q);
    const quizesMap = querySnapshot.docs.map(quiz => {
        const quizData = quiz.data();
        return {
            ...quizData,
            date: timeStampToDate(quizData.date)
        };
    }).sort(compareData);

    return quizesMap;
}

const getQuizEventByID = async (id) => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        return initialEvent;
    } else {
        const quizRecord = querySnapshot.docs[0].data();
        return {
            ...quizRecord,
            date: timeStampToDate(quizRecord.date)
        };
    }
}

const compareData = (a, b) => {
    return a.date > b.date ? 1 : -1;
};

const saveQuizEvent = async (record) => {
    let id = '';
    
    if (record.id === '') {
        const docRef = await addDoc(collection(db, TABLE_NAME), {id: 'new'});
        id = docRef.id;
    } else {
        id = record.id;
    }
    
    await setDoc(doc(db, TABLE_NAME, id), {
        ...record,
        date: Timestamp.fromDate(new Date(record.date)),
        id: id
    });

    return id;
}

const deleteQuizEvent = async (id) => {
    await deleteDoc(doc(db, TABLE_NAME, id));
    await deleteQuizResults(id);
    return true;
}

const deleteQuizEventsByQuizId = async (quizId) => {
    getAllQuizEvents(quizId)
        .then(res => {
            res.forEach(quizEvent => {
                deleteQuizEvent(quizEvent.id);
            })
        })
}

export {getAllQuizEvents, saveQuizEvent, deleteQuizEvent, deleteQuizEventsByQuizId, getQuizEventByID};