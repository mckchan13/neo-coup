import { ReactNode } from "react";
import { Suspense } from "react";
import { ApiError } from "next/dist/server/api-utils";
import GameCreator from "@/components/GameCreator";
import Loading from "./loading";

export default function GamePage(): ReactNode {
  return (
    <main>
      <div className="flex flex-row justify-around">
        <div className="my-2">Top</div>

        <div className="my-2">
          <Suspense fallback={<Loading />}>
            <GameCreator
              createNewGameServerAction={createNewGameServerAction}
            />
          </Suspense>
        </div>

        <div className="my-2">Bottom</div>
      </div>
    </main>
  );
}

export type GameContext = ReturnType<typeof createNewGameState>;

async function createNewGameServerAction(): Promise<GameContext> {
  "use server";
  const newGameState = createNewGameState();
  console.log("this is the new gameState", newGameState);
  let response;

  try {
    response = await fetch(
      `http://localhost:${process.env.JSON_SERVER_PORT}/games`,
      {
        method: "POST",
        body: JSON.stringify(newGameState),
      }
    );

    console.log(response);

    if (response.status >= 300) {
      throw new ApiError(
        response.status,
        "There was an error with retrieving the request."
      );
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("Unknown error thrown.");
    }
  }

  if (response === undefined) {
    throw new Error("Unable to set the response or some failure occurred.");
  }

  return response.json();
}

function createNewGameState() {
  return {
    gameId: crypto.randomUUID(),
    numberOfConnectedPlayers: 1,
    gameState: "Created",
    players: [],
  };
}

export type CreateNewGameServerAction = typeof createNewGameServerAction;
