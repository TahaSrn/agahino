// ui/Modal.jsx
import { useEffect, useRef } from "react";

function Modal({ isOpen, onClose, children, title }) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="animate-fadeIn fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
      <div
        ref={modalRef}
        className="bg-dark-800/95 animate-scaleIn max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-white/10 p-6 shadow-2xl"
      >
        {title && (
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-primary-100 font-sansBold text-xl">{title}</h2>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default Modal;
