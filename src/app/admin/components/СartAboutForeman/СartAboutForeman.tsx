import { useState } from 'react';
import { CardMenu } from '../CardMenu/CardMenu';
import { message } from 'antd';
import { CopyToClipboardIcon } from '../Copy/Copy';
import { Link } from 'react-router-dom';
import styles from './СartAboutForeman.module.css';

interface Foreman {
  id: number;
  fullName: string;
  telegram?: string;
  phone?: string;
  otherContacts?: string;
  code: number;
  countProjects: number;
  sumOfFines: number;
}

export const ForemanCard = ({ foreman }: { foreman: Foreman }) => {
  const hasContacts =
    foreman.telegram || foreman.phone || foreman.otherContacts;

  const [menuOpen, setMenuOpen] = useState(false);

  const onRemove = () => {
    message.success('Прораб удален из системы');
    setMenuOpen(false);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.fullName}>{foreman.fullName}</span>
        <CardMenu
          open={menuOpen}
          setOpen={setMenuOpen}
          onDelete={onRemove}
          editPath={`/admin/editingForeman/${foreman.id}`}
        />
      </div>

      {hasContacts && (
        <div className={styles.contacts}>
          {foreman.telegram && (
            <div className={styles.line}>
              <a
                href={`https://t.me/${foreman.telegram.slice(1)}`}
                className={styles.telegram}
              >
                {foreman.telegram}
              </a>
              <CopyToClipboardIcon text={foreman.telegram} />
            </div>
          )}

          {foreman.phone && <div className={styles.line}>{foreman.phone}</div>}

          {foreman.otherContacts && (
            <div className={styles.line}>{foreman.otherContacts}</div>
          )}
        </div>
      )}

      <div className={styles.line}>Код доступа: {foreman.code}</div>
      <div className={styles.line}>
        Количество проектов: {foreman.countProjects}
      </div>
      <div className={styles.line}>
        Сумма штрафов: {foreman.sumOfFines} рублей
      </div>
      <Link to={'/admin/fines/foreman/' + foreman.id}>
        <button className={styles.finesButton}>Все штрафы по прорабу</button>
      </Link>
    </div>
  );
};
