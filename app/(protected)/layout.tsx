"use client";

import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Navbar, NavbarDivider, NavbarItem, NavbarLabel, NavbarSection, NavbarSpacer } from "@/components/ui/navbar";
import {
  Sidebar,
  SidebarBody,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from "@/components/ui/sidebar";
import { StackedLayout } from "@/components/ui/stacked-layout";

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();

  return (
    <StackedLayout
      navbar={
        <Navbar>
          <NavbarLabel>Casa</NavbarLabel>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            <NavbarItem href="/ambientes">Ambientes</NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            {theme === "light" ? (
              <Button plain onClick={() => setTheme("dark")}>
                <SunIcon />
              </Button>
            ) : (
              <Button plain onClick={() => setTheme("light")}>
                <MoonIcon />
              </Button>
            )}
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <SidebarLabel>House management</SidebarLabel>
          </SidebarHeader>
          <SidebarBody>
            <SidebarSection>
              <SidebarItem href="/ambientes">Ambientes</SidebarItem>
            </SidebarSection>
          </SidebarBody>
        </Sidebar>
      }
    >
      {children}
    </StackedLayout>
  );
}
