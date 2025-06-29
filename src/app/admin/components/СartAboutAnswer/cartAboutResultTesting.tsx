import { Link } from 'react-router-dom';
import styles from './cartResultTesting.module.css';

interface ResultTesting {
  id_foreman: number;
  fullName: string;
  dateOfTesting?: string;
  testing: boolean;
  success?: boolean;
}

const renderStatus = (testing: boolean, success?: boolean) => {
  if (!testing) {
    return <span className={styles.resСard__statNeutral}>не проходил</span>;
  }

  if (success) {
    return <span className={styles.resСard__statSuccess}>УСПЕШНО</span>;
  }

  return <span className={styles.resСard__statFail}>ПРОВАЛЕНО</span>;
};

export const CartAboutResultTesting = ({
  resultTesting,
}: {
  resultTesting: ResultTesting;
}) => {
  const { fullName, dateOfTesting, testing, success } = resultTesting;

  return (
    <div className={styles.resСard}>
      <div className={styles.resСard__stat} style={{ fontWeight: 'bold' }}>
        {fullName}
      </div>
      {dateOfTesting && (
        <div className={styles.resСard__stat}>
          Дата тестирования: {dateOfTesting}
        </div>
      )}
      <div className={styles.resСard__stat}>
        Статус: {renderStatus(testing, success)}
      </div>
      {testing && (
        <Link to={'/admin/testResult/' + resultTesting.id_foreman}>
          <button className={styles.resСard__button}>Подробнее</button>
        </Link>
      )}
    </div>
  );
};
