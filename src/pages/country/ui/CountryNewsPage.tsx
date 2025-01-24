import { FC, useState } from 'react';
import { NewsList } from '@/entities';
import { CountrySelector } from '@/features';
import { useGetTopHeadlinesQuery } from '@/shared/api/newsApi';
import styles from './CountryNewsPage.module.scss';

export const CountryNewsPage: FC = () => {
  const [selectedCountry, setSelectedCountry] = useState('us');
  const { data, isLoading, error } = useGetTopHeadlinesQuery(selectedCountry);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>News by Country</h1>
      <CountrySelector 
        value={selectedCountry} 
        onChange={setSelectedCountry} 
      />
      {isLoading && <div className={styles.loading}>Loading...</div>}
      {error && <div className={styles.error}>Error loading news</div>}
      {data && <NewsList articles={data.articles} />}
    </div>
  );
}; 