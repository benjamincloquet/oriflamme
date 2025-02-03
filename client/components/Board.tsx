import { JSX, useReducer } from "react";
import { Hand } from "./Hand";
import { Family, FamilyId } from "@/lib/family";
import { PlayerCard, PlayerHands } from "@/lib/player";
import Queue from "@/components/Queue";
import { SingleCardSlot } from "./SingleCardSlot";
import { CardInteractionProvider } from "@/contexts/CardInteractionContext";

type BoardState<> = {
  queue: PlayerCard[];
  hands: PlayerHands;
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
      const hand = state.hands.green;
      return {
        ...state,
        hands: {
          ...state.hands,
          [action.familyId]: {
            ...state.hands[action.familyId],
            cards: action.cards,
          },
        },
      };
    case "SET_QUEUE_SLOT_CARD":
      return {
        ...state,
        slots: { ...state.slots, [action.slot]: action.card },
      };
  }
};

type BoardProps = {
  hands: PlayerHands;
  playerFamilyId: FamilyId;
};

export function Board({ hands, playerFamilyId }: BoardProps): JSX.Element {
  type HandsKeys = keyof typeof hands
  type ExactHands = {
    [K in HandsKeys]: typeof hands[K];
};
  const [state, dispatch] = useReducer(boardReducer, {
    queue: [],
    hands,
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
            cards={state.hands[playerFamilyId].cards}
            onCardsChanged={(cards) =>
              dispatch({ type: "SET_HAND", familyId: "red", cards })
            }
          />
        </div>
      </div>
    </CardInteractionProvider>
  );
}
