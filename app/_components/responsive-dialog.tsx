import * as React from "react";

import { useMediaQuery } from "usehooks-ts";

import {
  Drawer,
  DrawerActions,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function ResponsiveDialog({
  open,
  onOpenChange,
  title,
  trigger,
  footer,
  children,
}: React.ComponentProps<"div"> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  trigger: React.ReactNode;
  footer?: React.ReactNode;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <div></div>
      // <Dialog open={open} onOpenChange={onOpenChange}>
      //   <DialogTrigger asChild>{trigger}</DialogTrigger>
      //   <DialogContent>
      //     <DialogHeader>
      //       <DialogTitle>{title}</DialogTitle>
      //     </DialogHeader>
      //     {children}
      //     {footer && <DialogFooter>{footer}</DialogFooter>}
      //   </DialogContent>
      // </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
        </DrawerHeader>
        {children}
        {footer && <DrawerActions>{footer}</DrawerActions>}
      </DrawerContent>
    </Drawer>
  );
}

export function ResponsiveDialogFooter({
  children,
}: React.ComponentProps<"div">) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return <div>{children}</div>;
  }

  return <DrawerActions>{children}</DrawerActions>;
}
