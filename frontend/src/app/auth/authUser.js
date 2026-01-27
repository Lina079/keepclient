// Mock de usuario autenticado
// En el futuro esto vendrá del backend/JWT/session

// Cargar datos de localStorage si existen
const storedLogo = localStorage.getItem("companyLogo");
const storedName = localStorage.getItem("companyName");

export const authUser = {
  id: "user_001",
  name: "Lina",
  role: "owner", // Opciones: "owner" | "staff"
  locale: "es",  // Idioma preferido del usuario
  avatar: null,  // URL del avatar del usuario
  companyLogo: storedLogo || null, // Cargar desde localStorage
  companyName: storedName || null, // Cargar desde localStorage
};

// Roles disponibles en el sistema
export const ROLES = {
  OWNER: "owner",
  STAFF: "staff",
};