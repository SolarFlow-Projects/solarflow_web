// Tipos gerais para respostas da API

export interface ApiResponse<T = unknown> {
  success: boolean;
  code: number;
  data?: T;
  message?: string;
}

export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: PaginationMeta;
}

// Tipos para parâmetros de listagem
export interface ListUsersParams {
  limit?: number;
  page?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  createdAfter?: string;
  createdBefore?: string;
  active?: boolean;
  placesId?: string;
  orderBy?: string | string[];
}

// Tipo para erros da API
export interface ApiError {
  success: false;
  code: number;
  message: string;
  errors?: Record<string, string[]>;
}