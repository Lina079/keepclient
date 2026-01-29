import { quotes } from "../../app/i18n/quotes";
import { messages } from "../../app/i18n/messages";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { useAuth } from "../../app/auth/AuthContext";
import { getTimePeriod } from "../../utils/timeGreeting";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Imágenes de placeholders
import agendaPlaceholder from "../../assets/images/placeholders/agenda.png";
import startTasksPlaceholder from "../../assets/images/placeholders/start-tasks.png";
import noTasksPlaceholder from "../../assets/images/placeholders/no-tasks.png";

export default function Home() {
  const { lang } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  // TAREAS MOCK (temporal - luego vendrán de la página Clientes)
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('keepclient-tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
  return [
    {
      id: "task-1",
      clientName: "Laura Gómez",
      description: lang === "es" 
        ? "Ofrecerle un 10% de descuento para que retorne."
        : "Offer a 10% discount to encourage return.",
      completed: false,
      priority: "high"
    },
    {
      id: "task-2",
      clientName: "Martín López",
      description: lang === "es"
        ? "Pregúntale si quedó satisfecho con su corte y barba."
        : "Ask if he was satisfied with his haircut and beard trim.",
      completed: false,
      priority: "high"
    },
    {
      id: "task-3",
      clientName: "Andrea Mora",
      description: lang === "es"
        ? "Invítala a agendar su cita de retoque."
        : "Invite her to schedule her touch-up appointment.",
      completed: false,
      priority: "medium"
    },
    {
      id: "task-4",
      clientName: "Javier Núñez",
      description: lang === "es"
        ? "Mándale un mensaje para agendar su próxima cita."
        : "Send a message to schedule his next appointment.",
      completed: false,
      priority: "low"
    }
  ];
});

  const handleToggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId
      ? { ...task, completed: !task.completed }
      : task
    ));
  };

  useEffect(() => {
    localStorage.setItem('keepclient-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const period = getTimePeriod();
  const greetingTemplate = messages[lang].home.greeting[period];
  const greeting = greetingTemplate.replace("{name}", user.name);

  const list = quotes[lang];
  const randomIndex = Math.floor(Math.random() * list.length);
  const quote = list[randomIndex];

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
        {/* PANEL AGENDA */}
        <section
          className="home__panel home__panel--agenda"
          aria-labelledby="agenda-title"
        >
          <h2 id="agenda-title" className="home__panel-title">
            {messages[lang].home.agendaTitle}
          </h2>

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

        {/* PANEL TAREAS */}
        <section
          className="home__panel home__panel--tasks"
          aria-labelledby="tasks-title"
        >
          <h2 id="tasks-title" className="home__panel-title">
            {messages[lang].home.tasksTitle}
          </h2>
          
          {tasks.length === 0 ? (
            //Caso 1: No hay tareas
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
          ) : tasks.every(task => task.completed) ? (
            //Caso 2: Todas las tareas completadas
            <div className="home__panel-empty">
              <img 
                src={noTasksPlaceholder}
                alt="All tasks completed"
                className="home__panel-empty-image"
              />
              <p className="home__panel-empty-text">
                {messages[lang].home.tasksAllCompleted}
              </p>
            </div>
          ) : (
            //Caso 3: Mostrar lista de tareas
            <ul className="home__task-list">
              {tasks.map((task) => (
                <li key={task.id} className="home__task-item">
                  <label className="home__task-label">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggleTask(task.id)}
                      className="home__task-checkbox"
                      aria-label={`Marcar como completada: ${task.clientName}`}
                    />
                    <div className="home__task-content">
                      <span className="home__task-client">{task.clientName}</span>
                      <span className="home__task-description">{task.description}</span>
                    </div>
                  </label>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>
    </section>
  );
}