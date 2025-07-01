import styles from './СartAnswer.module.css';

interface Answer {
  id: number;
  id_question: number;
  answer: string | boolean[];
  isCorrect: boolean;
}

interface Question {
  id: number;
  title: string;
  type: string;
  options?: string[];
  correct: string | boolean[];
}

interface Props {
  answer: Answer;
  question: Question;
}

export const CartAnswer = ({ answer, question }: Props) => {
  const { answer: answerValue, isCorrect } = answer;
  const { title, type, options, correct } = question;

  const renderCheckboxAnswer = () => {
    if (!Array.isArray(answerValue) || !Array.isArray(correct) || !options)
      // eslint-disable-next-line curly
      return null;

    return (
      <div className={styles.answerGroup}>
        {options.map((opt, idx) => {
          const userChecked = answerValue[idx];
          const correctChecked = correct[idx];

          const isCorrectOption = userChecked === correctChecked;

          return (
            <div
              key={idx}
              className={`${styles.optionBox} ${
                isCorrectOption
                  ? styles.optionBoxCorrect
                  : styles.optionBoxIncorrect
              }`}
            >
              <span className={styles.icon}>{userChecked ? '✔️' : '❌'}</span>
              <span>{opt}</span>
            </div>
          );
        })}
      </div>
    );
  };

  const renderSimpleAnswer = () => (
    <>
      <div>
        <strong>Ответ пользователя:</strong> <span>{answerValue}</span>
      </div>
      <div>
        <strong>Правильный ответ:</strong> <span>{correct}</span>
      </div>
    </>
  );

  return (
    <div
      className={styles.card}
      style={{
        borderLeft: isCorrect ? '5px solid #52c41a' : '5px solid #ff4d4f',
        backgroundColor: isCorrect ? '#e6ffed' : '#fff1f0',
      }}
    >
      <div className={styles.status}>
        <strong>Вопрос:</strong> {title}
      </div>

      {type === 'checkbox' && options ? (
        <>
          <div>
            <strong>Варианты ответа:</strong>
            {renderCheckboxAnswer()}
          </div>
        </>
      ) : (
        renderSimpleAnswer()
      )}

      <div>
        <strong>Зачтено:</strong>{' '}
        <span className={isCorrect ? styles.correctText : styles.incorrectText}>
          {isCorrect ? 'Да' : 'Нет'}
        </span>
      </div>
    </div>
  );
};
