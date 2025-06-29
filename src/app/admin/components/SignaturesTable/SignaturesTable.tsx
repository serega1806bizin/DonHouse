import styles from './signaturesTable.module.css';

interface Signature {
  id: number;
  foreman: string;
  date?: string;
  isSigned: boolean;
}

export const SignaturesTable = ({
  signatures,
}: {
  signatures: Signature[];
}) => {
  return (
    <div className={styles.table}>
      <div className={styles.header}>
        <span>Имя фамилия</span>
        <span>Дата</span>
        <span>Статус</span>
      </div>

      {signatures.map(sig => (
        <div key={sig.id} className={styles.row}>
          <span>{sig.foreman}</span>
          <span>
            {sig.isSigned && sig.date ? (
              sig.date
            ) : (
              <span className={styles.noDate}>—</span>
            )}
          </span>
          <span>{sig.isSigned ? '✅' : '❌'}</span>
        </div>
      ))}
    </div>
  );
};
