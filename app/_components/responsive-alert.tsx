import * as React from "react";
import { useMediaQuery } from "usehooks-ts";

import { Alert, AlertActions, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Drawer,
  DrawerActions,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

export function ResponsiveAlert({
  isOpen,
  setIsOpen,
  title,
  description,
  footer,
}: React.ComponentProps<"div"> & {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  description?: string;
  footer?: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Alert open={isOpen} onClose={setIsOpen}>
        <AlertTitle>{title}</AlertTitle>
        {description && <AlertDescription>{description}</AlertDescription>}
        {footer && <AlertActions>{footer}</AlertActions>}
      </Alert>
    );
  }

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {footer && <DrawerActions>{footer}</DrawerActions>}
      </DrawerContent>
    </Drawer>
  );
}
