import { db } from '../firebase/firebase';
import { collection, query, getDocs, addDoc, setDoc, doc, where, deleteDoc } from "firebase/firestore";

const TABLE_NAME = 'quiz-result';
const initialResult = {
    id: '',
    quizId: '',
    questionId: '',
    answerId: '',
    eventId: '',
    question: '',
    answer: '',
    correct: '',
    points: 0,
    pointsQuestion: 0,
    student: '',
    toCheck: false,
    imageLinkQuestion: ''
};

const getQuizEventResults = async (id) => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef, where('eventId', '==', id));

    const querySnapshot = await getDocs(q);
    const quizesMap = querySnapshot.docs.map(quiz => {
        return quiz.data();
    });

    return quizesMap;    
}


const saveQuizResult = async (record) => {
    let id = '';
    
    if (record.id === '') {
        const docRef = await addDoc(collection(db, TABLE_NAME), {id: 'new'});
        id = docRef.id;
    } else {
        id = record.id;
    }
    
    await setDoc(doc(db, TABLE_NAME, id), {
        ...record,
        id: id
    });

    return id;
}

const deleteQuizEventResult = async (id) => {
    await deleteDoc(doc(db, TABLE_NAME, id));
    return true;
}

const deleteQuizResults = async (quizEventId) => {
    await getQuizEventResults(quizEventId)
        .then(res => {
            res.forEach(result => {
                deleteQuizEventResult(result.id);
            })
        })
}

export {initialResult, saveQuizResult, deleteQuizResults, deleteQuizEventResult, getQuizEventResults};