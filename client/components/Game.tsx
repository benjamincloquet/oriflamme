import { families, Family, FamilyId } from "@/lib/family";
import { JSX, useReducer } from "react";
import { Board } from "./Board";
import { cardConfigs } from "@/lib/card";
import { PlayerHands } from "@/lib/player";

type GameState = {
  players: Array<Family>;
  playerFamilyId: FamilyId;
  turn: number;
};

function gameReducer(state: GameState): GameState {
  return state;
}

export function Game(): JSX.Element {
  const [state] = useReducer(gameReducer, {
    players: [families.red],
    playerFamilyId: "red",
    turn: 1,
  });

  const initialHands = state.players.reduce(
    (playerHands, player): PlayerHands<typeof state.players> => {
      return {
        ...playerHands,
        [player.id]: {
          familyId: player.id,
          cards: cardConfigs,
        },
      };
    },
    {} as PlayerHands<typeof state.players>
  );

  function createHands<T extends Array<Family>>(
    input: T
  ): { [K in keyof T]: T[K] } {
    return input;
  }

  return <Board hands={initialHands} playerFamilyId={state.playerFamilyId} />;
}
