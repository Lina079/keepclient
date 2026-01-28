// src/utils/timeGreeting.js

/**
 * Determina el periodo del día según la hora actual del sistema
 * @returns {'morning' | 'afternoon' | 'evening'} Periodo del día
 */
export const getTimePeriod = () => {
  const hour = new Date().getHours();
  
  if (hour >= 6 && hour < 14) {
    return 'morning';      // 6:00 - 13:59
  } else if (hour >= 14 && hour < 21) {
    return 'afternoon';    // 14:00 - 20:59
  } else {
    return 'evening';      // 21:00 - 5:59
  }
};