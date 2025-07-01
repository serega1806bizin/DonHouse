/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from 'react';

import styles from './editingRegulationsPage.module.css';
import { GoBack } from '../../components/Btns/GoBack';
import { ContentBlock } from '../../components/ContentBlock/ContentBlock';

// Типы
interface Content {
  id: number;
  type: 'text' | 'images' | 'video';
  content: string | string[];
}

interface Section {
  id: number;
  name: string;
  content: Content[];
}

interface Regulations {
  sections: Section[];
}

// Генератор ID
let nextId = 1000;
const generateId = () => nextId++;

// Начальные данные (ручные id)
const initialData: Regulations = {
  sections: [
    {
      id: 1,
      name: 'Инструкции к 101',
      content: [
        {
          id: 1,
          type: 'text',
          content: 'Перед началом смены прораб проводит инструктаж...',
        },
      ],
    },
    {
      id: 2,
      name: 'Инструкdsfsdfции к 101',
      content: [
        {
          id: 2,
          type: 'text',
          content: 'Перед началом смены прораб проводит инструктаж...',
        },
        {
          id: 3,
          type: 'images',
          content: [
            'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
            'https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          ],
        },
        {
          id: 4,
          type: 'video',
          content: 'https://youtu.be/dQw4w9WgXcQ?si=qUF0zlp6d5Z65XDN',
        },
      ],
    },
  ],
};

export const EditingRegulationsPage = () => {
  const [regulations, setRegulations] = useState<Regulations>(initialData);

  const handleSectionNameChange = (index: number, newName: string) => {
    const updated = [...regulations.sections];

    updated[index].name = newName;
    setRegulations({ sections: updated });
  };

  const handleSave = () => {
    console.log('save', regulations);
  };

  const handleAddSection = () => {
    const newSection: Section = {
      id: generateId(),
      name: '',
      content: [],
    };

    setRegulations(prev => ({
      sections: [...prev.sections, newSection],
    }));
  };

  const handleAddContent = (sectionIndex: number) => {
    const newContent: Content = {
      id: generateId(),
      type: 'text',
      content: '',
    };
    const updated = [...regulations.sections];

    updated[sectionIndex].content.push(newContent);
    setRegulations({ sections: updated });
  };

  const handleContentChange = (
    sectionIndex: number,
    contentIndex: number,
    newContent: Content,
  ) => {
    const updated = [...regulations.sections];

    updated[sectionIndex].content[contentIndex] = newContent;
    setRegulations({ sections: updated });
  };

  const handleDeleteContent = (sectionIndex: number, contentIndex: number) => {
    const updated = [...regulations.sections];

    updated[sectionIndex].content.splice(contentIndex, 1);
    setRegulations({ sections: updated });
  };

  const handleDeleteSection = (index: number) => {
    const updated = [...regulations.sections];

    updated.splice(index, 1);
    setRegulations({ sections: updated });
  };

  return (
    <div className={styles.editingRegulationsPage}>
      <header className={styles.header}>
        <h1 className={styles.title}>Регламент</h1>
        <GoBack />
      </header>
      {regulations.sections.map((section, sectionIndex) => (
        <div key={section.id} className={styles.section}>
          <label
            style={{ marginBottom: 10, display: 'block' }}
            htmlFor={'name' + section.id}
          >
            Раздел {sectionIndex + 1}:
          </label>
          <input
            id={'name' + section.id}
            className={styles.inputName}
            value={section.name}
            onChange={e =>
              handleSectionNameChange(sectionIndex, e.target.value)
            }
            placeholder="Раздел..."
          />
          <label style={{ marginBottom: 12, display: 'block' }}>Контент</label>

          {section.content.map((item, contentIndex) => (
            <ContentBlock
              key={item.id}
              content={item}
              onChange={newContent =>
                handleContentChange(sectionIndex, contentIndex, newContent)
              }
              onDelete={() => handleDeleteContent(sectionIndex, contentIndex)}
            />
          ))}

          <div className={styles.buttons}>
            <button
              className={styles.btnAddContent}
              onClick={() => handleAddContent(sectionIndex)}
            >
              Добавить контент
            </button>
            <button
              onClick={() => handleDeleteSection(sectionIndex)}
              className={styles.btnDeleteSection}
            >
              УДАЛИТЬ ВЕСЬ РАЗДЕЛ
            </button>
          </div>
        </div>
      ))}
      <div className={styles.buttons}>
        <button onClick={handleAddSection} className={styles.btnCreateSection}>
          Создать раздел
        </button>
        <button onClick={handleSave} className={styles.btnSave}>
          Сохранить изменения и оповестить рабочие группы
        </button>
      </div>
    </div>
  );
};
