import { quotes } from "../../app/i18n/quotes";
import { messages } from "../../app/i18n/messages";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { useAuth } from "../../app/auth/AuthContext";
import { canAccessMetrics } from "../../app/auth/permissions";

export default function Home() {
  const { lang, toggleLanguage } = useLanguage();
  const { user } = useAuth();

  const greetingTemplate = messages[lang].home.greeting;
  const greeting = greetingTemplate.replace("{name}", user.name);

  const list = quotes[lang];
  const randomIndex = Math.floor(Math.random() * list.length);
  const quote = list[randomIndex];

  return (
    <section className="home">
     {/* TOGGLE TEMPORAL - SOLO PARA PRUEBAS *
      <button
        onClick={toggleLanguage}
        style={{
          position: "fixed",
          top: "20px",
          right: "20px",
          padding: "10px 20px",
          background: "#4a90e2",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
          zIndex: 1000,
        }}
      >
        {lang === "es" ? "EN" : "ES"}
      </button> */}

      {/* INDICADOR DE ROL TEMPORAL - SOLO PARA DESARROLLO 
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "20px",
          padding: "8px 16px",
          background: user.role === "owner" ? "#10b981" : "#f59e0b",
          color: "white",
          borderRadius: "8px",
          fontSize: "14px",
          fontWeight: "600",
          zIndex: 1000,
        }}
      >
        {user.role === "owner" ? "OWNER" : "STAFF"}
      </div> */}

      {/* HERO */}
      <header className="home__hero">
        <h1 className="home__title">{greeting}</h1>
        <p className="home__quote">{quote}</p>
      </header>

      {/* CONTENT */}
      <main className="home__content">
        <section
          className="home__panel home__panel--agenda"
          aria-labelledby="agenda-title"
        >
          <h2 id="agenda-title" className="home__panel-title">
            {messages[lang].home.agendaTitle}
          </h2>

          <ul className="home__list">
            <li className="home__item">
              10:00 - Semipermanente Sencillo con base nivelador • Marí Carmen
            </li>
            <li className="home__item">11:00 - Pedicura • Juan Pérez</li>
            <li className="home__item">
              16:00 - The Beauty Ritual Completo • Ana Gómez
            </li>
          </ul>
        </section>

        <section
          className="home__panel home__panel--tasks"
          aria-labelledby="tasks-title"
        >
          <h2 id="tasks-title" className="home__panel-title">
            {messages[lang].home.tasksTitle}
          </h2>
          <ul className="home__list">
            <li className="home__item">Escribir a Ana: 45 días sin volver</li>
            <li className="home__item">
              Confirmar cita de mañana (2 pendientes)
            </li>
            <li className="home__item">Revisar campaña de Instagram</li>
          </ul>
        </section>

        {/* PANEL SOLO VISIBLE PARA OWNER */}
        {canAccessMetrics(user) && (
          <section
            className="home__panel home__panel--metrics"
            aria-labelledby="metrics-title"
          >
            <h2 id="metrics-title" className="home__panel-title">
              📊 {lang === "es" ? "Métricas (solo Owner)" : "Metrics (Owner only)"}
            </h2>
            <ul className="home__list">
              <li className="home__item">
                {lang === "es" ? "Clientes activos: 56" : "Active clients: 56"}
              </li>
              <li className="home__item">
                {lang === "es" ? "Tasa de retención: 77%" : "Retention rate: 77%"}
              </li>
              <li className="home__item">
                {lang === "es" ? "Ingresos del mes: $4,230" : "Monthly revenue: $4,230"}
              </li>
            </ul>
          </section>
        )}
      </main>
    </section>
  );
}