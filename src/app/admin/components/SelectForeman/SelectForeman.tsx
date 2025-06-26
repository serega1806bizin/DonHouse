import { useRef, useState } from 'react';
import styles from '../../components/SelectProject/SelectProject.module.css';
import { useClickOutside } from '../../../../hooks/useClickOutside';

type Foreman = {
  id: number;
  fullName: string;
};

interface Props {
  foremens: Foreman[];
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
}

export const SelectForeman = ({
  foremens,
  value,
  onChange,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const selectedForeman = foremens.find(f => f.id === value);
  const selectedLabel = selectedForeman?.fullName || placeholder || 'Выберите';
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
          {foremens.map(foreman => (
            <div
              key={foreman.id}
              className={styles.option}
              onClick={() => handleSelect(foreman.id)}
              role="button"
              tabIndex={0}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(foreman.id);
                }
              }}
            >
              {foreman.fullName}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
