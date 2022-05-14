import { db } from '../firebase/firebase';
import { collection, query, getDocs, addDoc, setDoc, doc, where, getDoc, deleteDoc } from "firebase/firestore";

const TABLE_NAME = 'quiz-question-answers';
const initialAnswer = {
    id: '',
    questionId: '',
    answer: '',
    points: 0,
    correct: false,
    imageLink: ''
};

const getQuestionAnswers = async (id) => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef, where('questionId', '==', id));

    const querySnapshot = await getDocs(q);
    const quizesMap = querySnapshot.docs.map(quiz => {
        return quiz.data();
    });

    return quizesMap;    
}

const getQuizAnswers = async (id) => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef, where('quizId', '==', id));

    const querySnapshot = await getDocs(q);
    const quizesMap = querySnapshot.docs.map(quiz => {
        return quiz.data();
    });

    return quizesMap;    
}

const saveAnswer = async (record) => {
    let id = '';
    if (record.id === '') {
        const docRef = await addDoc(collection(db, TABLE_NAME), {answer: record.answer});
        id = docRef.id;
    } else {
        id = record.id;
    }
    
    await setDoc(doc(db, TABLE_NAME, id), {
        ...record,
        points: +record.points,
        id: id
    });

    return id;
}

const deleteAnswer = async (id) => {
    await deleteDoc(doc(db, TABLE_NAME, id));
    return true;
}

const deleteAnswersByQuestion = async (questionId) => {
    await getQuestionAnswers(questionId)
        .then(res => {
            res.forEach(answer => {
                deleteAnswer(answer.id);
            })
        });
}

export { getQuestionAnswers, saveAnswer, deleteAnswer, getQuizAnswers, deleteAnswersByQuestion, initialAnswer }