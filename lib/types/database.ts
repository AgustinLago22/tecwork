// Interfaces principales basadas en create-base.sql
export interface Lead {
  id: string // UUID
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  necesidad: string
  mensaje?: string
  fuente?: string
  urgencia_id?: number
  estado_id?: number
  tipo_proyecto_id?: number
  consentimiento: boolean
  created_at: string
  updated_at: string
}

export interface Aplicante {
  id: string // UUID
  nombre: string
  apellido?: string
  email: string
  telefono?: string
  año_cursado?: number // 1-7
  github_url?: string
  linkedin_url?: string
  portfolio_url?: string
  cv_url?: string
  habilidades?: string
  motivacion?: string
  universidad_id?: number
  carrera_id?: number
  nivel_experiencia_id?: number
  estado_id?: number
  consentimiento: boolean
  created_at: string
  updated_at: string
}

// Interfaces para tablas catálogo
export interface Universidad {
  id: number // SERIAL
  codigo: string
  nombre: string
}

export interface Carrera {
  id: number // SERIAL
  nombre: string
}

export interface NivelExperiencia {
  id: number // SERIAL
  nombre: string
  descripcion: string
}

export interface EstadoLead {
  id: number // SERIAL
  descripcion: string
}

export interface EstadoAplicante {
  id: number // SERIAL
  descripcion: string
}

export interface NivelUrgencia {
  id: number // SERIAL
  nombre: string
}

export interface TipoProyecto {
  id: number // SERIAL
  descripcion: string
}

// Interfaces para vistas (si las usas)
export interface VistaLead {
  id: string
  nombre: string
  email: string
  telefono?: string
  empresa?: string
  necesidad: string
  mensaje?: string
  fuente?: string
  urgencia?: string
  estado?: string
  tipo_proyecto?: string
  created_at: string
}

export interface VistaAplicante {
  id: string
  nombre: string
  apellido?: string
  email: string
  telefono?: string
  año_cursado?: number
  habilidades?: string
  github_url?: string
  linkedin_url?: string
  portfolio_url?: string
  cv_url?: string
  motivacion?: string
  codigo_universidad?: string
  universidad?: string
  carrera?: string
  nivel_experiencia?: string
  descripcion_nivel?: string
  estado?: string
  created_at: string
}