import styles from './AvailableMasterOption.module.css';

type Master = {
  id: number;
  fullName: string;
  isBusy: boolean;
};

interface Props {
  master: Master;
  onSelect: (id: number) => void;
}

export const AvailableMasterOption = ({ master, onSelect }: Props) => {
  return (
    <div
      key={master.id}
      className={styles.option}
      onClick={() => onSelect(master.id)}
      role="button"
      tabIndex={0}
      onKeyDown={e => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(master.id);
        }
      }}
    >
      {master.fullName}
    </div>
  );
};
