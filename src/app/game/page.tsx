import { ReactNode } from "react";
import { Suspense } from "react";
import GameBoard from "@/components/GameBoard";

export default function GamePage(): ReactNode {
  return (
    <main>
      <div className="grid grid-rows-3">
        <div className="flex flex-row justify-around my-2">Top</div>

        <div className="flex flex-row justify-around my-2">
          <Suspense fallback={<p>Suspense fallback is rendering...</p>}>
            <GameBoard/>
          </Suspense>
        </div>

        <div className="flex flex-row justify-around my-2">Bottom</div>
      </div>
    </main>
  );
}
