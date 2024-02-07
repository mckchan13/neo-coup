"use client";
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from "react";
import { useSearchParams } from "next/navigation";
import { GameId, fetchGameContext } from "@/server-actions";
import { CharacterNamesMap, CoupGameContext, Card, CharacterName } from "@/state-machine/types";

const characterCardNames = {
  ASSASSIN: "Assassin",
  CONTESSA: "Contessa",
  CAPTAIN: "Captain",
  DUKE: "Duke",
  AMBASSADOR: "Ambassador",
} as const satisfies CharacterNamesMap;

const initialGameContext = {
  gameId: "",
  gameState: "",
  currentRound: 0,
  currentRoundPlayer: 0,
  players: [],
  deck: initializeGameDeck(),
  playStack: [],
  gameLog: [],
} satisfies CoupGameContext;

export function initializeGameDeck(): Card[] {
  const deck = [];

  for (const key in characterCardNames) {
    const name = characterCardNames[key as Uppercase<CharacterName>];
    for (let id = 0; id < 3; id++) {
      const card = {
        id,
        name,
        owner: "Deck",
        isRevealed: false,
      } satisfies Card;
      deck.push(card);
    }
  }

  shuffle(deck);

  return deck;
}

export function shuffle(deck: Card[]) {
  function getRandomInt(): number {
    const max = deck.length;
    return Math.floor(Math.random() * max);
  }

  for (const index in deck) {
    const randomInt = getRandomInt();
    const temp = deck[index];
    deck[index] = deck[randomInt];
    deck[randomInt] = temp;
  }
}

export const GameContext =
  createContext<Partial<CoupGameContext>>(initialGameContext);

export const GameContextProvider = (
  props: PropsWithChildren,
): React.JSX.Element => {
  const { children } = props;
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId") ?? "";
  const noGameIdFound = gameId === "";
  const [gameContext, setGameContext] = useState<Partial<CoupGameContext>>({});

  useEffect(() => {
    try {
      (async () => {
        if (noGameIdFound) {
          console.error("No game id provided");
          return;
        }
        const id = gameId as GameId;
        const response = await fetchGameContext(id);
        const fetchedGameContext = response as CoupGameContext;
        setGameContext(fetchedGameContext);
      })();
    } catch (error) {
      console.error("Something went wrong");
    }
  }, [gameId, noGameIdFound]);

  return (
    <GameContext.Provider value={gameContext}>{children}</GameContext.Provider>
  );
};
