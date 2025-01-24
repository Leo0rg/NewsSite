import { FC } from 'react';
import { NewsList } from '@/entities';
import { Loading } from '@/shared/ui/loading/Loading';
import { useGetTopHeadlinesQuery } from '@/shared/api/newsApi';
import styles from './HomePage.module.scss';

export const HomePage: FC = () => {
  const { data, isLoading, error, refetch } = useGetTopHeadlinesQuery('us');

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className={styles.error}>
        <p>Error loading news</p>
        <button onClick={() => refetch()} className={styles.retryButton}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Latest World News</h1>
      {data && <NewsList articles={data.articles} />}
    </div>
  );
}; 