/* eslint-disable no-console */
import { Button, message } from 'antd';
import styles from './FineCard.module.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// eslint-disable-next-line @typescript-eslint/naming-convention
type typeFail = 'warning' | 'fine';

type Fail = {
  id: number;
  title: string;
  type: typeFail;
  date: string;
  amoun?: number;
  paid?: boolean;
};

interface Props {
  fail: Fail;
}

const setFinePaid = (id: number) => {
  console.log('Оплачено', id);
  message.success('Оплачено');
};

export const FineCard = ({ fail }: Props) => {
  const [paid, setPaid] = useState(false);

  const handleClick = () => {
    setPaid(true);
    setFinePaid(fail.id);
  };

  return (
    <div className={styles.cardWrapper}>
      <div className={styles.date}>{fail.date}</div>

      <div className={styles.card}>
        <div className={styles.topRow}>
          <div className={styles.title}>{fail.title}</div>

          {fail.type === 'warning' ? (
            <div className={styles.labelWarning}>Предупреждение</div>
          ) : (
            <div className={styles.amount}>{fail.amoun}₽</div>
          )}
        </div>

        <div className={styles.buttons}>
          {fail.type === 'warning' ? (
            <Link
              to={'/admin/fines/details/' + fail.id}
              className={styles.link}
            >
              <Button type="primary" className={styles.fullWidthBtn}>
                Подробнее
              </Button>
            </Link>
          ) : (
            <>
              <Link
                to={'/admin/fines/details/' + fail.id}
                className={styles.halfWidthBtn}
              >
                Подробнее
              </Link>

              {fail.paid ? (
                <div className={styles.paid}>Оплачен</div>
              ) : (
                <Button
                  className={styles.halfWidthBtnYellow}
                  onClick={handleClick}
                  disabled={paid}
                >
                  {paid ? 'Оплачен' : 'Обозначить оплаченным'}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
