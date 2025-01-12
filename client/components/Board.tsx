import { JSX, useReducer } from "react";
import { Hand } from "./Hand";
import { families, Family } from "@/lib/family";
import { equalsPlayerCard, PlayerCard } from "@/lib/player";
import { DropTarget } from "@/components/DropTarget";
import { cardConfigs } from "@/lib/card";
import Queue from "@/components/Queue";
import { InteractiveCard } from "./InteractiveCard";

type BoardState = {
  queue: PlayerCard[];
  hands: {
    [familyId: Family["id"]]: PlayerCard[];
  };
  slots: {
    left: PlayerCard | null;
    right: PlayerCard | null;
  };
  selectedCard: PlayerCard | null;
};

type BoardAction =
  | { type: "SELECT_CARD"; card: PlayerCard }
  | { type: "DESELECT_CARD" }
  | { type: "ADD_SELECTED_CARD_TO_SLOT"; slot: "left" | "right" }
  | { type: "ADD_SELECTED_CARD_TO_HAND"; familyId: Family["id"] };

const removeSelectedCardFromHand = ({
  hands,
  selectedCard,
}: BoardState): BoardState["hands"] => {
  if (selectedCard === null) {
    return hands;
  }
  return {
    ...hands,
    [selectedCard.family.id]: hands[selectedCard.family.id].filter(
      (card) => !equalsPlayerCard(selectedCard, card)
    ),
  };
};

const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
  switch (action.type) {
    case "SELECT_CARD":
      return { ...state, selectedCard: action.card };
    case "DESELECT_CARD":
      return { ...state, selectedCard: null };
    case "ADD_SELECTED_CARD_TO_SLOT":
      return {
        ...state,
        hands: removeSelectedCardFromHand(state),
        slots: {
          ...state.slots,
          [action.slot]: state.selectedCard,
        },
      };
    case "ADD_SELECTED_CARD_TO_HAND":
      return {
        ...state,
        hands: state.selectedCard
          ? {
              ...state.hands,
              [action.familyId]: [
                ...state.hands[action.familyId],
                state.selectedCard,
              ],
            }
          : state.hands,
        slots: {
          left: null,
          right: null,
        },
        selectedCard: null,
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
    selectedCard: null,
    slots: {
      left: null,
      right: null,
    },
  });

  const toggleCardSelection = (card: PlayerCard) => {
    if (state.selectedCard && equalsPlayerCard(state.selectedCard, card)) {
      dispatch({ type: "DESELECT_CARD" });
    } else {
      dispatch({ type: "SELECT_CARD", card });
    }
  };

  const selectCard = (card: PlayerCard) => {
    dispatch({ type: "SELECT_CARD", card });
  };

  const canDropOnSlot = (slot: "left" | "right") => {
    if (state.selectedCard === null) {
      return false;
    }
    if (state.slots[slot] !== null) {
      return false;
    }
    return true;
  };

  const canDropInHand = (familyId: Family["id"]) => {
    if (state.selectedCard === null) {
      return false;
    }
    if (
      state.hands[familyId].some((card) =>
        equalsPlayerCard(card, state.selectedCard!)
      )
    ) {
      return false;
    }
    return true;
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-1">
        <div className="relative">
          <DropTarget
            canDrop={canDropOnSlot("left")}
            onDrop={() =>
              dispatch({ type: "ADD_SELECTED_CARD_TO_SLOT", slot: "left" })
            }
          />
          {state.slots.left ? (
            <div className="absolute top-0 left-0 z-40">
              <InteractiveCard
                card={state.slots.left}
                isSelected={
                  state.selectedCard
                    ? equalsPlayerCard(state.selectedCard, state.slots.left)
                    : false
                }
                onClick={() => toggleCardSelection(state.slots.left!)}
                onDragStart={() => selectCard(state.slots.left!)}
              />
            </div>
          ) : null}
        </div>

        <Queue cards={state.queue} />
      </div>

      <div className="relative">
        <Hand
          selectedCard={state.selectedCard}
          cards={state.hands.red}
          toggleCardSelection={toggleCardSelection}
          selectCard={selectCard}
        />
        <div className="absolute -inset-2">
          <DropTarget
            className="w-full h-52"
            canDrop={canDropInHand("red")}
            onDrop={() =>
              dispatch({ type: "ADD_SELECTED_CARD_TO_HAND", familyId: "red" })
            }
          />
        </div>
      </div>
    </div>
  );
}
