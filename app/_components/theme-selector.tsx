"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

export function ThemeSelector() {
  const { setTheme } = useTheme();

  return (
    <>
      <Button onClick={() => setTheme("light")}>Light</Button>
      <Button onClick={() => setTheme("dark")}>Dark</Button>
    </>
  );
}
