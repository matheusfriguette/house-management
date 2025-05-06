"use client";

import { createContext, useCallback, useContext, useState } from "react";

import { Alert, AlertActions, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

type AlertOptions = {
  title: string;
  description?: string;
  onClose?: () => void;
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
    alert?.onClose?.();
    setAlert(null);
    setIsOpen(false);
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      {alert && (
        <Alert open={isOpen} onClose={setIsOpen}>
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.description && <AlertDescription>{alert.description}</AlertDescription>}
          <AlertActions>
            <Button plain onClick={() => setAlert(null)}>
              Cancelar
            </Button>
            <Button onClick={handleConfirm}>Confirmar</Button>
          </AlertActions>
        </Alert>
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
