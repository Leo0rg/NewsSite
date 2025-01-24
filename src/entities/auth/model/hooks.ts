import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/app/store/store';
import { login, logout, updateUser } from './slice';
import type { User } from './types';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  return {
    user,
    isAuthenticated,
    login: (userData: User) => dispatch(login(userData)),
    logout: () => dispatch(logout()),
    updateUser: (userData: Partial<User>) => dispatch(updateUser(userData)),
  };
}; 