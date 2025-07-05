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
  
  // Campos opcionais para futuras implementações da API
  phone?: string;
  address?: string;
  cpf?: string;
  birth_date?: string;
  department?: string;
  position?: string;
  
  // Campos opcionais para informações adicionais
  avatar_url?: string;
  bio?: string;
  linkedin?: string;
  emergency_contact?: string;
  emergency_phone?: string;
  
  // Campos para controle interno
  last_login?: string;
  login_count?: number;
  preferences?: {
    theme?: 'light' | 'dark' | 'system';
    language?: string;
    notifications?: boolean;
    email_notifications?: boolean;
  };
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
  // Campos que serão implementados futuramente
  phone?: string;
  address?: string;
  cpf?: string;
  birth_date?: string;
  department?: string;
  position?: string;
  bio?: string;
  avatar_url?: string;
}

// Tipo para resposta de atualização de perfil
export interface UpdateProfileResponse {
  success: boolean;
  user: User;
  code: number;
}