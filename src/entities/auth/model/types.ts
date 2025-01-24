export interface User {
  id: string;
  nickname: string;
  email: string;
  country: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
} 