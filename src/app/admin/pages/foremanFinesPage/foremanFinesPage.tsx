import { useMemo, useState } from 'react';
import { useDebounce } from '../../../../hooks/useDebounce';
import { GoHome } from '../../components/Btns/GoHome';
import styles from './foremanFinesPage.module.css';
import { Input } from 'antd';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SearchOutlined } from '@ant-design/icons';
import { FineCard } from '../../components/FineCard/FineCard';
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

interface Delinquent {
  fullName: string;
  fails: Fail[];
}

const delinquent: Delinquent = {
  fullName: 'Johgdfgdfgn Doe',
  fails: [
    {
      id: 1,
      title: 'Late submission',
      type: 'warning',
      date: '2025-06-20',
    },
    {
      id: 2,
      title: 'Missed deadline',
      type: 'fine',
      date: '2025-06-21',
      amoun: 100,
      paid: false,
    },
    {
      id: 3,
      title: 'Improper conduct',
      type: 'warning',
      date: '2025-06-22',
    },
    {
      id: 4,
      title: 'Violation of dress code',
      type: 'fine',
      date: '2025-06-23',
      amoun: 50,
      paid: true,
    },
    {
      id: 5,
      title: 'Missed deadline',
      type: 'fine',
      date: '2025-06-21',
      amoun: 100,
      paid: false,
    },
  ],
};

export const ForemanFinesPage = () => {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 300);

  const filteredFails = useMemo(() => {
    return delinquent.fails.filter(fail =>
      fail.title.toLowerCase().includes(debouncedSearch.toLowerCase()),
    );
  }, [debouncedSearch]);

  return (
    <div className={styles.foremanFinesPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Штрафы</h1>
        <GoHome />
      </header>
      <p className={styles.text}>{delinquent.fullName}</p>
      <Input
        placeholder="Поиск по названию.."
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
      {filteredFails.length > 0 ? (
        filteredFails.map(fail => <FineCard key={fail.id} fail={fail} />)
      ) : (
        <p style={{ color: 'gray' }}>Нет совпадений</p>
      )}
    </div>
  );
};
