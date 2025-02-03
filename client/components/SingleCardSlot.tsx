import { equalsPlayerCard, PlayerCard } from "@/lib/player";
import { JSX } from "react";
import { CardDropTargetOutline } from "@/components/CardDropTargetOutline";
import { useCardInteraction } from "@/contexts/CardInteractionContext";
import { InteractiveCard } from "./InteractiveCard";

type SingleCardSlotProps = {
  card: PlayerCard | null;
  onCardChanged: (card: PlayerCard | null) => void;
};

export function SingleCardSlot({
  card,
  onCardChanged,
}: SingleCardSlotProps): JSX.Element {
  const {
    CardDropTarget,
    canReceiveSelectedCard,
    selectedCard,
    selectCard,
    toggleCardSelection,
  } = useCardInteraction({
    cards: card ? [card] : [],
    onCardAdded: onCardChanged,
    onCardRemoved: () => onCardChanged(null),
  });

  return (
    <div className="relative">
      <CardDropTargetOutline canDrop={canReceiveSelectedCard}>
        <CardDropTarget />
      </CardDropTargetOutline>
      {card ? (
        <div className="absolute top-0 left-0 z-40">
          <InteractiveCard
            card={card}
            isSelected={
              selectedCard ? equalsPlayerCard(selectedCard, card) : false
            }
            onClick={() => toggleCardSelection(card)}
            onDragStart={() => selectCard(card)}
          />
        </div>
      ) : null}
    </div>
  );
}
