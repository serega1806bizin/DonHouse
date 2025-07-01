// src/pages/TestResultPage/TestResultPage.tsx

import { GoBack } from '../../components/Btns/GoBack';
import { CartAnswer } from '../../components/СartAnswer/СartAnswer';
import style from './testResultPage.module.css';

const inputData = {
  fullName: 'Михаил Зубенко',
  success: false,

  answers: [
    {
      id: 1,
      id_question: 1,
      answer: 'Ответ 1',
      isCorrect: true,
    },
    {
      id: 2,
      id_question: 2,
      answer: [true, true, true, false],
      isCorrect: true,
    },
    {
      id: 3,
      id_question: 3,
      answer: 'Ответ 2',
      isCorrect: false,
    },
  ],

  questions: [
    {
      id: 1,
      title: 'Вопрос 1',
      type: 'text', // ✅ должно быть "text"
      correct: 'Ответ 1',
    },
    {
      id: 2,
      title: 'Выберите цифры',
      type: 'checkbox', // ✅
      options: ['5', '7', '8', 'а'],
      correct: [true, true, true, false],
    },
    {
      id: 3,
      title: 'Вопрос 3',
      type: 'text',
      correct: 'Ответ 3',
    },
  ],
};

export const TestResultPage = () => {
  return (
    <div className={style.testResultPage}>
      <header className={style.header}>
        <h1 className={style.title}>Результат</h1>
        <GoBack />
      </header>

      <div className={style.result}>{inputData.fullName}</div>

      <div className={style.result}>
        Статус:{' '}
        <b style={{ color: inputData.success ? 'green' : 'red' }}>
          {inputData.success ? 'УСПЕХ' : 'ПРОВАЛЕНО'}
        </b>
      </div>

      <div className={style.answers}>
        {inputData.answers.map(answer => {
          const question = inputData.questions.find(
            q => q.id === answer.id_question,
          );

          if (!question) {
            return null;
          }

          return (
            <CartAnswer key={answer.id} answer={answer} question={question} />
          );
        })}
      </div>
    </div>
  );
};
