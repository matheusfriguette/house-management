"use client";

import { createContext, useCallback, useContext, useState } from "react";

import { ResponsiveAlert } from "@/components/responsive-alert";
import { Button } from "@/components/ui/button";

type AlertOptions = {
  title: string;
  description?: string;
  onConfirm?: () => void;
};

type AlertContextType = {
  showAlert: (options: AlertOptions) => void;
};

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [alert, setAlert] = useState<AlertOptions | null>(null);

  const showAlert = useCallback((options: AlertOptions) => {
    setAlert(options);
    setIsOpen(true);
  }, []);

  const handleConfirm = () => {
    alert?.onConfirm?.();
    setAlert(null);
    setIsOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <ResponsiveAlert
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          title={alert.title}
          description={alert.description}
          footer={
            <>
              <Button outline onClick={() => setAlert(null)}>
                Cancelar
              </Button>
              <Button onClick={handleConfirm}>Confirmar</Button>
            </>
          }
        />
      )}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within AlertProvider");
  }
  return context;
}
