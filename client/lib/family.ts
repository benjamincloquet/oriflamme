import { Database } from "@/lib/db";

export type Family = {
  id: string;
  name: string;
};

export const families = {
  red: { id: "red", name: "Red" },
  grey: { id: "grey", name: "Grey" },
  yellow: { id: "yellow", name: "Yellow" },
  blue: { id: "blue", name: "Blue" },
  green: { id: "green", name: "Green" },
} as const satisfies Database<Family>;

export type FamilyId = keyof typeof families;

export function getFamily(id: FamilyId): Family {
  return families[id];
}
