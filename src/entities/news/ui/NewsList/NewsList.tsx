import { FC } from 'react';
import { NewsCard } from '../NewsCard/NewsCard';
import type { Article } from '@/app/types';
import styles from './NewsList.module.scss';

interface NewsListProps {
  articles: Article[];
}

export const NewsList: FC<NewsListProps> = ({ articles }) => {
  return (
    <div className={styles.grid}>
      {articles.map((article) => (
        <NewsCard
          key={article.url}
          article={article}
        />
      ))}
    </div>
  );
}; 