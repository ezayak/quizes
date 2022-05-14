import { Route, Routes } from 'react-router-dom';
import { QuizList } from './routes/quiz-list/quiz-list.component';
import { Navbar } from './routes/navigation/navbar.component';
import { Fragment } from 'react';
import { QuizEdit } from './routes/quiz-edit/quiz-edit.component';
import { QuizStudent } from './routes/quiz-student/quiz-student.component';
import { QuizEnd } from './routes/quiz-student/quiz-end.component';
import { QuizCheck } from './routes/quiz-check/quiz-check.component';

function App() {
  return (
    <Fragment>
      <Routes>
          <Route path='/' element={<Navbar />}>
              <Route index element={<QuizList />} />
              <Route path='/quiz-edit/:id' element={<QuizEdit />} />
              <Route path='/quiz-check/:eventId' element={<QuizCheck />} />
          </Route>
          <Route path='/quiz-student/:quizId/:eventId' element={<QuizStudent />} />
          <Route path='/quiz-end' element={<QuizEnd />} />
      </Routes>
    </Fragment>
  );
}

export default App;
