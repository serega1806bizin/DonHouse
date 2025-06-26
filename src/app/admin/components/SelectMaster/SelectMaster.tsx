import { useState, useRef } from 'react';
import styles from './SelectMaster.module.css';
import { useClickOutside } from '../../../../hooks/useClickOutside';
import { BusyMasterOption } from '../BusyMasterOption/BusyMasterOption';
// eslint-disable-next-line max-len
import { AvailableMasterOption } from '../AvailableMasterOption/AvailableMasterOption';

type Master = {
  id: number;
  fullName: string;
  isBusy: boolean;
};

interface Props {
  masters: Master[];
  value: number | null;
  onChange: (value: number | null) => void;
  placeholder?: string;
}

export const SelectMaster = ({
  masters,
  value,
  onChange,
  placeholder,
}: Props) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-use-before-define
  const selectedMaster = masters.find(m => m.id === value);
  const selectedLabel = selectedMaster?.fullName || placeholder || 'Выберите';
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
          {masters.map(master =>
            master.isBusy ? (
              <BusyMasterOption
                key={master.id}
                master={master}
                onSelect={handleSelect}
              />
            ) : (
              <AvailableMasterOption
                key={master.id}
                master={master}
                onSelect={handleSelect}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
};
