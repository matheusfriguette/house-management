"use client";

import { Transition } from "@headlessui/react";
import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { createContext, useCallback, useContext, useState } from "react";

const styles = {
  base: "pointer-events-auto w-full max-w-sm overflow-hidden rounded-2xl shadow-lg ring-1",
  states: {
    default: ["bg-white ring-black/10 dark:bg-zinc-900 dark:ring-white/10 text-zinc-950 dark:text-white"],
    success: ["text-white bg-green-500 ring-green-600/90 dark:bg-green-400 dark:bg-green-500/90"],
    error: ["text-white bg-red-500 ring-red-600/90 dark:bg-red-400 dark:bg-red-500/90"],
  },
};

const icons = {
  default: "",
  success: <CheckCircleIcon className="mr-3 h-6 w-6" />,
  error: <ExclamationCircleIcon className="mr-3 h-6 w-6" />,
};

type ToastOptions = { message: string; state?: keyof typeof styles.states };
type ToastContextType = {
  showToast: (options: ToastOptions) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ToastOptions>({
    message: "",
    state: "default",
  });

  const showToast = useCallback(({ message, state = "default" }: ToastOptions) => {
    setOptions({ message, state });
    setIsOpen(true);
    setTimeout(() => setIsOpen(false), 3000);
  }, []);

  const classes = clsx(styles.base, clsx(styles.states[options.state ?? "default"]));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-50 flex items-end px-4 py-6 sm:items-end sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={isOpen}
            enter="transform transition ease-out duration-300"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={classes}>
              <div className="p-4">
                <div className="flex items-start">
                  {icons[options.state ?? "default"]}
                  <div className="w-0 flex-1 pt-0.5">
                    <p className="text-sm font-medium">{options.message}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <button
                      onClick={() => setIsOpen(false)}
                      className="inline-flex focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 focus:outline-none"
                    >
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
