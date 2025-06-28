import { Link } from 'react-router-dom';
import { GoBack } from '../../components/Btns/GoBack';
import styles from './settingsPage.module.css';

// Добавил страницу для настроек админа

type Option = {
  icon: string;
  title: string;
  link: string;
};

const options = [
  {
    icon: '/icons/reglament.svg',
    title: 'Регламент',
    link: '/admin/editingRegulations',
  },
  {
    icon: '/icons/res.png',
    title: 'Результаты тестирований',
    link: '/admin/tests',
  },
  {
    icon: '/icons/signatures.png',
    title: 'Информация о подписях',
    link: '/admin/signatures',
  },
];

const OptionOfSettings = ({ option }: { option: Option }) => {
  return (
    <Link to={option.link} className={styles.options__item}>
      <div className={styles.left}>
        <img src={option.icon} alt="настройки" />
        <span>{option.title}</span>
      </div>
      <img src="/icons/arrow-right.svg" alt="стрелка вправо" />
    </Link>
  );
};

export const SettingsPage = () => {
  return (
    <div className={styles.SettingsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Дополнительные опции</h1>
        <GoBack />
      </header>
      <div className={styles.options__list}>
        {options.map(option => (
          <OptionOfSettings key={option.title} option={option} />
        ))}
      </div>
    </div>
  );
};
