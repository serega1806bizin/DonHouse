import classNames from 'classnames';
import styles from './BusyMasterOption.module.css';

type Master = {
  id: number;
  fullName: string;
  isBusy: boolean;
};

interface Props {
  master: Master;
  onSelect: (id: number) => void;
}

export const BusyMasterOption = ({ master, onSelect }: Props) => {
  return (
    <div key={master.id} className={styles.busyOption}>
      <p className={styles.busyOption__FullName}>{master.fullName}</p>
      <p className={styles.notification}>Этот мастер занят на данное время</p>
      <div className={styles.busyOption__Actions}>
        <button
          onClick={() => alert('Обратитесь к технадзору.')}
          className={styles.button}
          type="button"
        >
          Поговорить с технадзором
        </button>
        <button
          onClick={() => onSelect(master.id)}
          className={classNames(styles.primaryButton, styles.button)}
          type="button"
        >
          Все равно выбрать
        </button>
      </div>
    </div>
  );
};
