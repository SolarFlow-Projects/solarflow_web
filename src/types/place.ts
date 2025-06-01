// Tipos relacionados aos estabelecimentos baseados na documentação da API

export interface Module {
  id: string;
  name: string;
}

export interface Place {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  addressNumber: string;
  state: string;
  city: string;
  document: string;
  createdAt: string;
  updatedAt: string;
  deactivedAt?: string | null;
  modules: Module[];
}

// Tipo para criação de estabelecimento
export interface CreatePlaceData {
  name: string;
  phone: string;
  email: string;
  address: string;
  addressNumber: string;
  state: string;
  city: string;
  document: string;
  modules: Array<{ id: string }>;
}

// Tipo para resposta da API ao criar estabelecimento
export interface CreatePlaceResponse {
  success: boolean;
  place: Place;
  code: number;
}