import { Link } from 'react-router-dom';
import styles from './homePage.module.css';

interface HomePageData {
  adminName: string;
  activeProjects: number;
  activeTasks: number;
  finishedTasks: number;
  delayedTasks: number;
  foremanCount: number;
}

const homePageData: HomePageData = {
  adminName: 'Роман',
  activeProjects: 5,
  activeTasks: 20,
  finishedTasks: 30,
  delayedTasks: 5,
  foremanCount: 25,
};

export const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <header className={styles.header}>
        <h1 className={styles.title}>
          Привет, <b>{homePageData.adminName}</b> 👋
        </h1>
        <Link to="/admin/settings">
          <img src="/icons/settings.svg" alt="настройки" />
        </Link>
      </header>
      <p className={styles.text}>На данный момент мы имеем:</p>
      <div className={styles.statsList}>
        <div className={styles.statsItem}>
          <span className={styles.statsText}>
            {homePageData.activeProjects} активных проектов
          </span>
          <img
            className={styles.statsImg}
            src="/icons/arrow-yellow.svg"
            alt="стрелка"
          />
        </div>
        <div className={styles.statsItem}>
          <span className={styles.statsText}>
            {homePageData.activeTasks} активных задач
          </span>
          <img
            className={styles.statsImg}
            src="/icons/arrow-yellow.svg"
            alt="стрелка"
          />
        </div>
        <div className={styles.statsItem}>
          <span className={styles.statsText}>
            {homePageData.finishedTasks} завершенных задач
          </span>
          <img
            className={styles.statsImg}
            src="/icons/arrow-green.png"
            alt="стрелка"
          />
        </div>
        <div className={styles.statsItem}>
          <span className={styles.statsText}>
            {homePageData.delayedTasks} просроченных задач
          </span>
          <img
            className={styles.statsImg}
            src="/icons/arrow-red.svg"
            alt="стрелка"
          />
        </div>
        <div className={styles.statsItem}>
          <span className={styles.statsText}>
            {homePageData.foremanCount} прорабов
          </span>
          <Link className={styles.statsManage} to="/admin/foremans">
            управлять
          </Link>
        </div>
      </div>
    </div>
  );
};
