import { useState, useEffect } from "react";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { useAuth } from "../../app/auth/AuthContext";



export default function ClientModal({ isOpen, client, onClose, onSaveVisit, onDeleteClient }) {
  const { lang } = useLanguage();
  const { user } = useAuth();

  // Estado del formulario de nueva visita
  const [visitForm, setVisitForm] = useState({
    servicio: "",
    atendidoPor: "",
    seguimientoDias: "15",
    tareaDescripcion: "",
    notas: ""
  });

  // Historial mock (luego vendrá del backend)
  const historialVisitas = [
    {
      id: "visit-1",
      fecha: "2024-01-11",
      servicio: "Retoque de uñas",
      atendidoPor: "Ana García",
      notas: "Prefiere colores claros",
      precio: 25
    },
    {
      id: "visit-2",
      fecha: "2023-12-20",
      servicio: "Manicura completa",
      atendidoPor: "Ana García",
      notas: "Cliente puntual",
      precio: 30
    },
    {
      id: "visit-3",
      fecha: "2023-12-01",
      servicio: "Primera visita - Manicura",
      atendidoPor: "Sofía Martín",
      notas: "Cliente nueva, nos conoció por Instagram",
      precio: 30
    }
  ];

  // Cerrar con ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  // Prevenir scroll del body cuando modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handler para inputs del formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVisitForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handler para guardar nueva visita
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validación básica
    if (!visitForm.servicio || !visitForm.atendidoPor) {
      alert(lang === "es" 
        ? "Por favor completa servicio y quién atendió" 
        : "Please complete service and attended by");
      return;
    }

    // Llamar función del padre
    onSaveVisit({
      clientId: client.id,
      ...visitForm,
      fecha: new Date().toISOString().split('T')[0]
    });

    // Reset formulario
    setVisitForm({
      servicio: "",
      atendidoPor: "",
      seguimientoDias: "15",
      tareaDescripcion: "",
      notas: ""
    });
  };

  // No renderizar si no está abierto o no hay cliente
  if (!isOpen || !client) return null;

  return (
    <div className="client-modal">
      {/* OVERLAY */}
      <div className="client-modal__overlay" onClick={onClose}></div>

      {/* CONTENIDO DEL MODAL */}
      <div className="client-modal__content">
        {/* HEADER CON BOTÓN CERRAR */}
        <div className="client-modal__header">
          <h2 className="client-modal__title">{client.nombre}</h2>
          <button className="client-modal__close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* SCROLL CONTAINER */}
        <div className="client-modal__body">
          
          {/* SECCIÓN 1: INFORMACIÓN DEL CLIENTE */}
          <section className="client-modal__section">
            <h3 className="client-modal__section-title">
              {lang === "es" ? "Información del cliente" : "Client information"}
            </h3>
            <div className="client-modal__info-grid">
              <div className="client-modal__info-item">
                <span className="client-modal__info-label">
                  {lang === "es" ? "Teléfono:" : "Phone:"}
                </span>
                <span className="client-modal__info-value">{client.telefono}</span>
              </div>
              
              <div className="client-modal__info-item">
                <span className="client-modal__info-label">
                  {lang === "es" ? "Email:" : "Email:"}
                </span>
                <span className="client-modal__info-value">
                  {client.email || (lang === "es" ? "No registrado" : "Not registered")}
                </span>
              </div>

              <div className="client-modal__info-item">
                <span className="client-modal__info-label">
                  {lang === "es" ? "¿Cómo nos conoció?" : "How did they find us?"}
                </span>
                <span className="client-modal__info-value">{client.comoConocio}</span>
              </div>

              <div className="client-modal__info-item">
                <span className="client-modal__info-label">
                  {lang === "es" ? "Estado:" : "Status:"}
                </span>
                <span className={`client-modal__status-badge client-modal__status-badge--${client.estado.toLowerCase()}`}>
                  {client.estado}
                </span>
              </div>

              <div className="client-modal__info-item">
                <span className="client-modal__info-label">
                  {lang === "es" ? "Cliente desde:" : "Client since:"}
                </span>
                <span className="client-modal__info-value">
                  {new Date(client.creadoEn).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}
                </span>
              </div>
            </div>
          </section>

          {/* SECCIÓN 2: HISTORIAL DE VISITAS */}
          <section className="client-modal__section">
            <h3 className="client-modal__section-title">
              {lang === "es" ? "Historial de visitas" : "Visit history"}
            </h3>
            <div className="client-modal__history">
              <table className="client-modal__history-table">
                <thead>
                  <tr>
                    <th>{lang === "es" ? "Fecha" : "Date"}</th>
                    <th>{lang === "es" ? "Servicio" : "Service"}</th>
                    <th>{lang === "es" ? "Atendido por" : "Attended by"}</th>
                    <th>{lang === "es" ? "Notas" : "Notes"}</th>
                  </tr>
                </thead>
                <tbody>
                  {historialVisitas.map((visita) => (
                    <tr key={visita.id}>
                      <td>{new Date(visita.fecha).toLocaleDateString(lang === "es" ? "es-ES" : "en-US")}</td>
                      <td>{visita.servicio}</td>
                      <td>{visita.atendidoPor}</td>
                      <td className="client-modal__history-notes">{visita.notas}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECCIÓN 3: FORMULARIO NUEVA VISITA */}
          <section className="client-modal__section client-modal__section--form">
            <h3 className="client-modal__section-title">
              {lang === "es" ? "Registrar nueva visita" : "Register new visit"}
            </h3>
            <form className="client-modal__form" onSubmit={handleSubmit}>
              
              {/* FILA 1: Servicio + Quién atendió */}
              <div className="client-modal__form-row">
                <input
                  type="text"
                  name="servicio"
                  value={visitForm.servicio}
                  onChange={handleInputChange}
                  list="services-modal-list"
                  placeholder={lang === "es" ? "Servicio realizado *" : "Service performed *"}
                  className="client-modal__input"
                  required
                />
                <datalist id="services-modal-list">
                  <option value="Pedicura" />
                  <option value="Manicura" />
                  <option value="Retoque de uñas" />
                  <option value="Corte y barba" />
                  <option value="Nuevo set de pestañas" />
                </datalist>

                <select
                  name="atendidoPor"
                  value={visitForm.atendidoPor}
                  onChange={handleInputChange}
                  className="client-modal__select"
                  required
                >
                  <option value="">{lang === "es" ? "Quién atendió *" : "Attended by *"}</option>
                  <option value="staff-1">Ana García</option>
                  <option value="staff-2">Carlos Ruiz</option>
                  <option value="staff-3">Sofía Martín</option>
                </select>
              </div>

              {/* FILA 2: Seguimiento */}
              <div className="client-modal__form-row client-modal__form-row--followup">
                <label className="client-modal__label">
                  {lang === "es" ? "Crear seguimiento en:" : "Create follow-up in:"}
                </label>
                <div className="client-modal__followup-group">
                  <input
                    type="number"
                    name="seguimientoDias"
                    value={visitForm.seguimientoDias}
                    onChange={handleInputChange}
                    min="1"
                    max="365"
                    className="client-modal__input client-modal__input--days"
                  />
                  <span className="client-modal__followup-label">
                    {lang === "es" ? "días" : "days"}
                  </span>
                </div>
              </div>

              {/* FILA 3: Descripción tarea */}
              <div className="client-modal__form-row">
                <input
                  type="text"
                  name="tareaDescripcion"
                  value={visitForm.tareaDescripcion}
                  onChange={handleInputChange}
                  placeholder={lang === "es" 
                    ? "Descripción de la tarea (Ej. Enviar recordatorio de cita)" 
                    : "Task description (e.g. Send appointment reminder)"}
                  className="client-modal__input"
                />
              </div>

              {/* FILA 4: Notas */}
              <div className="client-modal__form-row">
                <textarea
                  name="notas"
                  value={visitForm.notas}
                  onChange={handleInputChange}
                  placeholder={lang === "es" 
                    ? "Notas sobre esta visita (opcional)" 
                    : "Notes about this visit (optional)"}
                  className="client-modal__textarea"
                  rows="3"
                />
              </div>

              {/* BOTONES */}
              <div className="client-modal__form-actions">
                <button type="submit" className="client-modal__button client-modal__button--primary">
                  {lang === "es" ? "Registrar visita" : "Register visit"}
                </button>
                <button 
                  type="button" 
                  onClick={onClose} 
                  className="client-modal__button client-modal__button--secondary"
                >
                  {lang === "es" ? "Cancelar" : "Cancel"}
                </button>
              </div>
            </form>
          </section>

          {/* SECCIÓN 4: ACCIONES (SOLO OWNER) */}
          {user.role === "owner" && (
            <section className="client-modal__section client-modal__section--actions">
              <div className="client-modal__actions">
                <button className="client-modal__action-button client-modal__action-button--edit">
                  {lang === "es" ? "✏️ Editar información" : "✏️ Edit information"}
                </button>
                <button 
                  className="client-modal__action-button client-modal__action-button--delete"
                  onClick={() => onDeleteClient(client.id)}
                >
                  {lang === "es" ? "🗑️ Eliminar cliente" : "🗑️ Delete client"}
                </button>
              </div>
            </section>
          )}

        </div>
      </div>
    </div>
  );
}