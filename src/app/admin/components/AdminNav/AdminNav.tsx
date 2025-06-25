import { Link, useLocation } from 'react-router-dom';
import styles from './AdminNav.module.css';
import { useState, useRef, useEffect } from 'react';

const leftItems = [
  { to: '/admin/projects', icon: 'project', label: 'Проекты' },
  { to: '/admin/grafics', icon: 'grafic', label: 'Графики' },
];

const rightItems = [
  { to: '/admin/agents', icon: 'agent', label: 'Контрагенты' },
  { to: '/admin/instruments', icon: 'instrument', label: 'Инструменты' },
];

interface Item {
  to: string;
  icon: string;
  label: string;
}

export const AdminNav = () => {
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => location.pathname.startsWith(path);

  const renderItem = ({ to, icon, label }: Item) => {
    const active = isActive(to);

    return (
      <Link to={to} key={to} className={styles.navbar__item}>
        <img
          src={`/public/icons/${icon}${active ? '-active' : ''}.svg`}
          alt={label}
        />
        <span
          style={{ color: active ? '#A45BFF' : '#9EA3BA' }}
          className={styles.navbar__item__title}
        >
          {label}
        </span>
      </Link>
    );
  };

  // Закрытие при клике вне дропдауна
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpenDropdown(false);
      }
    };

    if (isOpenDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    // Очистка
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpenDropdown]);

  return (
    <nav className={styles.navbar}>
      <>{leftItems.map(renderItem)}</>

      <div className={styles.navbar__center} ref={dropdownRef}>
        <img
          src="/public/icons/plus.svg"
          alt="Добавить"
          onClick={() => setIsOpenDropdown(prev => !prev)}
        />
        <div
          className={styles.navbar__dropdown}
          style={{ display: isOpenDropdown ? 'block' : 'none' }}
        >
          <a href="#">Новая задача</a>
          <div className={styles.navbar__divider}></div>
          <a href="#">Зарегистрировать проект</a>
          <div className={styles.navbar__divider}></div>
          <a>
            <Link
              onClick={() => setIsOpenDropdown(false)}
              to="/admin/createTest"
              style={{ padding: '0' }}
            >
              Создать тест
            </Link>
          </a>
        </div>
      </div>

      <>{rightItems.map(renderItem)}</>
    </nav>
  );
};
