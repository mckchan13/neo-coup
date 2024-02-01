"use client";
import React, { PropsWithChildren, createContext } from "react";
import { GameId } from "@/server-actions/actions";
import { useSearchParams } from "next/navigation";

export interface CoupGameContext {
  gameId?: GameId | string | undefined;
}

export const GameContext = createContext<CoupGameContext>({
  gameId: undefined,
});

export const GameContextProvider = (
  props: PropsWithChildren
): React.JSX.Element => {
  const { children } = props;
  const searchParams = useSearchParams();
  const gameId = searchParams.get("gameId") ?? "";

  console.log(gameId);

  const value = {
    gameId,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
