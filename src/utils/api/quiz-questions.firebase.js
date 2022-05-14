import { db } from '../firebase/firebase';
import { collection, query, getDocs, addDoc, setDoc, doc, where, deleteDoc } from "firebase/firestore";
import { deleteAnswersByQuestion } from './quiz-question-answers.firebase';

const TABLE_NAME = 'quiz-questions';
const initialQuestion = {
    id: '',
    quizId: '',
    question: '',
    points: 0,
    type: '',
    imageLink: ''
};

const getQuizQuestions = async (id) => {
    const collectionRef = collection(db, TABLE_NAME);
    const q = query(collectionRef, where('quizId', '==', id));

    const querySnapshot = await getDocs(q);
    const quizesMap = querySnapshot.docs.map(quiz => {
        return quiz.data();
    }).sort(compareData);

    return quizesMap;    
}

const compareData = (a, b) => {
    return a.question > b.question ? 1 : -1;
};


const saveQuestion = async (record) => {
    let id = '';
    if (record.id === '') {
        const docRef = await addDoc(collection(db, TABLE_NAME), {question: record.question});
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

const deleteQuestion = async (id) => {
    await deleteDoc(doc(db, TABLE_NAME, id));
    //TO DO: delete answer records if any
    await deleteAnswersByQuestion(id);
    return true;
}

const deleteQuestionsByQuizId = async (quizId) => {
    getQuizQuestions(quizId)
        .then(res => {
            res.forEach(question => {
                deleteQuestion(question.id);
            });
        });
}

const getQuizMaxPoints = async (quizId) => {
    let points = 0;
    await getQuizQuestions(quizId)
        .then(res => {
            res.forEach(question => {
                points = points + question.points;
            });
        });
    return points;
}

export {getQuizQuestions, saveQuestion, deleteQuestion, deleteQuestionsByQuizId, getQuizMaxPoints, initialQuestion}