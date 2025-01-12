import { JSX } from "react";
import {
  InteractiveItem,
  InteractiveItemProps,
} from "@/components/InteractiveItem";
import { PlayerCard, serializePlayerCard } from "@/lib/player";
import { Card } from "@/components/Card";

type InteractiveCardProps = InteractiveItemProps & {
  card: PlayerCard;
  isSelected?: boolean;
  onClick: () => void;
  onDragStart: () => void;
};

export function InteractiveCard({
  card,
  isSelected,
  onClick,
  onDragStart,
  ...interactiveItemProps
}: InteractiveCardProps): JSX.Element {
  return (
    <InteractiveItem
      layoutId={serializePlayerCard(card)}
      onDragStart={onDragStart}
      onClick={onClick}
      {...interactiveItemProps}
    >
      <Card
        config={card.cardConfig}
        family={card.family}
        isHighlighted={isSelected}
      />
    </InteractiveItem>
  );
}
