// eslint-disable-next-line max-len
import { GoBack } from '../../components/Btns/GoBack';
// eslint-disable-next-line max-len
import { SignaturesTable } from '../../components/SignaturesTable/SignaturesTable';
import styles from './signaturesPage.module.css';
const signatures = [
  {
    id: 1,
    foreman: 'Михаил Зубенко',
    date: '15.06.2025',
    isSigned: true,
  },
  {
    id: 2,
    foreman: 'Замир Ильяшов',
    isSigned: false,
  },
  {
    id: 3,
    foreman: 'Анастасия Орлова',
    date: '12.06.2025',
    isSigned: true,
  },
  {
    id: 4,
    foreman: 'Артем Соколов',
    isSigned: false,
  },
  {
    id: 5,
    foreman: 'Ольга Воронцова',
    isSigned: false,
  },
  {
    id: 6,
    foreman: 'Роман Ефимов',
    date: '18.06.2025',
    isSigned: true,
  },
  {
    id: 7,
    foreman: 'Елена Щербакова',
    isSigned: false,
  },
];

export const SignaturesPage = () => {
  return (
    <div className={styles.signaturesPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Подписи</h1>
        <GoBack />
      </header>
      <SignaturesTable signatures={signatures} />
    </div>
  );
};
