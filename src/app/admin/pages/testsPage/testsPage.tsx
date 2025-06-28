import { GoBack } from '../../components/Btns/GoBack';
import { CartAboutTest } from '../../components/cartAboutTest/cartAboutTest';
import styles from './testsPage.module.css';
interface Test {
  id: number;
  dateCreated: string;
  totalAttempts: number;
  passed: number;
  failed: number;
  notTaken: number;
}

const tests: Test[] = [
  {
    id: 1,
    dateCreated: '2025-04-15',
    totalAttempts: 15,
    passed: 10,
    failed: 5,
    notTaken: 3,
  },
  {
    id: 2,
    dateCreated: '2025-04-25',
    totalAttempts: 20,
    passed: 14,
    failed: 6,
    notTaken: 2,
  },
  {
    id: 3,
    dateCreated: '2025-05-05',
    totalAttempts: 12,
    passed: 9,
    failed: 3,
    notTaken: 1,
  },
  {
    id: 4,
    dateCreated: '2025-06-01',
    totalAttempts: 18,
    passed: 12,
    failed: 6,
    notTaken: 0,
  },
  {
    id: 5,
    dateCreated: '2025-06-20',
    totalAttempts: 22,
    passed: 16,
    failed: 6,
    notTaken: 1,
  },
];

export const TestsPage = () => {
  return (
    <div className={styles.testsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Тесты</h1>
        <GoBack />
      </header>
      {tests.map(test => (
        <CartAboutTest key={test.id} test={test} />
      ))}
    </div>
  );
};
