import { createMachine, createActor } from "xstate";

export class LoggedEvent {
  public timestamp: number;
  constructor(public stateValue: any, public description: string) {
    this.timestamp = Date.now();
    this.stateValue = stateValue;
    this.description = description;
  }
}

const playLog: LoggedEvent[] = [];

export const neoCoupStateMachine = createMachine(
  {
    id: "Neo Coup (During Game)",
    initial: "Game Start",
    states: {
      "Game Start": {
        always: {
          target: "Round Start",
        },
      },
      "Round Start": {
        always: {
          target: "Determine Next Player",
        },
      },
      "Determine Next Player": {
        always: {
          target: "Determine If Player Must Coup",
        },
      },
      "Determine If Player Must Coup": {
        on: {
          playerMustCoup: {
            target: "Prompt and Await Coup Target",
            guard: "playerCoinsIsTenOrGreater",
          },
          playerMayMakeAnyAction: {
            target: "Await Player Action",
          },
        },
      },
      "Prompt and Await Coup Target": {
        on: {
          "Coup Target Received": {
            target: "Round Ended",
          },
        },
      },
      "Await Player Action": {
        on: {
          "Coup or Income": {
            target: "Round Ended",
          },
          "Foreign Aid": {
            target: "Foreign Aid Played",
          },
          "Captain Played": {
            target: "Captain Character Played",
          },
          "Duke Or Ambassador Played": {
            target: "Duke or Ambassador Played",
            actions: {
              type: "addPlayActionToStack",
            },
          },
          "Assassin Played": {
            target: "Assassin Character Played",
          },
        },
      },
      "Round Ended": {
        entry: {
          type: "updateGameState",
        },
        always: {
          target: "Flushing Play Stack",
        },
      },
      "Foreign Aid Played": {
        on: {
          "Prompt Other Players to Play Duke": {
            target: "Await Duke To Be Played",
          },
        },
      },
      "Captain Character Played": {
        always: {
          target: "Awaiting Ambassador Or Challenge",
        },
      },
      "Duke or Ambassador Played": {
        always: {
          target: "Prompt Players for Challenge",
        },
      },
      "Assassin Character Played": {
        always: {
          target: "Awaiting Contessa Or Challenge",
        },
      },
      "Flushing Play Stack": {
        always: {
          target: "Determine Winner",
        },
      },
      "Await Duke To Be Played": {
        on: {
          "Duke Played": {
            target: "Blocking Duke Played",
          },
          "Duke Not Played": {
            target: "Round Ended",
          },
        },
      },
      "Awaiting Ambassador Or Challenge": {
        on: {
          "Ambassador Blocker Played": {
            target: "Blocking Character Action Played",
          },
          "Challenge Played": {
            target: "Await Player to Reveal",
          },
        },
      },
      "Prompt Players for Challenge": {
        on: {
          "Challenge Duke or Ambassador Played": {
            target: "Await Player to Reveal",
          },
          "No Challenge Played": {
            target: "Prior Character Action Succeeds",
          },
        },
      },
      "Awaiting Contessa Or Challenge": {
        on: {
          "Contessa Blocker Played": {
            target: "Blocking Character Action Played",
          },
          "Challenge Played": {
            target: "Await Player to Reveal",
          },
        },
      },
      "Determine Winner": {
        on: {
          "No Winner Detected": {
            target: "Round Start",
          },
          "Winner Detected": {
            target: "Game Over",
          },
        },
      },
      "Blocking Duke Played": {
        always: {
          target: "Prompt Players for Challenge",
        },
      },
      "Blocking Character Action Played": {
        always: {
          target: "Prompt Players for Challenge",
        },
      },
      "Await Player to Reveal": {
        always: {
          target: "Round Ended",
        },
      },
      "Prior Character Action Succeeds": {
        always: {
          target: "Round Ended",
        },
      },
      "Game Over": {
        type: "final",
      },
    },
    types: {
      events: {} as
        | { type: "" }
        | { type: "Duke Played" }
        | { type: "Foreign Aid" }
        | { type: "Coup or Income" }
        | { type: "Duke Not Played" }
        | { type: "Winner Detected" }
        | { type: "No Winner Detected" }
        | { type: "No Challenge Played" }
        | { type: "Duke Or Ambassador Played" }
        | { type: "Prompt Other Players to Play Duke" }
        | { type: "Challenge Duke or Ambassador Played" }
        | { type: "Coup Target Received" }
        | { type: "playerMustCoup" }
        | { type: "playerMayMakeAnyAction" }
        | { type: "Assassin Played" }
        | { type: "Captain Played" }
        | { type: "Ambassador Blocker Played" }
        | { type: "Challenge Played" }
        | { type: "Contessa Blocker Played" },
    },
  },
  {
    actions: {
      updateGameState: ({ context, event }) => {},
      addPlayActionToStack: ({ context, event }) => {},
    },
    actors: {},
    guards: {
      playerCoinsIsTenOrGreater: ({ context, event }, params) => {
        return false;
      },
    },
    delays: {},
  }
);

const actor = createActor(neoCoupStateMachine);

actor.subscribe((state) => {
  console.log(state.value);
  playLog.push(new LoggedEvent(state.value, ""));
});
