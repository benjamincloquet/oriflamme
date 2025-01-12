import { JSX } from "react";
import { PlayerCard, serializePlayerCard } from "@/lib/player";
import { InteractiveCard } from "@/components/InteractiveCard";

type HandProps = {
  selectedCard: PlayerCard | null;
  cards: Array<PlayerCard>;
  toggleCardSelection: (card: PlayerCard) => void;
  selectCard: (card: PlayerCard) => void;
};

export function Hand({
  selectedCard,
  cards,
  toggleCardSelection,
  selectCard: onSelection,
}: HandProps): JSX.Element {
  return (
    <div className="relative">
      <div className="flex">
        {cards.map((card) => (
          <InteractiveCard
            key={serializePlayerCard(card)}
            card={card}
            initial={{ zIndex: 20 }}
            whileDrag={{
              zIndex: 20 + cards.length,
            }}
            onClick={() => toggleCardSelection(card)}
            onDragStart={() => onSelection(card)}
            isSelected={card === selectedCard}
            className="-mr-16 transition-margin hover:-mr-2"
          />
        ))}
      </div>
    </div>
  );
}
