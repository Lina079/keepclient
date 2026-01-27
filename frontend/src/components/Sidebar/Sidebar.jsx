import { Link, useLocation } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../../app/auth/AuthContext";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { isOwner } from "../../app/auth/permissions";
import editIcon from "../../assets/icons/edit-icon.png";
import logoIcon from "../../assets/icons/logo-keepclient-icon.png";
import placeholderLogo from "../../assets/images/backgrounds/placeholder-logo-empresa.png";

export default function Sidebar() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Estados locales para edición
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempCompanyName, setTempCompanyName] = useState(user.companyName || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: lang === "es" ? "Inicio" : "Home", icon: "🏠" },
    { path: "/clients", label: lang === "es" ? "Clientes" : "Clients", icon: "👥" },
    { path: "/retention", label: lang === "es" ? "Seguimientos" : "Follow-ups", icon: "✓" },
    { path: "/settings", label: lang === "es" ? "Ajustes" : "Settings", icon: "⚙️" },
  ];

  // Handler para cambiar logo
  const handleLogoClick = () => {
    if (isOwner(user)) {
      fileInputRef.current?.click();
    }
  };

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result;
        // Guardar en localStorage (temporal)
        localStorage.setItem("companyLogo", imageUrl);
        // Actualizar usuario (forzar re-render)
        user.companyLogo = imageUrl;
        window.location.reload(); // Forzar recarga (temporal, mejoraremos después)
      };
      reader.readAsDataURL(file);
    }
  };

  // Handler para editar nombre
  const handleNameClick = () => {
    if (isOwner(user)) {
      setIsEditingName(true);
    }
  };

  const handleNameSave = () => {
    if (tempCompanyName.trim()) {
      // Guardar en localStorage (temporal)
      localStorage.setItem("companyName", tempCompanyName.trim());
      user.companyName = tempCompanyName.trim();
    }
    setIsEditingName(false);
  };

  const handleNameKeyDown = (e) => {
    if (e.key === "Enter") {
      handleNameSave();
    } else if (e.key === "Escape") {
      setTempCompanyName(user.companyName || "");
      setIsEditingName(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
  <>
    {/* BOTÓN HAMBURGUESA (solo móvil) */}
    <button
      className="sidebar__hamburger"
      onClick={toggleMobileMenu}
      aria-label="Toggle menu"
    >
      <span className="sidebar__hamburger-line"></span>
      <span className="sidebar__hamburger-line"></span>
      <span className="sidebar__hamburger-line"></span>
    </button>

    {/* OVERLAY (solo móvil cuando está abierto) */}
    {isMobileMenuOpen && (
      <div
        className="sidebar__overlay"
        onClick={toggleMobileMenu}
      />
    )}

    {/* SIDEBAR */}
    <aside className={`sidebar ${isMobileMenuOpen ? "sidebar--open" : ""}`}>
      <div className="sidebar__card">
        {/* BOTÓN CERRAR (solo móvil) */}
        <button
          className="sidebar__close"
          onClick={toggleMobileMenu}
          aria-label="Close menu"
        >
          ✕
        </button>

        {/* LOGO KEEPCLIENT CON TEXTO */}
        <div className="sidebar__branding">
          <img
            src={logoIcon}
            alt="KeepClient"
            className="sidebar__logo-icon"
          />
          <span className="sidebar__logo-text">KeepClient</span>
        </div>

        {/* LOGO EMPRESA (editable por Owner) */}
        <div className="sidebar__company-logo">
          {user.companyLogo ? (
            <img
              src={user.companyLogo}
              alt="Company logo"
              className="sidebar__company-image"
              onClick={handleLogoClick}
              style={{ cursor: isOwner(user) ? "pointer" : "default" }}
            />
          ) : (
            <div
              className="sidebar__company-placeholder"
              style={{ backgroundImage: `url(${placeholderLogo})` }}
              onClick={handleLogoClick}
            />
          )}
          {isOwner(user) && (
            <>
              <button
                className="sidebar__edit-logo"
                onClick={handleLogoClick}
                aria-label="Edit logo"
              >
                <img src={editIcon} alt="Edit" className="sidebar__edit-icon-img" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoChange}
                style={{ display: "none" }}
              />
            </>
          )}
        </div>

        {/* NOMBRE EMPRESA (editable por Owner) */}
        <div className="sidebar__company-name">
          {isEditingName ? (
            <input
              type="text"
              value={tempCompanyName}
              onChange={(e) => setTempCompanyName(e.target.value)}
              onBlur={handleNameSave}
              onKeyDown={handleNameKeyDown}
              className="sidebar__company-name-input"
              autoFocus
              maxLength={50}
            />
          ) : user.companyName ? (
            <h2
              className="sidebar__company-name-text"
              onClick={handleNameClick}
              style={{ cursor: isOwner(user) ? "pointer" : "default" }}
            >
              {user.companyName}
            </h2>
          ) : (
            <div
              className="sidebar__company-name-placeholder"
              onClick={handleNameClick}
            >
              <span className="sidebar__company-name-placeholder-text">
                {lang === "es" ? "Nombre del negocio" : "Business name"}
              </span>
            </div>
          )}
          {isOwner(user) && !isEditingName && (
            <button
              className="sidebar__edit-company-name"
              onClick={handleNameClick}
              aria-label="Edit company name"
            >
              <img src={editIcon} alt="Edit" className="sidebar__edit-icon-small" />
            </button>
          )}
        </div>

        {/* NAVEGACIÓN */}
        <nav className="sidebar__nav">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar__link ${
                isActive(item.path) ? "sidebar__link--active" : ""
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  </>
);
}