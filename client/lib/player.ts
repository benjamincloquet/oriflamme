import { CardConfig, cardConfigs, CardId, getCardConfig } from "@/lib/card";
import { Family, FamilyId, getFamily } from "@/lib/family";

export type PlayerCard = {
  cardConfig: CardConfig;
  family: Family;
  handIndex?: number;
};

export function serializePlayerCard(card: PlayerCard): string {
  return `${card.family.id}-${card.cardConfig.id}`;
}

export function deserializePlayerCard(serializedCard: string): PlayerCard {
  const [familyId, cardId] = serializedCard.split("-");
  return {
    family: getFamily(familyId as FamilyId),
    cardConfig: getCardConfig(cardId as CardId),
  };
}

export function equalsPlayerCard(a: PlayerCard, b: PlayerCard): boolean {
  return serializePlayerCard(a) === serializePlayerCard(b);
}

export type PlayerHand<T extends FamilyId> = {
  familyId: T;
  cards: PlayerCard[];
};

export type PlayerHands<T extends Array<FamilyId>> = Record<
  FamilyId,
  PlayerHand<T[number]>
>;

export function createPlayerHand<T extends FamilyId>(
  family: Family<T>
): PlayerHand<T> {
  return {
    familyId: family.id as T,
    cards: Object.values(cardConfigs).map((cardConfig) => ({
      cardConfig,
      family,
    })),
  };
}
