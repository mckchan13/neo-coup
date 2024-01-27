"use client";

import React, { JSX } from "react";
import PlayerCard from "./PlayerCard";

export default function GameBoard(): JSX.Element {
  console.log(document.cookie)
  return (
    <>
      <div className="flex flex-row justify-evenly gap-2">
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </div>
      <div className="flex flex-row justify-evenly gap-2">
        <PlayerCard />
        <PlayerCard />
        <PlayerCard />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          console.log("I didn't refresh!!!");
        }}
      >
        <input type="submit" />
      </form>
    </>
  );
}
