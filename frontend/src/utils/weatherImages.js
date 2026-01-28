// src/utils/weatherImages.js

// Importar todas las imágenes
import sunny from '../assets/images/weather/sunny.png';
import partlyCloudy from '../assets/images/weather/partly-cloudy.png';
import cloudy from '../assets/images/weather/cloudy.png';
import rain from '../assets/images/weather/rain.png';
import thunderstorm from '../assets/images/weather/thunderstorm.png';
import snow from '../assets/images/weather/snow.png';

/**
 * Mapeo de códigos de WeatherAPI a imágenes locales
 * Lista completa: https://www.weatherapi.com/docs/weather_conditions.json
 */
export const weatherImageMap = {
  // Soleado / Despejado
  1000: sunny,
  
  // Parcialmente nublado
  1003: partlyCloudy,
  
  // Nublado / Cubierto
  1006: cloudy,
  1009: cloudy,
  
  // Niebla / Neblina (usamos nublado por ahora)
  1030: cloudy,
  1135: cloudy,
  1147: cloudy,
  
  // Lluvia ligera / Llovizna
  1063: rain,
  1150: rain,
  1153: rain,
  1168: rain,
  1171: rain,
  1180: rain,
  1183: rain,
  1198: rain,
  1240: rain,
  
  // Lluvia moderada/fuerte
  1186: rain,
  1189: rain,
  1192: rain,
  1195: rain,
  1201: rain,
  1243: rain,
  1246: rain,
  
  // Tormenta
  1087: thunderstorm,
  1273: thunderstorm,
  1276: thunderstorm,
  1279: thunderstorm,
  1282: thunderstorm,
  
  // Nieve
  1066: snow,
  1114: snow,
  1117: snow,
  1204: snow,
  1207: snow,
  1210: snow,
  1213: snow,
  1216: snow,
  1219: snow,
  1222: snow,
  1225: snow,
  1237: snow,
  1249: snow,
  1252: snow,
  1255: snow,
  1258: snow,
  1261: snow,
  1264: snow,
};

/**
 * Obtiene la imagen correspondiente al código de clima
 * @param {number} code - Código de WeatherAPI
 * @returns {string} URL de la imagen
 */
export const getWeatherImage = (code) => {
  return weatherImageMap[code] || null;
};