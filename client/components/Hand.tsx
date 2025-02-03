import { JSX } from "react";
import {
  equalsPlayerCard,
  PlayerCard,
  serializePlayerCard,
} from "@/lib/player";
import { InteractiveCard } from "@/components/InteractiveCard";
import { CardDropTargetOutline } from "./CardDropTargetOutline";
import { useCardInteraction } from "@/contexts/CardInteractionContext";

type HandProps = {
  cards: Array<PlayerCard>;
  onCardsChanged: (card: PlayerCard[]) => void;
};

export function Hand({ cards, onCardsChanged }: HandProps): JSX.Element {
  const {
    CardDropTarget,
    canReceiveSelectedCard,
    selectedCard,
    selectCard,
    toggleCardSelection,
  } = useCardInteraction({
    cards,
    onCardAdded: (card) => onCardsChanged([...cards, card]),
    onCardRemoved: (removedCard) =>
      onCardsChanged(
        cards.filter((card) => !equalsPlayerCard(removedCard, card))
      ),
  });

  return (
    <div className="relative h-52">
      <CardDropTargetOutline
        className="h-52 w-full"
        canDrop={canReceiveSelectedCard}
      >
        <CardDropTarget />
      </CardDropTargetOutline>
      <div className="absolute inset-2 flex">
        {cards.map((card) => (
          <InteractiveCard
            key={serializePlayerCard(card)}
            card={card}
            initial={{ zIndex: 20 }}
            whileDrag={{
              zIndex: 20 + cards.length,
            }}
            onClick={() => toggleCardSelection(card)}
            onDragStart={() => selectCard(card)}
            isSelected={Boolean(
              selectedCard && equalsPlayerCard(card, selectedCard)
            )}
            className="-mr-16 transition-margin hover:-mr-2"
          />
        ))}
      </div>
    </div>
  );
}
