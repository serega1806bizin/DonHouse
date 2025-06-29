/* eslint-disable no-console */
import { useState } from 'react';
import styles from './cartAboutTest.module.css';
import { Link } from 'react-router-dom';
import { message } from 'antd';
import { CardMenu } from '../CardMenu/CardMenu';

interface Test {
  id: number;
  dateCreated: string;
  totalAttempts: number;
  passed: number;
  failed: number;
  notTaken: number;
}

export const CartAboutTest = ({ test }: { test: Test }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const onRemove = () => {
    console.log('Удаление теста');
    message.success('Тест удален');
    setMenuOpen(false);
  };

  return (
    <div className={styles.testСard}>
      <div className={styles.testСard__header}>
        <span>Дата создания: {test.dateCreated}</span>
        <CardMenu
          open={menuOpen}
          setOpen={setMenuOpen}
          onDelete={onRemove}
          editPath={`/admin/editingTest/${test.id}`}
        />
      </div>

      <div className={styles.testСard__stat}>
        Всего пройдено: {test.totalAttempts}
      </div>
      <div className={styles.testСard__stat}>Успешно: {test.passed}</div>
      <div className={styles.testСard__stat}>Провалено: {test.failed}</div>
      <div className={styles.testСard__stat}>Не сдано: {test.notTaken}</div>
      <Link to={'/admin/testDetails/' + test.id}>
        <button className={styles.testСard__button}>Подробнее</button>
      </Link>
    </div>
  );
};
