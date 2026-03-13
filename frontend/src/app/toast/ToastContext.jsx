import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  // Agregar un nuevo toast
  const addToast = useCallback((message, variant = "success", duration = 4000) => {
    const id = Date.now();
    const newToast = { id, message, variant, duration };

    setToasts(prev => {
      // Limitar a máximo 3 toasts visibles
      const updatedToasts = [...prev, newToast];
      return updatedToasts.slice(-3);
    });

    // Auto-eliminar después de la duración especificada
    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }

    return id;
  }, []);

  // Eliminar un toast específico
  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  }, []);

  // Atajos para diferentes tipos de toast
  const toast = {
    success: (message, duration) => addToast(message, "success", duration),
    error: (message, duration) => addToast(message, "error", duration),
    info: (message, duration) => addToast(message, "info", duration),
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, toast }}>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast debe usarse dentro de ToastProvider");
  }
  return context;
}