import { JSX } from "react";
import clsx from "clsx";
import { CardConfig } from "@/lib/card";
import { Family } from "@/lib/family";

export type CardProps = {
  config: CardConfig;
  family: Family;
  isHighlighted?: boolean;
};

export function Card({ config, isHighlighted }: CardProps): JSX.Element {
  return (
    <div
      className={clsx(
        "h-48 w-36 border rounded flex items-center justify-center bg-white pointer-events-none select-none",
        isHighlighted && "border-blue-500"
      )}
    >
      {config.name}
    </div>
  );
}
