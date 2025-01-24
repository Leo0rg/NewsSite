import styles from './Loading.module.scss';

export const Loading = () => (
  <div className={styles.loading}>
    <div className={styles.spinner}></div>
    <p>Loading news...</p>
  </div>
); 