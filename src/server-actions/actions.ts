"use server";
import { raiseApiError } from "@/app/utils";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { RedirectType } from "next/navigation";
import crypto from "node:crypto";

export async function createNewGameServerAction(): Promise<void> {
  console.log("Server Action: createNewGameServerAction invoked.");

  let gameId;

  try {
    const newGameState = await createNewGameState();
    const createNewGameResponse = await fetch(
      `http://localhost:${process.env.JSON_SERVER_PORT}/games`,
      {
        method: "POST",
        body: JSON.stringify(newGameState),
      }
    );

    console.log("Response received: ", createNewGameResponse);

    const statusCode = createNewGameResponse.status;

    if (statusCode >= 300) {
      raiseApiError(
        statusCode,
        "There was an error with retrieving the request."
      );
    }

    const gameContextData: GameContext = await createNewGameResponse.json();
    gameId = gameContextData.gameId;

    console.log("Response JSON parsed: ", gameContextData);

    for (const [key, value] of Object.entries(gameContextData)) {
      cookies().set({
        name: key,
        value: value.toString(),
        httpOnly: false,
      });
    }
  } catch (error) {
    let errorMessage = "Unknown error thrown.";
    if (error instanceof Error) {
      errorMessage =
        "An error occurred while creating a game for the following reason: " +
        error.message;
    }
    console.error(errorMessage);
    redirect(`/join?err=${errorMessage}`, RedirectType.push);
  }

  redirect(`/game?gameId=${gameId}`, RedirectType.replace);
}

export async function createNewGameState() {
  return {
    gameId: crypto.randomUUID(),
    numberOfConnectedPlayers: 1,
    gameState: "Created",
    players: [],
  } as const;
}

export type GameId = ReturnType<typeof crypto.randomUUID>;
export type CreateNewGameServerAction = typeof createNewGameServerAction;
export type GameContext = Awaited<ReturnType<typeof createNewGameState>>;
