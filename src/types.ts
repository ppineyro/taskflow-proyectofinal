export interface AuthResponse {
  token: string
}

export interface Project {
  id: number
  name: string
  description?: string
  ownerId: number
  createdAt: string
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'POR_HACER' | 'EN_PROGRESO' | 'COMPLETADA' | 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'Alta' | 'Media' | 'Baja';
  projectId: number;
  dueDate?: string;
}

export interface NewProject {
  name: string
  description?: string
}

export const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV ? '/api' : 'https://d3ujwk09smrk9z.cloudfront.net')

export const TOKEN_KEY = 'jwt-auth-demo-token'