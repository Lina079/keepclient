import { quotes } from "../../app/i18n/quotes";
import { messages } from "../../app/i18n/messages";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { useAuth } from "../../app/auth/AuthContext";
import { getTimePeriod } from "../../utils/timeGreeting";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";
import { useNavigate } from "react-router-dom";
// Imágenes de placeholders
import agendaPlaceholder from "../../assets/images/placeholders/agenda.png";
import startTasksPlaceholder from "../../assets/images/placeholders/start-tasks.png";
import noTasksPlaceholder from "../../assets/images/placeholders/no-tasks.png";

console.log("Periodo actual:", getTimePeriod());
console.log("API key cargada:", import.meta.env.VITE_WEATHER_API_KEY);

export default function Home() {
  const { lang, toggleLanguage } = useLanguage();
  const { user } = useAuth();

  const period = getTimePeriod();
  const greetingTemplate = messages[lang].home.greeting[period];
  const greeting = greetingTemplate.replace("{name}", user.name);

  const list = quotes[lang];
  const randomIndex = Math.floor(Math.random() * list.length);
  const quote = list[randomIndex];

  const navigate = useNavigate();
  const handleNewClient = () => {
    navigate("/clients");
  };

  return (
    <section className="home">
      {/* HERO */}
      <header className="home__hero">
        <div className="home__hero-text">
          <h1 className="home__title">{greeting}</h1>
          <p className="home__quote">{quote}</p>
        </div>
  
        <WeatherWidget />

        {/* BOTÓN NUEVO CLIENTE */}
        <button 
          className="home__cta-button"
          onClick={handleNewClient}
          aria-label={messages[lang].home.ctaNewClient}
          >
            <span className="home__cta-icon">+</span>
            <span className="home__cta-text">{messages[lang].home.ctaNewClient}</span>
          </button>
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
        {/* ESTADO VACÍO */}
      <div className="home__panel-empty">
      <img 
      src={agendaPlaceholder} 
      alt="Agenda placeholder"
      className="home__panel-empty-image"
      />
      <p className="home__panel-empty-text">
      {messages[lang].home.agendaEmpty}
      </p>
    </div>
  </section>
  <section
  className="home__panel home__panel--tasks"
  aria-labelledby="tasks-title"
>
  <h2 id="tasks-title" className="home__panel-title">
    {messages[lang].home.tasksTitle}
  </h2>

  {/* ESTADO VACÍO */}
  <div className="home__panel-empty">
    <img 
      src={startTasksPlaceholder} 
      alt="Start tasks placeholder"
      className="home__panel-empty-image"
    />
    <p className="home__panel-empty-text">
      {messages[lang].home.tasksEmpty}
    </p>
      </div>
    </section>
      </main>
    </section>
  );
}