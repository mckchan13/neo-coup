"use client";

import { JSX, useState, ChangeEvent, useEffect } from "react";
import {
  createNewGameServerAction,
  navigate,
} from "../../server-actions/actions";
import { useSearchParams } from "next/navigation";

const initialFormState = {
  userNameInput: "",
  gameIdInput: "",
};

export type FormState = typeof initialFormState;

export default function JoinPage(): JSX.Element {
  const [{ userNameInput, gameIdInput }, setFormStatus] =
    useState<FormState>(initialFormState);

  const [currentGameId, setCurrentGameId] = useState<string>();

  const [errorMessage, setErrorMessage] = useState<string>();

  const searchParams = useSearchParams();

  useEffect(() => {
    const errorFromParams = searchParams.get("err");
    if (errorFromParams) {
      console.error(errorFromParams);
      setErrorMessage(errorFromParams);
    }

    const gameIdFromSession = sessionStorage.getItem("id");
    if (gameIdFromSession) {
      setCurrentGameId(gameIdFromSession);
    }
  }, [searchParams]);

  const handleUserNameInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const userNameInput = event.target.value;
    setFormStatus((prevState: FormState) => {
      return {
        ...prevState,
        userNameInput,
      };
    });
  };

  const handleGameIdInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const gameIdInput = event.target.value;
    setFormStatus((prevState: FormState) => {
      return {
        ...prevState,
        gameIdInput,
      };
    });
  };

  return (
    <main>
      <div className="flex flex-col justify-around">
        <h1 className="my-2">Welcome to Neo Coup</h1>

        <div className="my-2">
          <div className="flex flex-col justify-around">
            <form action={createNewGameServerAction}>
              <div className="flex flex-col justify-around">
                <label>
                  Enter your username:{" "}
                  <input
                    className="text-black"
                    name="userNameInput"
                    value={userNameInput}
                    onChange={handleUserNameInputChange}
                  />
                </label>
                <button className="border">Create a new game.</button>
              </div>
            </form>

            <p>Or join an existing game</p>

            <form action={navigate}>
              <div className="flex flex-col">
                <label className="border">
                  Enter a gameId in progress to join:{" "}
                  <input
                    className="text-black"
                    name="gameIdInput"
                    value={currentGameId || gameIdInput}
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

      {errorMessage ? (
        <>
          <br />
          Error Message:
          <br />
          <p>{errorMessage}</p>
        </>
      ) : (
        <></>
      )}
    </main>
  );
}
