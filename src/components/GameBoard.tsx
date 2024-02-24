import React, { JSX } from "react";
import PlayerCard from "./PlayerCard";
import { GameContextProvider } from "@/context/GameContext";
import { GamePageHeader } from "./GamePageHeader";

export default async function GameBoard(): Promise<JSX.Element> {
  return (
    <>
      <GameContextProvider>
        <GamePageHeader/>
        <div className="flex flex-row justify-evenly gap-2">
          <PlayerCard playerNumber={0}/>
          <PlayerCard playerNumber={1}/>
          <PlayerCard playerNumber={2}/>
        </div>
        <div className="flex flex-row justify-evenly gap-2 my-4">
          <PlayerCard playerNumber={3}/>
          <PlayerCard playerNumber={4}/>
          <PlayerCard playerNumber={5}/>
        </div>
      </GameContextProvider>
    </>
  );
}
