"use server";
import { ApiError } from "next/dist/server/api-utils";
import { cookies } from "next/headers";

export async function createNewGameServerAction(): Promise<
  GameContext | undefined
> {
  console.log("Server Action: createNewGameServerAction invoked.");

  const newGameState = await createNewGameState();

  let createNewGameResponse;

  try {
    createNewGameResponse = await fetch(
      `http://localhost:${process.env.JSON_SERVER_PORT}/games`,
      {
        method: "POST",
        body: JSON.stringify(newGameState),
      }
    );

    console.log("Response received");

    if (createNewGameResponse.status >= 300) {
      throw new ApiError(
        createNewGameResponse.status,
        "There was an error with retrieving the request."
      );
    }

    const response = await createNewGameResponse.json();

    cookies().set({
      name: "gameId",
      value: response.gameId,
      httpOnly: false,
    });

    cookies().set({
      name: "username",
      value: "bar",
      httpOnly: false,
    });

    return response;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown error thrown.");
    }
  }
}

export async function createNewGameState() {
  return {
    gameId: crypto.randomUUID(),
    numberOfConnectedPlayers: 1,
    gameState: "Created",
    players: [],
  };
}

export type CreateNewGameServerAction = typeof createNewGameServerAction;
export type GameContext = ReturnType<typeof createNewGameState>;
