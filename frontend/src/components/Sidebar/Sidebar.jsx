import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../app/auth/AuthContext";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { isOwner } from "../../app/auth/permissions";
import editIcon from "../../assets/icons/edit-icon.png";
import logoIcon from "../../assets/icons/logo-keepclient-icon.png";
import placeholderLogo from "../../assets/images/backgrounds/placeholder-logo-empresa.png";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";

export default function Sidebar() {
  const { user } = useAuth();
  const { lang } = useLanguage();
  const location = useLocation();
  const fileInputRef = useRef(null);

  // Estados locales para edición
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempCompanyName, setTempCompanyName] = useState(user.companyName || "");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLogoMenu, setShowLogoMenu] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    type: null,
    message: "",
  });

  const isActive = (path) => location.pathname === path;

  const navItems = [
    { path: "/", label: lang === "es" ? "Inicio" : "Home", icon: "🏠" },
    { path: "/clients", label: lang === "es" ? "Clientes" : "Clients", icon: "👥" },
    { path: "/retention", label: lang === "es" ? "Seguimientos" : "Follow-ups", icon: "✓" },
    { path: "/settings", label: lang === "es" ? "Ajustes" : "Settings", icon: "⚙️" },
  ];

  // Handler para cambiar logo
  const handleLogoClick = (e) => {
  if (isOwner(user) && user.companyLogo) {
    e.stopPropagation();
    setShowLogoMenu(!showLogoMenu);
  } else if (isOwner(user) && !user.companyLogo) {
    fileInputRef.current?.click();
  }
};

const handleChangeLogo = () => {
  setShowLogoMenu(false);
  setConfirmDialog({
    isOpen: true,
    type: "change",
    title: lang === "es" ? "¿Cambiar logo?" : "Change logo?",
    message: lang === "es" 
      ? "Se reemplazará el logo actual por uno nuevo." 
      : "The current logo will be replaced with a new one.",
  });
};

const handleLogoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      localStorage.setItem("companyLogo", imageUrl);
      user.companyLogo = imageUrl;
      setShowLogoMenu
      window.location.reload();
    };
    reader.readAsDataURL(file);
  }
};

const handleDeleteLogo = () => {
  setShowLogoMenu(false);
  setConfirmDialog({
    isOpen: true,
    type: "delete",
    title: lang === "es" ? "¿Eliminar logo?" : "Delete logo?",
    message: lang === "es"
      ? "El logo será eliminado y volverás al placeholder original."
      : "The logo will be deleted and you'll return to the original placeholder.",
  });
};

const handleConfirmAction = () => {
  if (confirmDialog.type === "change") {
    fileInputRef.current?.click();
  } else if (confirmDialog.type === "delete") {
    localStorage.removeItem("companyLogo");
    user.companyLogo = null;
    window.location.reload();
  }
  setConfirmDialog({ isOpen: false, type: null, title: "", message: "" });
};

const handleCancelAction = () => {
  setConfirmDialog({ isOpen: false, type: null, title: "", message: "" });
};

  // Handler para editar nombre
  const handleNameClick = () => {
    if (isOwner(user)) {
      setIsEditingName(true);
    }
  };

  const handleNameSave = () => {
  const trimmedName = tempCompanyName.trim();
  
  if (trimmedName === "") {
    // Si está vacío, borrar de localStorage y volver a null
    localStorage.removeItem("companyName");
    user.companyName = null;
  } else {
    // Guardar nombre válido
    localStorage.setItem("companyName", trimmedName);
    user.companyName = trimmedName;
  }
  
  setIsEditingName(false);
  // Forzar re-render
  window.location.reload();
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

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (showLogoMenu && !event.target.closest('.sidebar__company-logo')) {
      setShowLogoMenu(false);
    }
  };

  document.addEventListener('click', handleClickOutside);
  return () => document.removeEventListener('click', handleClickOutside);
}, [showLogoMenu]);

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
  <>
    <img
      src={user.companyLogo}
      alt="Company logo"
      className="sidebar__company-image"
      onClick={handleLogoClick}
      style={{ cursor: isOwner(user) ? "pointer" : "default" }}
    />
    
    {/* Ícono lápiz siempre visible */}
    {isOwner(user) && (
      <button
        className="sidebar__edit-logo-indicator"
        onClick={handleLogoClick}
        aria-label="Edit logo"
      >
        <img src={editIcon} alt="Edit" className="sidebar__edit-icon-img" />
      </button>
    )}
      
    {/* Menú contextual */}
    {isOwner(user) && showLogoMenu && (
    <div className="sidebar__logo-menu">
    <button
      className="sidebar__logo-menu-item"
      onClick={handleChangeLogo}
    >
      <span className="sidebar__logo-menu-icon">🔄</span>
      <span className="sidebar__logo-menu-text">
        {lang === "es" ? "Cambiar logo" : "Change logo"}
      </span>
    </button>
    <button
      className="sidebar__logo-menu-item sidebar__logo-menu-item--delete"
      onClick={handleDeleteLogo}
    >
      <span className="sidebar__logo-menu-icon">🗑️</span>
      <span className="sidebar__logo-menu-text">
        {lang === "es" ? "Eliminar logo" : "Delete logo"}
      </span>
    </button>
  </div>
)}    
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleLogoChange}
        style={{ display: "none" }}
      />
    </>
  ) : (
    <>
      <div
        className="sidebar__company-placeholder"
        style={{ backgroundImage: `url(${placeholderLogo})` }}
        onClick={handleLogoClick}
      />
      {isOwner(user) && (
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoChange}
          style={{ display: "none" }}
        />
      )}
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
    {/* Diálogo de confirmación */}
    <ConfirmDialog
      isOpen={confirmDialog.isOpen}
      title={confirmDialog.title}
      message={confirmDialog.message}
      confirmText={
        confirmDialog.type === "delete"
          ? lang === "es" ? "Eliminar" : "Delete"
          : lang === "es" ? "Cambiar" : "Change"
      }
      cancelText={lang === "es" ? "Cancelar" : "Cancel"}
      confirmVariant={confirmDialog.type === "delete" ? "danger" : "primary"}
      onConfirm={handleConfirmAction}
      onCancel={handleCancelAction}
    />
  </>
);
}