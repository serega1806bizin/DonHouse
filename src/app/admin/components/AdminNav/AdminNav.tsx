import { Link, useLocation } from 'react-router-dom';
import styles from './AdminNav.module.css';
import { useState, useRef } from 'react';
import { CreateTask } from '../../modals/CreateTask/CreateTask';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { RegisterProject } from '../../modals/RegisterProject/RegisterProject';

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
  const [isOpenCreateTaskModal, setIsOpenCreateTaskModal] = useState(false);
  const [isOpenRegisterProjectModal, setIsOpenRegisterProjectModal] =
    useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setIsOpenDropdown(false));

  const handleOpenCreateTaskModal = () => {
    setIsOpenDropdown(false);
    setIsOpenCreateTaskModal(true);
  };

  const handleOpenRegisterProjectModal = () => {
    setIsOpenDropdown(false);
    setIsOpenRegisterProjectModal(true);
  };

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

  return (
    <>
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
            <a
              onClick={handleOpenCreateTaskModal}
              style={{ cursor: 'pointer' }}
            >
              Новая задача
            </a>
            <div className={styles.navbar__divider}></div>
            <a onClick={handleOpenRegisterProjectModal}>
              Зарегистрировать проект
            </a>
            <div className={styles.navbar__divider}></div>
            <div>
              <Link
                onClick={() => setIsOpenDropdown(false)}
                to="/admin/createTest"
                style={{ padding: '0' }}
              >
                Создать тест
              </Link>
            </div>
          </div>
        </div>

        <>{rightItems.map(renderItem)}</>
      </nav>
      {isOpenCreateTaskModal && (
        <CreateTask onClose={() => setIsOpenCreateTaskModal(false)} />
      )}
      {isOpenRegisterProjectModal && (
        <RegisterProject onClose={() => setIsOpenRegisterProjectModal(false)} />
      )}
    </>
  );
};
