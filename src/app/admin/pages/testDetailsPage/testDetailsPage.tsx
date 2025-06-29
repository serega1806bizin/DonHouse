import { GoBack } from '../../components/Btns/GoBack';
// eslint-disable-next-line max-len
import { CartAboutResultTesting } from '../../components/СartAboutAnswer/cartAboutResultTesting';
import styles from './testDetailsPage.module.css';
const testResult = {
  dateCreated: '2025-06-01',
  answers: [
    {
      id_foreman: 1,
      fullName: 'Иванов Иван Иванович',
      dateOfTesting: '2025-06-01',
      testing: true,
      success: true,
    },
    {
      id_foreman: 2,
      fullName: 'Петров Пётр Петрович',
      dateOfTesting: '2025-06-02',
      testing: true,
      success: false,
    },
    {
      id_foreman: 3,
      fullName: 'Сидорова Анна Михайловна',
      testing: false,
    },
    {
      id_foreman: 4,
      fullName: 'Кузнецов Алексей Сергеевич',
      testing: true,
      success: true,
      dateOfTesting: '2025-06-04',
    },
    {
      id_foreman: 5,
      fullName: 'Морозова Елена Викторовна',
      testing: true,
      success: false,
      dateOfTesting: '2025-06-06',
    },
    {
      id_foreman: 6,
      fullName: 'Васильев Дмитрий Андреевич',
      testing: false,
    },
    {
      id_foreman: 7,
      fullName: 'Фёдорова Ольга Ивановна',
      testing: true,
      success: true,
      dateOfTesting: '2025-06-07',
    },
    {
      id_foreman: 8,
      fullName: 'Новиков Сергей Павлович',
      testing: true,
      success: false,
      dateOfTesting: '2025-06-08',
    },
    {
      id_foreman: 9,
      fullName: 'Егорова Татьяна Алексеевна',
      testing: false,
    },
    {
      id_foreman: 10,
      fullName: 'Мельников Роман Николаевич',
      testing: true,
      success: true,
      dateOfTesting: '2025-06-10',
    },
  ],
};

export const TestDetailsPage = () => {
  return (
    <div className={styles.testDetailsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Тест</h1>
        <GoBack />
      </header>
      <span>Дата создания: {testResult.dateCreated}</span>
      {testResult.answers.map(answer => (
        <CartAboutResultTesting
          key={answer.id_foreman}
          resultTesting={answer}
        />
      ))}
    </div>
  );
};
