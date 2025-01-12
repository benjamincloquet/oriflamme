import { PlayerCard, serializePlayerCard } from "@/lib/player";
import { JSX } from "react";
import { Card } from "@/components/Card";
import { motion } from "motion/react";

type QueueProps = {
  cards: PlayerCard[];
};

export default function Queue({ cards }: QueueProps): JSX.Element {
  return (
    <div className="flex gap-1">
      {cards.map((card) => (
        <motion.div
          key={serializePlayerCard(card)}
          layoutId={serializePlayerCard(card)}
        >
          <Card config={card.cardConfig} family={card.family} />
        </motion.div>
      ))}
    </div>
  );
}
