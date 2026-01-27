import { ROLES } from "./authUser";

/**
 * Sistema de permisos por rol
 * 
 * OWNER puede:
 * - Crear, editar, eliminar clientes
 * - Gestionar usuarios (crear/editar staff)
 * - Acceder a métricas y KPIs
 * - Modificar configuración global (servicios, retención, etc.)
 * - Todas las acciones operativas (citas, notas, tareas)
 * 
 * STAFF puede:
 * - Ver agenda asignada
 * - Crear citas/notas/tareas operativas
 * - Ver información de clientes
 * - NO puede: eliminar clientes, gestionar usuarios, cambiar configuración, ver métricas globales
 */

export function canEditClients(user) {
  return user.role === ROLES.OWNER;
}

export function canDeleteClients(user) {
  return user.role === ROLES.OWNER;
}

export function canManageUsers(user) {
  return user.role === ROLES.OWNER;
}

export function canAccessMetrics(user) {
  return user.role === ROLES.OWNER;
}

export function canEditSettings(user) {
  return user.role === ROLES.OWNER;
}

export function canCreateAppointments(user) {
  // Tanto owner como staff pueden crear citas
  return user.role === ROLES.OWNER || user.role === ROLES.STAFF;
}

export function canViewClients(user) {
  // Ambos pueden ver clientes
  return user.role === ROLES.OWNER || user.role === ROLES.STAFF;
}

// Helper general para verificar si el usuario es owner
export function isOwner(user) {
  return user.role === ROLES.OWNER;
}

// Helper general para verificar si el usuario es staff
export function isStaff(user) {
  return user.role === ROLES.STAFF;
}