import { quotes } from "../../app/i18n/quotes";
import { messages } from "../../app/i18n/messages";
import { authUser } from "../../app/auth/authUser";
import { useLanguage } from "../../app/i18n/LanguageContext";

export default function Home() {
  // ✅ Ahora traemos también toggleLanguage
  const { lang, toggleLanguage } = useLanguage();

  // ✅ Usuario mock (mañana será autenticación real)
  const user = authUser;

  const greetingTemplate = messages[lang].home.greeting;
  const greeting = greetingTemplate.replace("{name}", user.name);

  // Tomamos la lista de frases según idioma
  const list = quotes[lang];

  // Elegimos una frase al azar
  const randomIndex = Math.floor(Math.random() * list.length);
  const quote = list[randomIndex];

  return (
    <section className="home">
      {/* TOGGLE TEMPORAL - SOLO PARA PRUEBAS */}
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
      </button>

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
      </main>
    </section>
  );
}