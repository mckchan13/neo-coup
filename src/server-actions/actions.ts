"use server";
import { raiseApiError } from "@/utils";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import crypto from "node:crypto";

export async function createNewGameServerAction(data: FormData): Promise<void> {
  console.log("Server Action: createNewGameServerAction invoked.");
  console.log("This is the form data:", data);
  const userNameInput = data.get("userNameInput");

  // May need to throw error if userNameInput is an empty string and
  // require the user to enter a name

  let gameId;

  try {
    if (!userNameInput) {
      throw new Error("Username entry is blank, please provide a username.");
    }

    const newGameState = await createNewGameState(userNameInput as string);
    const url = `http://localhost:${process.env.JSON_SERVER_PORT}/games`;
    const requestInit = {
      method: "POST",
      body: JSON.stringify(newGameState),
    };

    const response = await fetch(url, requestInit);

    console.log("Response received: ", response);

    const status = response.status;

    if (status >= 300) {
      raiseApiError(status, "There was an error with retrieving the request.");
    }

    const gameContextData: GameContext = await response.json();
    gameId = gameContextData.id;

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

export async function createNewGameState(username: string) {
  // TO DO: add the users email and websocket connection ID here
  // TO DO: Match this type up with the actual game context;

  return {
    id: crypto.randomUUID(),
    numberOfConnectedPlayers: 1,
    gameState: "Created",
    players: [username],
  } as const;
}

export async function fetchGameContext(id: GameId) {
  try {
    const url = `http://localhost:${process.env.JSON_SERVER_PORT}/games/${id}`;
    console.log("this is the url ", url);
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error was thrown!", error.message);
    }
  }
}

export async function navigate(formData: FormData) {
  const gameId = formData.get("gameIdInput");
  redirect(`/game?gameId=${gameId}`);
}

export type GameId = ReturnType<typeof crypto.randomUUID>;
export type CreateNewGameServerAction = typeof createNewGameServerAction;
export type GameContext = Awaited<ReturnType<typeof createNewGameState>>;
