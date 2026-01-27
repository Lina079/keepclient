// Mock de usuario autenticado
// En el futuro esto vendrá del backend/JWT/session
export const authUser = {
  id: "user_001",
  name: "Lina",
  role: "owner", // Opciones: "owner" | "staff"
  locale: "es",  // Idioma preferido del usuario
};

// Roles disponibles en el sistema
export const ROLES = {
  OWNER: "owner",
  STAFF: "staff",
};