import { useState, useEffect } from "react";

export default function Toast({ id, message, variant, duration, onClose }) {
  const [isExiting, setIsExiting] = useState(false);

  // Manejar animación de salida antes de eliminar
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose(id);
    }, 300); // Tiempo de la animación de salida
  };

  // Iconos según el variant
  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ"
  };

  return (
    <div className={`toast toast--${variant} ${isExiting ? 'toast--exiting' : ''}`}>
      <div className="toast__icon">
        {icons[variant]}
      </div>
      <p className="toast__message">{message}</p>
      <button 
        className="toast__close" 
        onClick={handleClose}
        aria-label="Cerrar notificación"
      >
        ✕
      </button>
    </div>
  );
}