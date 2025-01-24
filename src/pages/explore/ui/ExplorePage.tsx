import { FC, useState } from 'react';
import { NewsList } from '@/entities';
import { Loading } from '@/shared/ui/loading/Loading';
import { useGetNewsByCategoryQuery } from '@/shared/api/newsApi';
import { Select } from 'antd';
import styles from './ExplorePage.module.scss';

const categories = [
  'business',
  'entertainment',
  'general',
  'health',
  'science',
  'sports',
  'technology',
];

export const ExplorePage: FC = () => {
  const [category, setCategory] = useState('general');
  const { data, isLoading, error, refetch } = useGetNewsByCategoryQuery(category);

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
      <h1 className={styles.title}>Explore News</h1>
      <Select
        value={category}
        onChange={setCategory}
        className={styles.categorySelect}
        options={categories.map(cat => ({
          value: cat,
          label: cat.charAt(0).toUpperCase() + cat.slice(1)
        }))}
      />
      {data && <NewsList articles={data.articles} />}
    </div>
  );
}; 