import type { ReactNode } from "react";
import { createPortal } from "react-dom";

export const Modal = ({ children }: { children: ReactNode }) => {
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-2xl">
      {children}
    </div>,
    modalRoot,
  );
};
