import { FC } from 'react';
import { Select } from 'antd';
import { SortableArticle } from '@/app/types';
import styles from './NewsSort.module.scss';

type SortOption = {
  value: string;
  label: string;
  sortFn: (a: SortableArticle, b: SortableArticle) => number;
};

const sortOptions: SortOption[] = [
  {
    value: 'relevance',
    label: 'Relevance',
    sortFn: () => 0
  },
  {
    value: 'title-asc',
    label: 'Title (A-Z)',
    sortFn: (a, b) => {
      if (!a?.title || !b?.title) return 0;
      return a.title.localeCompare(b.title);
    }
  },
  {
    value: 'title-desc',
    label: 'Title (Z-A)',
    sortFn: (a, b) => {
      if (!a?.title || !b?.title) return 0;
      return b.title.localeCompare(a.title);
    }
  },
  {
    value: 'date-asc',
    label: 'Date (Oldest first)',
    sortFn: (a, b) => {
      if (!a?.publishedAt || !b?.publishedAt) return 0;
      return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
    }
  },
  {
    value: 'date-desc',
    label: 'Date (Newest first)',
    sortFn: (a, b) => {
      if (!a?.publishedAt || !b?.publishedAt) return 0;
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    }
  }
];

interface NewsSortProps {
  onSortChange: (sortFn: (a: SortableArticle, b: SortableArticle) => number) => void;
}

export const NewsSort: FC<NewsSortProps> = ({ onSortChange }) => {
  const handleChange = (value: string) => {
    const option = sortOptions.find(opt => opt.value === value);
    if (option) {
      onSortChange(option.sortFn);
    }
  };

  return (
    <div className={styles.sortWrapper}>
      <Select
        defaultValue="relevance"
        onChange={handleChange}
        className={styles.sortSelect}
        options={sortOptions}
        placeholder="Sort by..."
      />
    </div>
  );
}; 