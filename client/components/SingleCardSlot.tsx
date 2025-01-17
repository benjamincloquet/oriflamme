import { equalsPlayerCard, PlayerCard } from "@/lib/player";
import { JSX } from "react";
import { CardDropTarget } from "@/components/CardDropTarget";
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
    onCardReceived,
    canReceiveSelectedCard,
    selectedCard,
    selectCard,
    toggleCardSelection,
  } = useCardInteraction({
    cards: card ? [card] : [],
    onCardRemoved: () => onCardChanged(null),
  });

  const onSelectedCardDroppedOnTarget = () => {
    if (!selectedCard) {
      return;
    }
    onCardChanged(selectedCard);
    onCardReceived(selectedCard);
  };

  return (
    <div className="relative">
      <CardDropTarget
        canDrop={canReceiveSelectedCard}
        onDrop={onSelectedCardDroppedOnTarget}
      />
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
