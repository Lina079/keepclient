import { useEffect } from "react";

export default function ConfirmDialog({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  confirmVariant = "primary", // "primary" | "danger"
  onConfirm,
  onCancel,
}) {
  // Cerrar con tecla ESC
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isOpen) {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="confirm-dialog__overlay" onClick={onCancel} />

      {/* Dialog */}
      <div className="confirm-dialog">
        <div className="confirm-dialog__content">
          {/* Título */}
          <h3 className="confirm-dialog__title">{title}</h3>

          {/* Mensaje */}
          <p className="confirm-dialog__message">{message}</p>

          {/* Botones */}
          <div className="confirm-dialog__actions">
            <button
              className="confirm-dialog__button confirm-dialog__button--secondary"
              onClick={onCancel}
            >
              {cancelText}
            </button>
            <button
              className={`confirm-dialog__button confirm-dialog__button--${confirmVariant}`}
              onClick={onConfirm}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}