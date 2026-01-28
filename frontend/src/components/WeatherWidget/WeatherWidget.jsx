import { useState, useEffect } from "react";
import { useLanguage } from "../../app/i18n/LanguageContext";
import { getWeatherImage } from "../../utils/weatherImages";

export default function WeatherWidget() {
  const { lang } = useLanguage();
  
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Actualizar hora cada minuto
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // 60000ms = 1 minuto

    return () => clearInterval(timer); // Limpiar al desmontar
  }, []);

  // Obtener clima
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
        const city = "Málaga";
        const apiLang = lang === "es" ? "es" : "en";
        
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&lang=${apiLang}`
        );
        
        if (!response.ok) {
          throw new Error("Error al obtener datos del clima");
        }
        
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [lang]);

  // Formatear hora
  const formatTime = (date) => {
    return date.toLocaleTimeString(lang === "es" ? "es-ES" : "en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: lang === "en" // 12h para inglés, 24h para español
    });
  };

  // Formatear fecha
  const formatDate = (date) => {
    return date.toLocaleDateString(lang === "es" ? "es-ES" : "en-US", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  };

  if (loading) {
    return (
      <div className="weather-widget weather-widget--loading">
        <p className="weather-widget__message">Cargando clima...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="weather-widget weather-widget--error">
        <p className="weather-widget__message">No disponible</p>
      </div>
    );
  }

  if (!weather) return null;

  const customImage = getWeatherImage(weather.current.condition.code);
  const weatherIcon = customImage || weather.current.condition.icon;

  return (
    <div className="weather-widget">
      {/* Hora */}
      <time className="weather-widget__time">
        {formatTime(currentTime)}
      </time>

      {/* Temperatura e icono */}
      <div className="weather-widget__header">
        <img 
          src={weatherIcon} 
          alt={weather.current.condition.text}
          className="weather-widget__icon"
        />
        <span className="weather-widget__temp">
          {Math.round(weather.current.temp_c)}°C
        </span>
      </div>
      
      {/* Condición */}
      <p className="weather-widget__condition">
        {weather.current.condition.text}
      </p>
      
      {/* Fecha */}
      <time className="weather-widget__date">
        {formatDate(currentTime)}
      </time>
    </div>
  );
}