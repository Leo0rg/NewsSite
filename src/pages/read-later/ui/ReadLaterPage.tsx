import { FC } from 'react';
import { NewsList } from '@/entities';
import { useUserActions } from '@/entities/user/model/hooks';
import { useGetArticlesByUrlsQuery } from '@/shared/api/newsApi';
import { Loading } from '@/shared/ui/loading/Loading';
import styles from './ReadLaterPage.module.scss';

export const ReadLaterPage: FC = () => {
  const { readLaterArticles } = useUserActions();
  const { data: articles, isLoading } = useGetArticlesByUrlsQuery(readLaterArticles);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Read Later</h1>
      {articles && articles.length > 0 ? (
        <NewsList articles={articles} />
      ) : (
        <div className={styles.empty}>
          <p>You haven't saved any articles to read later.</p>
        </div>
      )}
    </div>
  );
}; 