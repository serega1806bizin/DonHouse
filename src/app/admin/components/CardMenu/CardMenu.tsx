import { useRef } from 'react';
import styles from './CardMenu.module.css';
import { Link } from 'react-router-dom';
import { useClickOutside } from '../../../../hooks/useClickOutside';

interface CardMenuProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  editPath?: string;
  onDelete: () => void;
}

export const CardMenu = ({
  open,
  setOpen,
  editPath,
  onDelete,
}: CardMenuProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, () => setOpen(false));

  return (
    <div className={styles.menuWrapper} ref={ref}>
      <button
        className={styles.menuButton}
        onClick={() => setOpen(prev => !prev)}
      >
        <img src="/icons/dots.svg" alt="меню" />
      </button>

      {open && (
        <div className={styles.menu}>
          {editPath && (
            <Link to={editPath} className={`${styles.Btn} ${styles.editBtn}`}>
              Редактировать
            </Link>
          )}
          <button
            className={`${styles.Btn} ${styles.deleteBtn}`}
            onClick={onDelete}
          >
            Удалить
          </button>
        </div>
      )}
    </div>
  );
};
