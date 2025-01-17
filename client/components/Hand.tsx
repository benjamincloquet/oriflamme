import { JSX } from "react";
import {
  equalsPlayerCard,
  PlayerCard,
  serializePlayerCard,
} from "@/lib/player";
import { InteractiveCard } from "@/components/InteractiveCard";
import { CardDropTarget } from "./CardDropTarget";
import { useCardInteraction } from "@/contexts/CardInteractionContext";

type HandProps = {
  cards: Array<PlayerCard>;
  onCardsChanged: (card: PlayerCard[]) => void;
};

export function Hand({ cards, onCardsChanged }: HandProps): JSX.Element {
  const {
    onCardReceived,
    canReceiveSelectedCard,
    selectedCard,
    selectCard,
    toggleCardSelection,
  } = useCardInteraction({
    cards,
    onCardRemoved: (removedCard) =>
      onCardsChanged(
        cards.filter((card) => !equalsPlayerCard(removedCard, card))
      ),
  });

  const onSelectedCardDroppedOnTarget = () => {
    if (!selectedCard) {
      return;
    }
    onCardsChanged([...cards, selectedCard]);
    onCardReceived(selectedCard);
  };

  return (
    <div className="relative h-52">
      <CardDropTarget
        className="h-52 w-full"
        canDrop={canReceiveSelectedCard}
        onDrop={onSelectedCardDroppedOnTarget}
      />
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
