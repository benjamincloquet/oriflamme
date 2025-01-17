import { JSX, useReducer } from "react";
import { Hand } from "./Hand";
import { families, Family } from "@/lib/family";
import { PlayerCard } from "@/lib/player";
import { cardConfigs } from "@/lib/card";
import Queue from "@/components/Queue";
import { SingleCardSlot } from "./SingleCardSlot";
import { CardInteractionProvider } from "@/contexts/CardInteractionContext";

type BoardState = {
  queue: PlayerCard[];
  hands: {
    [familyId: Family["id"]]: PlayerCard[];
  };
  slots: {
    left: PlayerCard | null;
    right: PlayerCard | null;
  };
};

type BoardAction =
  | {
      type: "SET_QUEUE_SLOT_CARD";
      slot: "left" | "right";
      card: PlayerCard | null;
    }
  | { type: "SET_HAND"; familyId: Family["id"]; cards: PlayerCard[] };

const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case "SET_HAND":
      return {
        ...state,
        hands: { ...state.hands, [action.familyId]: action.cards },
      };
    case "SET_QUEUE_SLOT_CARD":
      return {
        ...state,
        slots: { ...state.slots, [action.slot]: action.card },
      };
  }
};

export function Board(): JSX.Element {
  const [state, dispatch] = useReducer(boardReducer, {
    queue: [],
    hands: Object.fromEntries(
      Object.values(families).map((family) => [
        family.id,
        Object.values(cardConfigs).map((cardConfig) => ({
          cardConfig,
          family,
        })),
      ])
    ),
    slots: {
      left: null,
      right: null,
    },
  });

  return (
    <CardInteractionProvider>
      <div className="flex flex-col gap-8">
        <div className="flex gap-1">
          <SingleCardSlot
            card={state.slots.left}
            onCardChanged={(card) =>
              dispatch({ type: "SET_QUEUE_SLOT_CARD", slot: "left", card })
            }
          />
          <Queue cards={state.queue} />
        </div>

        <div className="relative">
          <Hand
            cards={state.hands.red}
            onCardsChanged={(cards) =>
              dispatch({ type: "SET_HAND", familyId: "red", cards })
            }
          />
        </div>
      </div>
    </CardInteractionProvider>
  );
}
