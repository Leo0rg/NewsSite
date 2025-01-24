import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { toggleLike, toggleReadLater, markAsRead } from './slice';

export const useUserActions = () => {
  const dispatch = useDispatch();
  const { likedArticles, readLaterArticles, readArticles } = useSelector(
    (state: RootState) => state.user
  );

  return {
    likedArticles,
    readLaterArticles,
    readArticles,
    isLiked: (url: string) => likedArticles.includes(url),
    isReadLater: (url: string) => readLaterArticles.includes(url),
    isRead: (url: string) => readArticles.includes(url),
    toggleLike: (url: string) => dispatch(toggleLike(url)),
    toggleReadLater: (url: string) => dispatch(toggleReadLater(url)),
    markAsRead: (url: string) => dispatch(markAsRead(url)),
  };
}; 