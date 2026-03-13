import { useState, useMemo } from "react";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { useAuth } from "../../app/auth/AuthContext";

export default function Retention() {
  const { lang } = useLanguage();
  const { user } = useAuth();

  // TODO: Estos datos vendrán del backend en el futuro
  // Por ahora usamos mock data para desarrollo
  const [clients] = useState([
    {
      id: "client-1",
      nombre: "Laura Gómez",
      ultimaVisita: "2024-01-11",
      diasDesdeUltimaVisita: 19,
      estado: "Recurrente",
      primeraVisita: "2023-12-01",
      totalVisitas: 5,
      comoConocio: "Instagram"
    },
    {
      id: "client-2",
      nombre: "Martín López",
      ultimaVisita: "2024-01-15",
      diasDesdeUltimaVisita: 15,
      estado: "Nuevo",
      primeraVisita: "2024-01-15",
      totalVisitas: 1,
      comoConocio: "Google"
    },
    {
      id: "client-3",
      nombre: "María Rivera",
      ultimaVisita: "2024-01-19",
      diasDesdeUltimaVisita: 11,
      estado: "Nuevo",
      primeraVisita: "2024-01-19",
      totalVisitas: 1,
      comoConocio: "Recomendación"
    },
    {
      id: "client-4",
      nombre: "Andrea Mora",
      ultimaVisita: "2023-11-14",
      diasDesdeUltimaVisita: 77,
      estado: "Inactivo",
      primeraVisita: "2023-10-01",
      totalVisitas: 3,
      comoConocio: "Booksy"
    }
  ]);

  // Calcular métricas automáticamente
  const metricas = useMemo(() => {
    const total = clients.length;
    const recurrentes = clients.filter(c => c.estado === "Recurrente").length;
    const nuevos = clients.filter(c => c.estado === "Nuevo").length;
    const inactivos = clients.filter(c => c.diasDesdeUltimaVisita > 60).length;
    
    const tasaRecurrentes = total > 0 ? Math.round((recurrentes / total) * 100) : 0;
    
    // Clientes nuevos que regresaron (conversión primera → segunda visita)
    const clientesNuevos = clients.filter(c => c.primeraVisita);
    const clientesQueRegresaron = clientesNuevos.filter(c => c.totalVisitas >= 2);
    const conversionNuevos = clientesNuevos.length > 0 
      ? Math.round((clientesQueRegresaron.length / clientesNuevos.length) * 100) 
      : 0;

    return {
      total,
      recurrentes,
      nuevos,
      inactivos,
      tasaRecurrentes,
      conversionNuevos
    };
  }, [clients]);

  // Generar análisis automático
  const analisis = useMemo(() => {
    const mensajes = [];
    
    // Análisis de retención general
    if (metricas.tasaRecurrentes >= 80) {
      mensajes.push({
        tipo: "success",
        texto: lang === "es"
          ? `¡Vas increíble! Tu retención de clientes recurrentes (${metricas.tasaRecurrentes}%) está por encima del estándar de la industria (50-70%).`
          : `You're doing great! Your recurring client retention (${metricas.tasaRecurrentes}%) is above industry standard (50-70%).`
      });
    } else if (metricas.tasaRecurrentes >= 50) {
      mensajes.push({
        tipo: "info",
        texto: lang === "es"
          ? `Vas bien. Tu tasa de retención (${metricas.tasaRecurrentes}%) está en rango saludable.`
          : `You're doing well. Your retention rate (${metricas.tasaRecurrentes}%) is in a healthy range.`
      });
    } else {
      mensajes.push({
        tipo: "warning",
        texto: lang === "es"
          ? `Atención: Tu retención (${metricas.tasaRecurrentes}%) está por debajo del promedio de la industria (50-70%). Esto puede indicar problemas en experiencia de cliente o seguimiento.`
          : `Warning: Your retention (${metricas.tasaRecurrentes}%) is below industry average (50-70%). This may indicate issues with client experience or follow-up.`
      });
    }
    
    // Clientes inactivos
    if (metricas.inactivos > 0) {
      mensajes.push({
        tipo: "warning",
        texto: lang === "es"
          ? `Tienes ${metricas.inactivos} cliente${metricas.inactivos > 1 ? 's' : ''} que no ha${metricas.inactivos > 1 ? 'n' : ''} vuelto en más de 60 días.`
          : `You have ${metricas.inactivos} client${metricas.inactivos > 1 ? 's' : ''} who haven't returned in over 60 days.`
      });
    }
    
    // Conversión de nuevos
    if (metricas.conversionNuevos >= 60) {
      mensajes.push({
        tipo: "success",
        texto: lang === "es"
          ? `Tu conversión de clientes nuevos (${metricas.conversionNuevos}%) es extraordinaria.`
          : `Your new client conversion (${metricas.conversionNuevos}%) is extraordinary.`
      });
    } else if (metricas.conversionNuevos < 35 && metricas.conversionNuevos > 0) {
      mensajes.push({
        tipo: "warning",
        texto: lang === "es"
          ? `Solo ${metricas.conversionNuevos}% de tus clientes nuevos regresa (promedio industria: 35%). Revisa la experiencia de primera visita.`
          : `Only ${metricas.conversionNuevos}% of your new clients return (industry average: 35%). Review the first-visit experience.`
      });
    }

    return mensajes;
  }, [metricas, lang]);

  // Solo owner puede ver esta página
  if (user.role !== "owner") {
    return (
      <div style={{ padding: 24 }}>
        <p>{lang === "es" ? "No tienes permisos para ver esta página." : "You don't have permission to view this page."}</p>
      </div>
    );
  }

  return (
    <section className="retention">
      <header className="retention__header">
        <h1 className="retention__title">
          {lang === "es" ? "Seguimientos" : "Retention"}
        </h1>
      </header>

      <main className="retention__content">
        {/* ANÁLISIS AUTOMÁTICO */}
        <section className="retention__analysis">
          <h2 className="retention__analysis-title">
            📊 {lang === "es" ? "Análisis de retención" : "Retention analysis"}
          </h2>
          <div className="retention__analysis-messages">
            {analisis.map((mensaje, index) => (
              <div key={index} className={`retention__analysis-message retention__analysis-message--${mensaje.tipo}`}>
                {mensaje.texto}
              </div>
            ))}
          </div>
        </section>

        {/* KPIs PRINCIPALES */}
        <section className="retention__kpis">
          <div className="retention__kpi-card">
            <div className="retention__kpi-icon">🟢</div>
            <div className="retention__kpi-content">
              <span className="retention__kpi-label">
                {lang === "es" ? "Recurrentes" : "Recurring"}
              </span>
              <span className="retention__kpi-value">{metricas.recurrentes}</span>
              <span className="retention__kpi-percent">({metricas.tasaRecurrentes}%)</span>
            </div>
          </div>

          <div className="retention__kpi-card">
            <div className="retention__kpi-icon">🟡</div>
            <div className="retention__kpi-content">
              <span className="retention__kpi-label">
                {lang === "es" ? "Nuevos" : "New"}
              </span>
              <span className="retention__kpi-value">{metricas.nuevos}</span>
            </div>
          </div>

          <div className="retention__kpi-card">
            <div className="retention__kpi-icon">🔴</div>
            <div className="retention__kpi-content">
              <span className="retention__kpi-label">
                {lang === "es" ? "Inactivos" : "Inactive"}
              </span>
              <span className="retention__kpi-value">{metricas.inactivos}</span>
            </div>
          </div>
        </section>

       {/* CLIENTES INACTIVOS */}
{metricas.inactivos > 0 && (
  <section className="retention__inactive">
    <h2 className="retention__section-title">
      🔴 {lang === "es" 
        ? "Clientes que no han vuelto en más de 60 días" 
        : "Clients who haven't returned in over 60 days"}
    </h2>
    <div className="retention__inactive-list">
      {clients
        .filter(c => c.diasDesdeUltimaVisita > 60)
        .sort((a, b) => b.diasDesdeUltimaVisita - a.diasDesdeUltimaVisita)
        .map(client => (
          <div key={client.id} className="retention__inactive-item">
            <div className="retention__inactive-info">
              <span className="retention__inactive-name">{client.nombre}</span>
              <span className="retention__inactive-days">
                {client.diasDesdeUltimaVisita} {lang === "es" ? "días" : "days"}
              </span>
            </div>
            <button className="retention__inactive-button">
              📲 {lang === "es" ? "Enviar recordatorio" : "Send reminder"}
            </button>
          </div>
        ))}
    </div>
  </section>
)}

{/* DISTRIBUCIÓN POR ORIGEN */}
<section className="retention__origin">
  <h2 className="retention__section-title">
    📍 {lang === "es" ? "¿Cómo te conocieron?" : "How did they find you?"}
  </h2>
  <div className="retention__origin-grid">
    {(() => {
      // Iconos por canal
      const channelIcons = {
        "Instagram": { icon: "📸", color: "#E4405F" },
        "Google": { icon: "🔍", color: "#4285F4" },
        "Recomendación": { icon: "💬", color: "#10b981" },
        "Booksy": { icon: "📅", color: "#7C3AED" },
        "TikTok": { icon: "🎵", color: "#000000" },
        "Pasó por el local": { icon: "🚶", color: "#f59e0b" },
        "Recibió un volante": { icon: "📄", color: "#3b82f6" },
        "Otro": { icon: "📌", color: "#6b7280" },
        "No especificado": { icon: "❓", color: "#9ca3af" }
      };

      // Agrupar clientes por origen
      const origenCount = clients.reduce((acc, client) => {
        const origen = client.comoConocio || "No especificado";
        acc[origen] = (acc[origen] || 0) + 1;
        return acc;
      }, {});

      // Convertir a array y ordenar por cantidad
      const origenArray = Object.entries(origenCount)
        .map(([origen, count]) => ({
          origen,
          count,
          percent: Math.round((count / clients.length) * 100),
          ...channelIcons[origen] || channelIcons["Otro"]
        }))
        .sort((a, b) => b.count - a.count);

      return origenArray.map(({ origen, count, percent, icon, color }) => (
        <div key={origen} className="retention__origin-card">
          <div 
            className="retention__origin-card-icon"
            style={{ backgroundColor: `${color}15`, color: color }}
          >
            {icon}
          </div>
          <div className="retention__origin-card-content">
            <span className="retention__origin-card-label">{origen}</span>
            <div className="retention__origin-card-stats">
              <span className="retention__origin-card-count">
                {count} {lang === "es" 
                  ? `cliente${count !== 1 ? 's' : ''}` 
                  : `client${count !== 1 ? 's' : ''}`}
              </span>
              <span className="retention__origin-card-percent">{percent}%</span>
            </div>
          </div>
        </div>
      ));
    })()}
  </div>
</section>
      </main>
    </section>
  );
}