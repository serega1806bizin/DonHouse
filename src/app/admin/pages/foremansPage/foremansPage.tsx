import { useState, useMemo } from 'react';
import { Input } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined } from '@ant-design/icons';
import { GoHome } from '../../components/Btns/GoHome';
import styles from './foremansPage.module.css';
import { useDebounce } from '../../../../hooks/useDebounce';
// eslint-disable-next-line max-len
import { ForemanCard } from '../../components/СartAboutForeman/СartAboutForeman';
import { RegisterForeman } from '../../modals/RegisterForeman/RegisterForeman';

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

const foremans: Foreman[] = [
  {
    id: 1,
    fullName: 'Дмитрий Мелсон',
    telegram: '@tg_melson',
    phone: '+7 (270) 555-01-17',
    otherContacts: 'раб. почта: melson@company.ru',
    code: 3536,
    countProjects: 5,
    sumOfFines: 4785,
  },
  {
    id: 2,
    fullName: 'Михаил Зубенко',
    phone: '+7 (999) 123-45-67',
    code: 9821,
    countProjects: 3,
    sumOfFines: 1500,
  },
  {
    id: 3,
    fullName: 'Андрей Задорожний',
    telegram: '@zadro_and',
    otherContacts: 'WhatsApp: +7 900 555-55-55',
    code: 7412,
    countProjects: 2,
    sumOfFines: 0,
  },
  {
    id: 4,
    fullName: 'Замира Ильяшова',
    otherContacts: 'раб. тел: +7 777 777-77-77',
    code: 6200,
    countProjects: 4,
    sumOfFines: 940,
  },
  {
    id: 5,
    fullName: 'Константин Фролов',
    telegram: '@kostya_build',
    code: 1122,
    countProjects: 7,
    sumOfFines: 20300,
  },
];

export const ForemansPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);
  const [openModal, setOpenModal] = useState(false);

  const filteredForemans = useMemo(() => {
    return foremans.filter(foreman =>
      foreman.fullName.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  return (
    <div className={styles.foremansPage}>
      {openModal && <RegisterForeman onClose={() => setOpenModal(false)} />}
      <header className={styles.header}>
        <h1 className={styles.title}>Прорабы</h1>
        <div className={styles.header__btns}>
          <img
            onClick={() => setOpenModal(true)}
            src="/icons/add.svg"
            alt="добавить"
          />
          <GoHome />
        </div>
      </header>

      <Input
        placeholder="Поиск по имени.."
        prefix={<SearchOutlined />}
        value={searchValue}
        onChange={e => setSearchValue(e.target.value)}
        style={{
          width: '100%',
          marginBottom: '20px',
          borderRadius: '15px',
          height: '40px',
        }}
      />

      {filteredForemans.length > 0 ? (
        filteredForemans.map(foreman => (
          <ForemanCard key={foreman.id} foreman={foreman} />
        ))
      ) : (
        <p style={{ color: 'gray' }}>Нет совпадений</p>
      )}
    </div>
  );
};
