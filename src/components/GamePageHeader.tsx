"use client";
import { GameContext } from "@/context/GameContext";
import React, { useContext } from "react";

export function GamePageHeader(): React.JSX.Element {
  const { gameId } = useContext(GameContext);

  return (
    <>
      <ul className="flex flex-row justify-around">
        <li>This is the gameId: {gameId}</li>
        <li>Current Game State:</li>
        <li></li>
      </ul>
    </>
  );
}
