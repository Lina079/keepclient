import { useState } from "react";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { useAuth } from "../../app/auth/AuthContext";

export default function Clients() {
  const { lang } = useLanguage();
  const { user } = useAuth();

// CLIENTES MOCK (temporal - luego vendrán de backend)
  const [clients, setClients] = useState([
    {
      id: "client-1",
      nombre: "Laura Gómez",
      telefono: "+34 983 2234",
      email: "laura@email.com",
      avatar: null, // Por ahora sin avatar
      comoConocio: "Instagram",
      ultimaVisita: {
        fecha: "2024-01-11", // Hace 19 días
        servicio: "Retoque de uñas",
        atendidoPor: "Ana García",
        notas: "Prefiere colores claros"
      },
      diasDesdeUltimaVisita: 19,
      estado: "Recurrente", // Nuevo/Recurrente/EnRiesgo/Inactivo
      creadoEn: "2023-12-01"
    },
    {
      id: "client-2",
      nombre: "Martín López",
      telefono: "+34 912 3456",
      email: null,
      avatar: null,
      comoConocio: "Google",
      ultimaVisita: {
        fecha: "2024-01-15", // Hace 15 días
        servicio: "Corte y barba",
        atendidoPor: "Carlos Ruiz",
        notas: "Cliente puntual, prefiere citas temprano"
      },
      diasDesdeUltimaVisita: 15,
      estado: "Nuevo",
      creadoEn: "2024-01-15"
    },
    {
      id: "client-3",
      nombre: "María Rivera",
      telefono: "+34 654 7890",
      email: "maria.r@email.com",
      avatar: null,
      comoConocio: "Recomendación",
      ultimaVisita: {
        fecha: "2024-01-19", // Hace 11 días
        servicio: "Nuevo set de pestañas",
        atendidoPor: "Sofía Martín",
        notas: "Hace 1 clario"
      },
      diasDesdeUltimaVisita: 11,
      estado: "Nuevo",
      creadoEn: "2024-01-19"
    },
    {
      id: "client-4",
      nombre: "Andrea Mora",
      telefono: "+34 678 1234",
      email: null,
      avatar: null,
      comoConocio: "Booksy",
      ultimaVisita: {
        fecha: "2023-11-14", // Hace 77 días
        servicio: "Retoque turno",
        atendidoPor: "Ana García",
        notas: "No confirmó última cita"
      },
      diasDesdeUltimaVisita: 77,
      estado: "Inactivo",
      creadoEn: "2023-10-01"
    }
  ]);
  // ESTADO DEL FORMULARIO RÁPIDO (temporal - luego se manejará con modales o rutas específicas)
 const [formData, setFormData] = useState({
    nombre: "", 
    telefono: "",
    email: "",
    comoConocio: "",
    servicio: "",
    atendidoPor: "",
    seguimientoDias: "15",
    tareaDescripcion: "",
    notas: "",
    busqueda: ""
 });

 const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
 };
  return (
    <section className="clients">
    <header className="clients__header">
      <h1 className="clients__title">
        {lang === "es" ? "Clientes" : "Clients"}
      </h1>
    </header>

    <main className="clients__content">
    {/* FORMULARIO RÁPIDO */}
<section className="clients__quick-form">
  <h2 className="clients__quick-form-title">
    {lang === "es" ? "Primera visita o cliente nuevo" : "First visit or new client"}
  </h2>
  
  <div className="clients__quick-form-content">
    <div className="clients__quick-form-fields">
      {/* FILA 1: Nombre + Teléfono */}
      <div className="clients__quick-form-row">
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleInputChange}
          placeholder={lang === "es" ? "Nombre del cliente" : "Client name"}
          className="clients__quick-input"
          />
          <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleInputChange}
          placeholder={lang === "es" ? "Teléfono" : "Phone"}
          className="clients__quick-input"
        />
      </div>

      {/* FILA 2: ¿Cómo nos conoció? + Servicio */}
      <div className="clients__quick-form-row">
        <select 
          className="clients__quick-select"
          name= "comoConocio"
          value={formData.comoConocio}
          onChange={handleInputChange}
        >
          <option value="">{lang === "es" ? "¿Cómo nos conoció?" : "How did you find us?"}</option>
          <option value="booksy">Booksy</option>
          <option value="google">Google</option>
          <option value="instagram">Instagram</option>
          <option value="tiktok">TikTok</option>
          <option value="walk-by">{lang === "es" ? "Pasó por el local" : "Walk-by"}</option>
          <option value="flyer">{lang === "es" ? "Recibió un volante" : "Flyer"}</option>
          <option value="referral">{lang === "es" ? "Recomendación" : "Referral"}</option>
          <option value="other">{lang === "es" ? "Otro" : "Other"}</option>
        </select>

        <input
          type="text"
          name="servicio"
          value={formData.servicio}
          onChange={handleInputChange}
          list="services-list"
          placeholder={lang === "es" ? "Servicio realizado" : "Service performed"}
          className="clients__quick-input"
        />
        <datalist id="services-list">
          <option value="Pedicura" />
          <option value="Manicura" />
          <option value="Retoque de uñas" />
          <option value="Corte y barba" />
          <option value="Nuevo set de pestañas" />
        </datalist>
        </div>

      {/* FILA 3: Quien atendió */}
      <div className="clients__quick-form-row">
        <select
         className="clients__quick-select"
         name="atendidoPor"
         value={formData.atendidoPor}
         onChange={handleInputChange}
        >
          <option value="">{lang === "es" ? "Quien atendió" : "Attended by"}</option>
          <option value="staff-1">Ana García</option>
          <option value="staff-2">Carlos Ruiz</option>
          <option value="staff-3">Sofía Martín</option>
        </select>
      </div>

      {/* FILA 3B: Seguimiento */}
      <div className="clients__quick-form-row clients__quick-form-row--followup">
        <label className="clients__quick-label">
          {lang === "es" ? "Crear seguimiento en:" : "Create follow-up in:"}
        </label>
        <div className="clients__followup-input-group">
          <input
            type="number"
            name="seguimientoDias"
            value={formData.seguimientoDias}
            onChange={handleInputChange}
            min="1"
            max="365"
            placeholder="15"
            className="clients__quick-input clients__quick-input--days"
          />
          <span className="clients__followup-label">{lang === "es" ? "días" : "days"}</span>
        </div>

        {/* DESCRIPCIÓN DE LA TAREA */}
        <input
          type="text"
          name="tareaDescripcion"
          value={formData.tareaDescripcion}
          onChange={handleInputChange}
          placeholder={lang === "es" 
            ? "Descripción de la tarea Ej. Recordar agendar próximo servicio o enviar promoción" 
            : "Task description: e.g. Remind to schedule next service or send a promotion"}
          className="clients__quick-input"
        />

        <span className="clients__followup-hint">
          {lang === "es" 
            ? "Esta tarea aparecerá en tu panel de inicio" 
            : "This task will appear on your home dashboard"}
        </span>
      </div>

      {/* FILA 4: Notas (opcional) */}
      <div className="clients__quick-form-row">
        <textarea
          name="notas"
          value={formData.notas}
          onChange={handleInputChange}
          placeholder={lang === "es" 
            ? "Notas sobre el cliente: ¿Le gustó el servicio? ¿Algún detalle a recordar para la próxima visita?" 
            : "Client notes: Did they like the service? Any details to remember for next visit?"}
          className="clients__quick-textarea"
          rows="3"
        />
      </div>

      {/* BOTONES */}
      <div className="clients__quick-form-actions">
        <button className="clients__quick-button clients__quick-button--primary">
          {lang === "es" ? "Registrar visita" : "Register visit"}
        </button>
        <button className="clients__quick-button clients__quick-button--secondary">
          {lang === "es" ? "Cancelar" : "Cancel"}
        </button>
      </div>
    </div>
  </div>
</section>
      {/* TABLA DE CLIENTES */}
      <div className="clients__table-container">
        {/* BARRA DE BÚSQUEDA */}
        <div className="clients__search-bar">
          <div className="clients__search-input-wrapper">
            <span className="clients__search-icon">🔍</span>
            <input
              type="text"
              name="busqueda"
              value={formData.busqueda}
              onChange={handleInputChange}
              placeholder={lang === "es" ? "Buscar cliente por nombre o teléfono" : "Search client by name or phone"}
              className="clients__search-input"
            />
          </div>
        </div>
        <table className="clients__table">
          <thead className="clients__table-head">
            <tr>
              <th className="clients__table-header">Nombre</th>
              <th className="clients__table-header">Teléfono</th>
              <th className="clients__table-header">Última Visita</th>
              <th className="clients__table-header">Estado</th>
              <th className="clients__table-header"></th>
            </tr>
          </thead>
          <tbody className="clients__table-body">
            {clients.map((client) => (
              <tr key={client.id} className="clients__table-row">
                <td className="clients__table-cell clients__table-cell--name">
                  <div className="clients__client-info">
                    <div className="clients__client-avatar">
                      {client.nombre.charAt(0)}
                    </div>
                    <div className="clients__client-details">
                      <span className="clients__client-name">{client.nombre}</span>
                      <span className="clients__client-service">{client.ultimaVisita.servicio}</span>
                    </div>
                  </div>
                </td>
                <td className="clients__table-cell">{client.telefono}</td>
                <td className="clients__table-cell">
                  <div className="clients__visit-info">
                    <span className="clients__visit-service">{client.ultimaVisita.servicio}</span>
                    <span className="clients__visit-date">Hace {client.diasDesdeUltimaVisita} días</span>
                  </div>
                </td>
                <td className="clients__table-cell">
                  <span className={`clients__status-badge clients__status-badge--${client.estado.toLowerCase()}`}>
                    {client.estado}
                  </span>
                </td>
                <td className="clients__table-cell clients__table-cell--action">
                  <button className="clients__action-button">›</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
       {/* PAGINACIÓN */}
        <div className="clients__pagination">
          <span className="clients__pagination-info">
            {lang === "es" ? "1-4 de 4 clientes" : "1-4 of 4 clients"}
          </span>
          <div className="clients__pagination-controls">
            <button className="clients__pagination-button clients__pagination-button--disabled" disabled>
              ‹
            </button>
            <button className="clients__pagination-button clients__pagination-button--active">
              1
            </button>
            <button className="clients__pagination-button">
              2
            </button>
            <button className="clients__pagination-button">
              3
            </button>
            <span className="clients__pagination-dots">...</span>
            <button className="clients__pagination-button">
              6
            </button>
            <button className="clients__pagination-button">
              ›
            </button>
          </div>
        </div>
      </div>
    </main>
  </section>
  );
}

