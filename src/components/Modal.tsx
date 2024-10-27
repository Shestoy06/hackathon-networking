import React from 'react';
import {Icon28CloseAmbient} from "@telegram-apps/telegram-ui/dist/icons/28/close_ambient";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children } : ModalProps) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-40 bg-black bg-opacity-50 transition-opacity duration-150 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-[#1E2337] p-6 rounded-lg shadow-lg transform transition-transform duration-150 absolute bottom-0 w-full ${
          isOpen ? 'translate-y-0' : 'translate-y-10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
        <button className="absolute top-2 right-2 text-xl" onClick={onClose}><Icon28CloseAmbient/></button>
      </div>
    </div>
  );
};

export default Modal;
