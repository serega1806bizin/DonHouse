/* eslint-disable no-console */
import { useRef, useState } from 'react';
import styles from './cartAboutTest.module.css';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { Link } from 'react-router-dom';
import { message } from 'antd';

interface Test {
  id: number;
  dateCreated: string;
  totalAttempts: number;
  passed: number;
  failed: number;
  notTaken: number;
}

const onRemove = () => {
  console.log('Удаление теста');
  message.success('Тест удален');
};

export const CartAboutTest = ({ test }: { test: Test }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useClickOutside(ref, () => setMenuOpen(false));

  return (
    <div className={styles.testСard}>
      <div className={styles.testСard__header}>
        <span>Дата создания: {test.dateCreated}</span>
        <div className={styles.testCard__menuWrapper} ref={ref}>
          <button
            className={styles.testСard__menuButton}
            onClick={() => setMenuOpen(prev => !prev)}
          >
            <img src="/icons/dots.svg" alt="меню" />
          </button>

          {menuOpen && (
            <div className={styles.testCard__menu}>
              <Link
                to={'/admin/testDetails/' + test.id}
                className={`${styles.Btn} ${styles.editBtn}`}
              >
                Редактировать
              </Link>
              <button
                className={`${styles.Btn} ${styles.deleteBtn}`}
                onClick={onRemove}
              >
                Удалить
              </button>
            </div>
          )}
        </div>
      </div>

      <div className={styles.testСard__stat}>
        Всего пройдено: {test.totalAttempts}
      </div>
      <div className={styles.testСard__stat}>Успешно: {test.passed}</div>
      <div className={styles.testСard__stat}>Провалено: {test.failed}</div>
      <div className={styles.testСard__stat}>Не сдано: {test.notTaken}</div>
      <button className={styles.testСard__button}>Подробнее</button>
    </div>
  );
};
