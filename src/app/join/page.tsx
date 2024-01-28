"use client";

import { JSX, useState, ChangeEvent, FormEvent } from "react";
import { createNewGameServerAction } from "../../server-actions/actions";
import { useRouter } from "next/navigation";

export default function CreateOrJoinGame(): JSX.Element {
  const router = useRouter();

  const initialFormState = {
    userNameInput: "",
    gameIdInput: "",
  };

  const [{ userNameInput, gameIdInput }, setFormStatus] =
    useState(initialFormState);

  const handleUserNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userNameInput = event.target.value;
    setFormStatus((prevState: typeof initialFormState) => ({
      ...prevState,
      userNameInput,
    }));
  };

  const handleGameIdInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const gameIdInput = event.target.value;
    setFormStatus((prevState: typeof initialFormState) => ({
      ...prevState,
      gameIdInput,
    }));
  };

  const handleSubmitCreateNewGame = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    try {
      console.log("handle submit was clicked");
      const gameState = await createNewGameServerAction();
      console.log("New gameState created: ", gameState);
      router.push("/game");
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error("Unable to create game. Unknown error thrown");
      }
    }
  };

  const handleSubmitJoinNewGame = (event: FormEvent<HTMLFormElement>) => {};

  return (
    <main>
      <div className="flex flex-col justify-around">
        <h1 className="my-2">Welcome to Neo Coup</h1>

        <div className="my-2">
          <div className="flex flex-col justify-around">
            <form onSubmit={handleSubmitCreateNewGame}>
              <div className="flex flex-col justify-around">
                <label>
                  Enter your username:{" "}
                  <input
                    name="userNameInput"
                    value={userNameInput}
                    onChange={handleUserNameInputChange}
                  />
                </label>
                <button className="border">Create a new game.</button>
              </div>
            </form>

            <p>Or join an existing game</p>

            <form onSubmit={handleSubmitJoinNewGame}>
              <div className="flex flex-col">
                <label className="border">
                  Enter a gameId in progress to join:{" "}
                  <input
                    name="gameIdInput"
                    value={gameIdInput}
                    onChange={handleGameIdInputChange}
                  />
                </label>
                <button className="border">Join a game in progress.</button>
              </div>
            </form>
          </div>
        </div>

        <div className="my-2">Bottom</div>
      </div>
    </main>
  );
}
