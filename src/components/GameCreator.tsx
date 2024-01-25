"use client";

import React, { ReactElement, useEffect, useState } from "react";
import { GameContext, CreateNewGameServerAction } from "@/app/game/page";
import Spinner from "./Spinner";

export default function GameCreator(props: {
  createNewGameServerAction: CreateNewGameServerAction;
}): ReactElement {
  const { createNewGameServerAction } = props;
  const [gameContext, setGameContext] = useState<GameContext>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ? (
    <Spinner/>
  ) : (
    <>
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
