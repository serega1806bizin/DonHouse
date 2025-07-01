import styles from './TypeSelector.module.css';

interface TypeSelectorProps {
  selectedType: 'text' | 'images' | 'video' | 'documents';
  onChange: (type: 'text' | 'images' | 'video' | 'documents') => void;
}

const types: {
  type: TypeSelectorProps['selectedType'];
  icon: string;
  activeIcon: string;
  alt: string;
}[] = [
  {
    type: 'text',
    icon: '/icons/text.svg',
    activeIcon: '/icons/text-active.svg',
    alt: 'текст',
  },
  {
    type: 'images',
    icon: '/icons/photo.svg',
    activeIcon: '/icons/photo-active.svg',
    alt: 'изображения',
  },
  {
    type: 'video',
    icon: '/icons/video.svg',
    activeIcon: '/icons/video-active.svg',
    alt: 'видео',
  },
  {
    type: 'documents',
    icon: '/icons/file.svg',
    activeIcon: '/icons/file-active.svg',
    alt: 'документы',
  },
];

export const TypeSelector = ({ selectedType, onChange }: TypeSelectorProps) => {
  return (
    <div className={styles.TypeSelector}>
      {types.map(({ type, icon, activeIcon, alt }) => (
        <img
          key={type}
          src={selectedType === type ? activeIcon : icon}
          alt={alt}
          onClick={() => onChange(type)}
          style={{ cursor: 'pointer', marginRight: 8 }}
        />
      ))}
    </div>
  );
};
