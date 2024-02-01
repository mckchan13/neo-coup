import { JSX, Suspense } from "react";
import GameBoard from "@/components/GameBoard";
import Link from "next/link";

export default async function GamePage(): Promise<JSX.Element> {
  return (
    <>
      <div className="flex flex-col justify-around">
        {"This is the game page"}
        <section>
          <Link href={"/join"}>
            <button className="border py-1 px-2 rounded-lg">Go Back</button>
          </Link>
        </section>

        <section>
          <Suspense fallback={<div>Loading...</div>}>
            <GameBoard />
          </Suspense>
        </section>
      </div>
    </>
  );
}
