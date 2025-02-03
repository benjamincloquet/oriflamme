import { Database } from "@/lib/db";

export const families = {
  red: { id: "red", name: "Red" },
  grey: { id: "grey", name: "Grey" },
  yellow: { id: "yellow", name: "Yellow" },
  blue: { id: "blue", name: "Blue" },
  green: { id: "green", name: "Green" },
} as const satisfies Database<{
  id: string;
  name: string;
}>;

export type FamilyId = keyof typeof families;
export type Family<T extends FamilyId> = (typeof families)[T];

export function getFamily<T extends FamilyId>(id: T): Family<T> {
  return families[id];
}
