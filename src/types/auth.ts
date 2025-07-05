// Tipos relacionados à autenticação

import { User } from './user';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}