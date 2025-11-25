import type { RegionKey } from "@/types/dashboard";

export const REGION_KEYS: RegionKey[] = ["almaty", "zhambyl", "turkestan", "aktobe"];

export const REGION_META: Record<RegionKey, { label: string; color: string }> = {
  almaty: { label: "Алматы", color: "#d32f2f" },
  zhambyl: { label: "Жамбыл", color: "#1976d2" },
  turkestan: { label: "Туркестан", color: "#388e3c" },
  aktobe: { label: "Актобе", color: "#ffa000" },
};

