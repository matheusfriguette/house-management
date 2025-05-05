"use client";

import { ThemeSelector } from "@/components/theme-selector";
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
  return (
    <StackedLayout
      navbar={
        <Navbar>
          <NavbarLabel>House Management</NavbarLabel>
          <NavbarDivider className="max-lg:hidden" />
          <NavbarSection className="max-lg:hidden">
            <NavbarItem href="/ambientes">Ambientes</NavbarItem>
          </NavbarSection>
          <NavbarSpacer />
          <NavbarSection>
            <ThemeSelector />
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
