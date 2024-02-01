import React, { JSX } from "react";
import PlayerCard from "./PlayerCard";
import { GameContextProvider } from "@/context/context";

export default async function GameBoard(): Promise<JSX.Element> {
  return (
    <>
      <GameContextProvider>
        <h1>The Header</h1>
        <div className="flex flex-row justify-evenly gap-2">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>
        <div className="flex flex-row justify-evenly gap-2 my-4">
          <PlayerCard />
          <PlayerCard />
          <PlayerCard />
        </div>
      </GameContextProvider>
    </>
  );
}
