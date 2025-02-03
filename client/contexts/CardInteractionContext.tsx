import { CardDropTarget } from "@/components/CardDropTarget";
import { equalsPlayerCard, PlayerCard } from "@/lib/player";
import {
  createContext,
  JSX,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { v4 as uuid } from "uuid";

type CardTransferCallback = (card: PlayerCard) => void;
type CardTransferSubscriberId = string;

type CardInteractionContextValue = {
  selectedCard: PlayerCard | null;
  setSelectedCard: (card: PlayerCard | null) => void;
  subscribe: (
    id: CardTransferSubscriberId,
    callback: CardTransferCallback
  ) => () => void;
  notifyCardTransfer: (
    subscriberId: CardTransferSubscriberId,
    card: PlayerCard
  ) => void;
};

export const CardInteractionContext =
  createContext<CardInteractionContextValue>({
    selectedCard: null,
    setSelectedCard: () => {},
    subscribe: () => () => {},
    notifyCardTransfer: () => {},
  });

export function CardInteractionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedCard, setSelectedCard] = useState<PlayerCard | null>(null);
  const cardTransferCallbacks = useRef<
    Map<CardTransferSubscriberId, CardTransferCallback>
  >(new Map());

  const subscribe = (
    id: CardTransferSubscriberId,
    callback: CardTransferCallback
  ) => {
    cardTransferCallbacks.current.set(id, callback);
    return () => {
      cardTransferCallbacks.current.delete(id);
    };
  };

  const notifyCardTransfer = (
    subscriberId: CardTransferSubscriberId,
    card: PlayerCard
  ) => {
    cardTransferCallbacks.current.forEach((callback, id) => {
      if (id !== subscriberId) {
        callback(card);
      }
    });
  };

  return (
    <CardInteractionContext.Provider
      value={{
        selectedCard,
        setSelectedCard,
        subscribe,
        notifyCardTransfer,
      }}
    >
      {children}
    </CardInteractionContext.Provider>
  );
}

type CardInteractionProps = {
  cards: PlayerCard[];
  onCardAdded: (card: PlayerCard) => void;
  onCardRemoved: (card: PlayerCard) => void;
};

type CardInteractionReturnValue = {
  CardDropTarget: () => JSX.Element;
  canReceiveSelectedCard: boolean;
  selectedCard: CardInteractionContextValue["selectedCard"];
  selectCard: (card: PlayerCard) => void;
  toggleCardSelection: (card: PlayerCard) => void;
};

export function useCardInteraction({
  cards,
  onCardAdded,
  onCardRemoved,
}: CardInteractionProps): CardInteractionReturnValue {
  const [id] = useState(uuid());
  const context = useContext(CardInteractionContext);
  const { selectedCard, setSelectedCard, subscribe, notifyCardTransfer } =
    context;

  const hasCard = useCallback(
    (card: PlayerCard) => {
      return cards.some((c) => equalsPlayerCard(c, card));
    },
    [cards]
  );

  const canReceiveSelectedCard = Boolean(
    selectedCard && !hasCard(selectedCard)
  );

  const selectCard = (card: PlayerCard) => {
    setSelectedCard(card);
  };

  const toggleCardSelection = (card: PlayerCard) => {
    if (selectedCard && equalsPlayerCard(selectedCard, card)) {
      setSelectedCard(null);
    } else {
      setSelectedCard(card);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribe(id, (card) => {
      if (hasCard(card)) {
        onCardRemoved(card);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [cards, hasCard, id, onCardRemoved, subscribe]);

  const onCardReceived = () => {
    if (!selectedCard) {
      return;
    }
    notifyCardTransfer(id, selectedCard);
    onCardAdded(selectedCard);
  };

  return {
    CardDropTarget: () => (
      <CardDropTarget
        canDrop={canReceiveSelectedCard}
        onDrop={onCardReceived}
      />
    ),
    canReceiveSelectedCard,
    selectedCard,
    toggleCardSelection,
    selectCard,
  };
}
