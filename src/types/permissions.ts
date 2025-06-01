// Tipos relacionados às permissões baseados na documentação da API

export interface PermissionAction {
  id: string;
  name: string;
}

export interface PermissionModule {
  id: string;
  name: string;
  actions: PermissionAction[];
}

// Tipo para resposta da API de permissões
export interface PermissionsResponse {
  success: boolean;
  data: PermissionModule[];
}

// Tipo para criar/atualizar cargo
export interface UpsertRoleData {
  id?: string; // Opcional para criação
  name: string;
  permissions: Array<{ id: string }>;
}

// Tipo para resposta da API ao criar/atualizar cargo
export interface UpsertRoleResponse {
  success: boolean;
  role: {
    id: string;
    name: string;
    permissions: PermissionAction[];
    created_at: string;
    updated_at: string;
    places_id: string;
  };
  code: number;
}