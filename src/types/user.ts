// Tipos relacionados ao usuário baseados na documentação da API

export interface Permission {
  id: string;
  name: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: Permission[];
  created_at: string;
  updated_at: string;
  places_id: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
  updated_at: string;
  active: boolean;
  places_id: string;
  roles?: Role[];
}

// Tipo para dados de login
export interface LoginData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Tipo para resposta de login da API
export interface LoginResponse {
  success: boolean;
  user: User;
  token: {
    token: string;
    durationInMs: number;
    type: string;
  };
  code: number;
}

// Tipo para atualização de perfil (baseado na documentação da API)
export interface UpdateProfileData {
  first_name: string;
  last_name: string;
}

// Tipo para resposta de atualização de perfil
export interface UpdateProfileResponse {
  success: boolean;
  user: User;
  code: number;
  message?: string;
}