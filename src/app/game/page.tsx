import { ReactNode } from "react";
import { Suspense } from "react";
import GameBoard from "@/components/GameBoard";

function createNewGameState() {
  return {
    gameId: crypto.randomUUID(),
    numberOfConnectedPlayers: 1,
    gameState: "Created",
    players: [],
  };
}

export default function GamePage(): ReactNode {
  const newGameState = createNewGameState();
  const response: Promise<any> = fetch(
    `http://localhost:${process.env.JSON_SERVER_PORT}`,
    {
      method: "POST",
      body: JSON.stringify(newGameState),
    }
  )
    .then((res: Response) => res.json())
    .catch((error) => {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unknown error thrown.");
      }
    });

  return (
    <main>
      <div className="grid grid-rows-3">
        <div className="flex flex-row justify-around my-2">Top</div>

        <div className="flex flex-row justify-around my-2">
          <Suspense fallback={<p>Suspense fallback is rendering...</p>}>
            <GameBoard gameId={newGameState.gameId} />
          </Suspense>
        </div>

        <div className="flex flex-row justify-around my-2">Bottom</div>
      </div>
    </main>
  );
}
