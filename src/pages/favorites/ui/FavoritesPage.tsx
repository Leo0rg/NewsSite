import { FC } from 'react';
import { NewsList } from '@/entities';
import { useUserActions } from '@/entities/user/model/hooks';
import { useGetArticlesByUrlsQuery } from '@/shared/api/newsApi';
import { Loading } from '@/shared/ui/loading/Loading';
import styles from './FavoritesPage.module.scss';

export const FavoritesPage: FC = () => {
  const { likedArticles } = useUserActions();
  const { data: articles, isLoading } = useGetArticlesByUrlsQuery(likedArticles);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Favorite Articles</h1>
      {articles && articles.length > 0 ? (
        <NewsList articles={articles} />
      ) : (
        <div className={styles.empty}>
          <p>You haven't added any articles to favorites yet.</p>
        </div>
      )}
    </div>
  );
}; 