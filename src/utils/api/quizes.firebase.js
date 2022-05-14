import { db } from '../firebase/firebase';
import { collection, query, getDocs, addDoc, setDoc, doc, where, deleteDoc } from "firebase/firestore";
import { deleteQuestionsByQuizId } from './quiz-questions.firebase';
import { deleteQuizEventsByQuizId } from './quiz-events.firebase';

const TABLE_NAME = 'quizes';
const initialQuizData = {
    name: '',
    subject: '',
    topic: '',
    grade: '',
    id: ''
};

const getAllQuizes = async () => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const quizesMap = querySnapshot.docs.map(quiz => {
        return quiz.data();
    }).sort(compareData);

    return quizesMap;
}

const getQuizByID = async (id) => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef, where('id', '==', id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.docs.length === 0) {
        return initialQuizData;
    } else {
        return querySnapshot.docs[0].data();
    }
}

const addQuiz = async (record) => {
    let id = '';

    if (record.id === '') {
        const docRef = await addDoc(collection(db, TABLE_NAME), {name: record.name});
        id = docRef.id;
    } else {
        id = record.id;
    }
    
    return setDoc(doc(db, TABLE_NAME, id), {
        ...record,
        id: id
    });

}

const compareData = (a, b) => {
    return a.name > b.name ? 1 : -1;
};


const deleteQuiz = async (id) => {
    await deleteDoc(doc(db, TABLE_NAME, id));
    //TO DO: delete quiz questions if any
    await deleteQuestionsByQuizId(id);
    //TO DO: delete quiz events if any
    await deleteQuizEventsByQuizId(id);
    return true;
}

export { getAllQuizes, addQuiz, getQuizByID, deleteQuiz, initialQuizData };