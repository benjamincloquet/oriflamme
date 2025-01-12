import { Database } from "./db";

export type CardConfig = {
  id: string;
  name: string;
};

export const cardConfigs = {
  archer: { id: "archer", name: "Archer" },
  soldier: { id: "soldier", name: "Soldier" },
  spy: { id: "spy", name: "Spy" },
  heir: { id: "heir", name: "Heir" },
  assassination: { id: "assassination", name: "Assassination" },
  "royal-decree": { id: "royal-decree", name: "Royal Decree" },
} as const satisfies Database<CardConfig>;

export type CardId = keyof typeof cardConfigs;

export function getCardConfig(id: CardId) {
  return cardConfigs[id];
}
