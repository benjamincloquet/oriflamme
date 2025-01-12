import { CardConfig, CardId, getCardConfig } from "@/lib/card";
import { Family, FamilyId, getFamily } from "@/lib/family";

export type PlayerCard = {
  cardConfig: CardConfig;
  family: Family;
  handIndex?: number;
};

export const serializePlayerCard = (card: PlayerCard): string => {
  return `${card.family.id}-${card.cardConfig.id}`;
};

export const deserializePlayerCard = (serializedCard: string): PlayerCard => {
  const [familyId, cardId] = serializedCard.split("-");
  return {
    family: getFamily(familyId as FamilyId),
    cardConfig: getCardConfig(cardId as CardId),
  };
};

export const equalsPlayerCard = (a: PlayerCard, b: PlayerCard): boolean => {
  return serializePlayerCard(a) === serializePlayerCard(b);
};
