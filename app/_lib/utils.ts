import { Priority } from "@/lib/types";

export function getPriorityBadge(priority: Priority) {
  const badge: {
    [priority]: { color: "red" | "yellow" | "green"; label: string };
  } = {
    high: {
      color: "red",
      label: "Alta",
    },
    medium: {
      color: "yellow",
      label: "Média",
    },
    low: {
      color: "green",
      label: "Baixa",
    },
  };

  return badge[priority];
}

export function formatMoney(value: number) {
  return Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}
