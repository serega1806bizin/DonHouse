import { useClickOutside } from '../../../../hooks/useClickOutside';
import { useState, useRef } from 'react';
import styles from './SelectProject.module.css';

type TelegramGroup = {
  id: number;
  name: string;
};

type Project = {
  id: number;
  telegramGroup: TelegramGroup;
};

interface Props {
  projects: Project[];
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
}

export const SelectProject = ({
  projects,
  value,
  onChange,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const selectedProject = projects.find(p => p.id === value);
  const selectedLabel =
    selectedProject?.telegramGroup.name || placeholder || 'Выберите';
  const isPlaceholder = selectedLabel === '-- Выберите из списка --';

  useClickOutside(ref, () => setOpen(false));

  const toggleDropdown = () => setOpen(prev => !prev);

  const handleSelect = (id: number) => {
    onChange(id);
    setOpen(false);
  };

  return (
    <div className={styles.selectWrapper} ref={ref}>
      <div
        className={styles.selectInput}
        onClick={toggleDropdown}
        role="button"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            toggleDropdown();
          }
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={isPlaceholder ? styles.placeholder : ''}>
          {selectedLabel}
        </span>

        <img
          src="/icons/arrowDownInDrop.svg"
          alt="стрелка"
          className={styles.arrow}
          aria-hidden="true"
        />
      </div>

      {open && (
        <div className={styles.dropdown} role="listbox">
          {projects.map(project => (
            <div
              key={project.id}
              className={styles.option}
              onClick={() => handleSelect(project.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(project.id);
                }
              }}
            >
              {project.telegramGroup.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
