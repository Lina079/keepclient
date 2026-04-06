import { useState } from "react";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { useAuth } from "../../app/auth/AuthContext";
import { useToast } from "../../app/toast/ToastContext";

export default function Settings() {
  const { lang, setLang } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  // Estado del formulario de empresa
  const [companyData, setCompanyData] = useState({
    name: localStorage.getItem("companyName") || "",
    logo: localStorage.getItem("companyLogo") || null
  });

  // Estado del formulario de usuario
  const [userData, setUserData] = useState({
    name: user.name || "",
    email: user.email || "",
    role: user.role || "staff"
  });

  // Estado de edición
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Handler: Cambiar datos de empresa
  const handleCompanyChange = (e) => {
    const { name, value } = e.target;
    setCompanyData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler: Cambiar datos de usuario
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler: Guardar configuración de empresa
  const handleSaveCompany = () => {
    if (!companyData.name.trim()) {
      toast.error(lang === "es" 
        ? "El nombre de la empresa es obligatorio" 
        : "Company name is required");
      return;
    }

    // Guardar en localStorage
    localStorage.setItem("companyName", companyData.name.trim());
    if (companyData.logo) {
      localStorage.setItem("companyLogo", companyData.logo);
    }

    setIsEditingCompany(false);
    toast.success(lang === "es"
      ? "Configuración de empresa guardada correctamente"
      : "Company settings saved successfully");
  };

  // Handler: Guardar perfil de usuario
  const handleSaveProfile = () => {
    if (!userData.name.trim()) {
      toast.error(lang === "es"
        ? "El nombre es obligatorio"
        : "Name is required");
      return;
    }

    // TODO: Aquí llamaremos al backend en el futuro
    // Por ahora solo mostramos confirmación
    setIsEditingProfile(false);
    toast.success(lang === "es"
      ? "Perfil actualizado correctamente"
      : "Profile updated successfully");
  };

  // Handler: Cancelar edición
  const handleCancelCompany = () => {
    setCompanyData({
      name: localStorage.getItem("companyName") || "",
      logo: localStorage.getItem("companyLogo") || null
    });
    setIsEditingCompany(false);
  };

  const handleCancelProfile = () => {
    setUserData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "staff"
    });
    setIsEditingProfile(false);
  };

  return (
    <section className="settings">
      <header className="settings__header">
        <h1 className="settings__title">
          {lang === "es" ? "Configuración" : "Settings"}
        </h1>
      </header>

      <main className="settings__content">
        {/* SECCIÓN 1: PERFIL DE USUARIO */}
        <section className="settings__section">
          <div className="settings__section-header">
            <h2 className="settings__section-title">
              👤 {lang === "es" ? "Perfil de usuario" : "User profile"}
            </h2>
            {!isEditingProfile && (
              <button 
                className="settings__edit-button"
                onClick={() => setIsEditingProfile(true)}
              >
                {lang === "es" ? "Editar" : "Edit"}
              </button>
            )}
          </div>

          <div className="settings__section-content">
            {/* Nombre */}
            <div className="settings__field">
              <label className="settings__label">
                {lang === "es" ? "Nombre" : "Name"}
              </label>
              {isEditingProfile ? (
                <input
                  type="text"
                  name="name"
                  value={userData.name}
                  onChange={handleUserChange}
                  className="settings__input"
                  placeholder={lang === "es" ? "Tu nombre" : "Your name"}
                />
              ) : (
                <p className="settings__value">{userData.name || "-"}</p>
              )}
            </div>

            {/* Email (futuro) */}
            <div className="settings__field">
              <label className="settings__label">Email</label>
              <p className="settings__value settings__value--muted">
                {lang === "es" 
                  ? "Próximamente disponible" 
                  : "Coming soon"}
              </p>
            </div>

            {/* Rol */}
            <div className="settings__field">
              <label className="settings__label">
                {lang === "es" ? "Rol" : "Role"}
              </label>
              <p className="settings__value">
                {userData.role === "owner" 
                  ? (lang === "es" ? "Propietario" : "Owner")
                  : "Staff"}
              </p>
            </div>

            {/* Botones de edición */}
            {isEditingProfile && (
              <div className="settings__actions">
                <button 
                  className="settings__button settings__button--primary"
                  onClick={handleSaveProfile}
                >
                  {lang === "es" ? "Guardar cambios" : "Save changes"}
                </button>
                <button 
                  className="settings__button settings__button--secondary"
                  onClick={handleCancelProfile}
                >
                  {lang === "es" ? "Cancelar" : "Cancel"}
                </button>
              </div>
            )}
          </div>
        </section>

        {/* SECCIÓN 2: CONFIGURACIÓN DE EMPRESA (SOLO OWNER) */}
        {user.role === "owner" && (
          <section className="settings__section">
            <div className="settings__section-header">
              <h2 className="settings__section-title">
                🏢 {lang === "es" ? "Configuración de empresa" : "Company settings"}
              </h2>
              {!isEditingCompany && (
                <button 
                  className="settings__edit-button"
                  onClick={() => setIsEditingCompany(true)}
                >
                  {lang === "es" ? "Editar" : "Edit"}
                </button>
              )}
            </div>

            <div className="settings__section-content">
              {/* Nombre de la empresa */}
              <div className="settings__field">
                <label className="settings__label">
                  {lang === "es" ? "Nombre del negocio" : "Business name"}
                </label>
                {isEditingCompany ? (
                  <input
                    type="text"
                    name="name"
                    value={companyData.name}
                    onChange={handleCompanyChange}
                    className="settings__input"
                    placeholder={lang === "es" 
                      ? "Ej: The Beauty Club" 
                      : "e.g. The Beauty Club"}
                  />
                ) : (
                  <p className="settings__value">
                    {companyData.name || (lang === "es" ? "Sin configurar" : "Not configured")}
                  </p>
                )}
              </div>

              {/* Logo (futuro) */}
              <div className="settings__field">
                <label className="settings__label">Logo</label>
                <p className="settings__value settings__value--muted">
                  {lang === "es" 
                    ? "Próximamente disponible" 
                    : "Coming soon"}
                </p>
              </div>

              {/* Botones de edición */}
              {isEditingCompany && (
                <div className="settings__actions">
                  <button 
                    className="settings__button settings__button--primary"
                    onClick={handleSaveCompany}
                  >
                    {lang === "es" ? "Guardar cambios" : "Save changes"}
                  </button>
                  <button 
                    className="settings__button settings__button--secondary"
                    onClick={handleCancelCompany}
                  >
                    {lang === "es" ? "Cancelar" : "Cancel"}
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* SECCIÓN 3: PREFERENCIAS */}
        <section className="settings__section">
          <div className="settings__section-header">
            <h2 className="settings__section-title">
              ⚙️ {lang === "es" ? "Preferencias" : "Preferences"}
            </h2>
          </div>

          <div className="settings__section-content">
            {/* Idioma */}
            <div className="settings__field">
              <label className="settings__label">
                {lang === "es" ? "Idioma" : "Language"}
              </label>
              <select 
                className="settings__select"
                value={lang}
                onChange={(e) => setLang(e.target.value)}
              >
                <option value="es">Español</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </section>

        {/* SECCIÓN 4: INFORMACIÓN DE CUENTA (SOLO OWNER) */}
        {user.role === "owner" && (
          <section className="settings__section">
            <div className="settings__section-header">
              <h2 className="settings__section-title">
                💳 {lang === "es" ? "Información de cuenta" : "Account information"}
              </h2>
            </div>

            <div className="settings__section-content">
              {/* Plan */}
              <div className="settings__field">
                <label className="settings__label">
                  {lang === "es" ? "Plan actual" : "Current plan"}
                </label>
                <p className="settings__value">
                  <span className="settings__badge settings__badge--free">Free</span>
                </p>
              </div>

              {/* Límites */}
              <div className="settings__field">
                <label className="settings__label">
                  {lang === "es" ? "Límites de uso" : "Usage limits"}
                </label>
                <p className="settings__value settings__value--muted">
                  {lang === "es"
                    ? "Clientes ilimitados · 1 usuario"
                    : "Unlimited clients · 1 user"}
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </section>
  );
}