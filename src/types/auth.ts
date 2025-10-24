// Tipos relacionados à autenticação

import { User, UpdateProfileData, UpdateProfileResponse } from './user';

export interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  loading: boolean;
  updateProfile: (data: UpdateProfileData) => Promise<UpdateProfileResponse>;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}