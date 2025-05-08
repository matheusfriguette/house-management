import { Slot } from "@radix-ui/react-slot";
import * as React from "react";
import { useMediaQuery } from "usehooks-ts";

import { Dialog, DialogActions, DialogBody, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerActions, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";

export function ResponsiveDialog({
  isOpen,
  setIsOpen,
  title,
  trigger,
  footer,
  asForm,
  onSubmit,
  children,
}: React.ComponentProps<"div"> & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  trigger: React.ReactNode;
  footer?: React.ReactNode;
  asForm?: boolean;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <>
        <Slot onClick={() => setIsOpen(true)}>{trigger}</Slot>

        <Dialog open={isOpen} onClose={setIsOpen}>
          {asForm ? (
            <form onSubmit={onSubmit}>
              <DialogTitle>{title}</DialogTitle>
              <DialogBody>{children}</DialogBody>
              {footer && <DialogActions>{footer}</DialogActions>}
            </form>
          ) : (
            <>
              <DialogTitle>{title}</DialogTitle>
              <DialogBody>{children}</DialogBody>
              {footer && <DialogActions>{footer}</DialogActions>}
            </>
          )}
        </Dialog>
      </>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {asForm ? (
          <form className="flex flex-col gap-4" onSubmit={onSubmit}>
            {children}
            {footer && <DrawerActions>{footer}</DrawerActions>}
          </form>
        ) : (
          <>
            {children}
            {footer && <DrawerActions>{footer}</DrawerActions>}
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}
