"use client";
import React, { useContext } from "react";
import { GameId } from "@/server-actions";
import { GameContext } from "@/context/GameContext";

export interface PlayerCardProps {
  playerId?: number;
  gameId?: GameId;
}

export default function PlayerCard(props: PlayerCardProps): React.JSX.Element {
  const { gameId } = useContext(GameContext);
  const { playerId } = props;

  let displayName: string;
  if (playerId !== undefined) displayName = "Player " + playerId;
  else displayName = "No Player Connected";

  return (
    <div className="w-96 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="p-5">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {displayName}
        </h5>

        <section className="player-stats">
          <h1>This is the gameId: {gameId}</h1>
          <h2 className="mb-2 text-1xl font-bold tracking-tight text-gray-900 dark:text-white">
            Stats
          </h2>
          <ul>
            <li>Influence</li>
            <li>Coins</li>
            <li>Influence</li>
          </ul>
        </section>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
          <strong>General Actions</strong>
        </p>
        <ul className="my-2">
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">
              Income - Take 1 Coin from Treasury
            </button>
          </li>
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">
              Foreign Aid - Take 2 Coins from Treasury
            </button>
          </li>
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">
              Coup - Pay 7 Coins to launch a Coup (target loses 1 influence)
            </button>
          </li>
        </ul>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
          <strong>Character Actions</strong>
        </p>
        <ul className="my-2">
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">Duke</button>
          </li>
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">Assassin</button>
          </li>
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">Captain</button>
          </li>
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">Ambassador</button>
          </li>
        </ul>

        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">
          <strong>Counter Actions</strong>
        </p>
        <ul className="my-2">
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">Duke</button>
          </li>
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">Contessa</button>
          </li>
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">Ambassador</button>
          </li>
          <li className="my-2">
            <button className="border py-2 px-4 rounded-xl">Captain</button>
          </li>
        </ul>
      </div>
    </div>
  );
}
