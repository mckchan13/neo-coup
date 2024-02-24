"use client";
import { GameContext } from "@/context/GameContext";
import React, { useContext, useEffect } from "react";

export function GamePageHeader(): React.JSX.Element {
  const gameContext = useContext(GameContext);
  // @ts-ignore
  const { id, gameState, numberOfConnectedPlayers, players } = gameContext;

  useEffect(() => {
    console.log("This is the game context: ", gameContext);
  }, [gameContext]);

  return (
    <>
      <ul className="flex flex-row justify-around">
        <li>This is the gameId: {id}</li>
        <li>Current Game State:</li>
        <li></li>
      </ul>
    </>
  );
}
