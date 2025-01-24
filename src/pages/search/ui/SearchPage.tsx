import { FC, useState, useCallback, useMemo } from 'react';
import { Input, Button } from 'antd';
import { NewsList } from '@/entities';
import { NewsSort } from '@/features/news-sort';
import { useSearchNewsQuery } from '@/shared/api/newsApi';
import { Loading } from '@/shared/ui/loading/Loading';
import { SortableArticle } from '@/app/types';
import styles from './SearchPage.module.scss';

const { Search: SearchInput } = Input;

export const SearchPage: FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [sortFn, setSortFn] = useState<((a: SortableArticle, b: SortableArticle) => number) | undefined>(
    undefined
  );

  const { data, isLoading, isFetching } = useSearchNewsQuery(
    { searchTerm, page },
    { skip: !searchTerm }
  );

  // Используем useMemo для сортировки
  const sortedArticles = useMemo(() => {
    if (!data?.articles) return [];
    if (!sortFn) return data.articles;
    
    return [...data.articles].sort((a, b) => {
      try {
        return sortFn(a as SortableArticle, b as SortableArticle);
      } catch (error) {
        console.error('Sorting error:', error);
        return 0;
      }
    });
  }, [data?.articles, sortFn]);

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
    setPage(1);
    setSortFn(undefined); // Сбрасываем сортировку при новом поиске
  };

  const handleLoadMore = useCallback(() => {
    setPage(prev => prev + 1);
  }, []);

  const handleSort = useCallback((newSortFn: (a: SortableArticle, b: SortableArticle) => number) => {
    setSortFn(() => newSortFn); // Используем функциональное обновление
  }, []);

  const hasMore = data ? data.articles.length < data.totalResults : false;

  return (
    <div className={styles.searchPage}>
      <h1 className={styles.title}>Search News</h1>
      <div className={styles.searchControls}>
        <SearchInput
          placeholder="Search news..."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          className={styles.searchInput}
        />
        {data && <NewsSort onSortChange={handleSort} />}
      </div>
      
      {isLoading && <Loading />}
      
      {data && (
        <div className={styles.results}>
          <p className={styles.resultsCount}>
            Found {data.totalResults} articles
          </p>
          <NewsList articles={sortedArticles} />
          
          {hasMore && (
            <div className={styles.loadMoreWrapper}>
              <Button
                onClick={handleLoadMore}
                loading={isFetching}
                size="large"
                className={styles.loadMoreButton}
              >
                Load More
              </Button>
            </div>
          )}
        </div>
      )}

      {!data && !isLoading && searchTerm && (
        <div className={styles.noResults}>
          <p>No results found for "{searchTerm}"</p>
        </div>
      )}

      {!searchTerm && (
        <div className={styles.initial}>
          <p>Enter a search term to find news</p>
        </div>
      )}
    </div>
  );
}; 