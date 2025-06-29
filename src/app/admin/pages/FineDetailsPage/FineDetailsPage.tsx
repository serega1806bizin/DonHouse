/* eslint-disable max-len */
import { GoBack } from '../../components/Btns/GoBack';
import { GoHome } from '../../components/Btns/GoHome';
import styles from './FineDetailsPage.module.css';
import { Image } from 'antd';

const Fail = {
  title: 'Курение на стройке',
  description:
    'Зафиксировано курение в зоне хранения стройматериалов. Нарушитель: Никитин В.В.',
  type: 'fine', // 'warning' | 'fine'
  date: '2025-06-22',
  project: 'Проект №1',
  amount: 100,
  paid: false,
  photo: [
    'https://png.pngtree.com/background/20230402/original/pngtree-builder-smoking-cigarette-at-construction-site-vector-picture-image_2259175.jpg',
    'https://static.lsm.lv/media/2014/11/large/0/3cnv.jpg',
  ],
};

export const FineDetailsPage = () => {
  return (
    <div className={styles.FineDetailsPage}>
      <header className={styles.header}>
        <h1 className={styles.headerTitle}>
          {Fail.type === 'warning' ? 'Предупреждение' : 'Штраф'}
        </h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <GoBack />
          <GoHome />
        </div>
      </header>
      <div className={styles.title}>{Fail.title}</div>
      <div className={styles.info}>{Fail.description}</div>
      <div className={styles.info}>Дата выписки: {Fail.date}</div>
      <div className={styles.info}>Проект: {Fail.project}</div>
      {Fail.type === 'fine' && (
        <div className={styles.info}>
          Сумма штрафа: <b>{Fail.amount}</b> рублей
        </div>
      )}
      <div className={styles.info}>{Fail.paid ? 'Оплачен' : 'Не оплачен'}</div>
      <div className={styles.info}>Фото:</div>
      <div className={styles.photoWrapper}>
        <Image.PreviewGroup>
          {Fail.photo.map((url, index) => (
            <Image
              key={index}
              src={url}
              alt={`photo-${index}`}
              className={styles.photoItem}
            />
          ))}
        </Image.PreviewGroup>
      </div>
    </div>
  );
};
