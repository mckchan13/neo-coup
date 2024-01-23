"use client";

import React, {
  Dispatch,
  ReactElement,
  SetStateAction,
  useEffect,
} from "react";
import { useState } from "react";

const GameCreatedComponent = (props: { isLoading: boolean }): ReactElement => {
  const { isLoading } = props;
  return isLoading ? (
    <>Still Loading...</>
  ) : (
    <>
      <div>Left</div>
      <div>Game Was Created!</div>
      <div>Right</div>
    </>
  );
};

async function mockAysncFetch(
  setIsLoading: Dispatch<SetStateAction<boolean>>
): Promise<void> {
  return await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      setIsLoading(false);
    }, 3000);
  });
}

export default function GameBoard(): ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    mockAysncFetch(setIsLoading);
  }, []);

  return <GameCreatedComponent isLoading={isLoading} />;
}
