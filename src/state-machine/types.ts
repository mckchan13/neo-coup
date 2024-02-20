import { GameId } from "@/server-actions/actions";

export type CharacterName =
  | "Assassin"
  | "Contessa"
  | "Captain"
  | "Duke"
  | "Ambassador";

export type GeneralActions = "Income" | "Foreign Aid" | "Coup";

export type CharacterActions = Exclude<CharacterName, "Contessa">;

export type CounterActions = Exclude<CharacterName, "Assassin">;

export type ChallengeAction = "Challenge Action";

export type RevealAction = "Reveal" | "No Reveal";

export type CoupActions =
  | GeneralActions
  | CharacterActions
  | CounterActions
  | ChallengeAction
  | RevealAction;

export type CharacterNamesMap = {
  readonly [P in Uppercase<CharacterName>]: Capitalize<Lowercase<P>>;
};

export interface Player {
  playerId: number;
  connectionId: string;
  username: string;
  influence: number;
  coins: number;
  hand: Card[];
}

export interface Card {
  id: number;
  name: CharacterName;
  owner: Player["playerId"] | "Deck";
  isRevealed: boolean;
}

export interface CoupGameContext {
  gameId: GameId | string;
  gameState: string;
  currentRound: number;
  currentRoundPlayer: Player["playerId"];
  players: Player[];
  deck: Card[];
  playStack: CoupPlay[];
  gameLog: CoupGameEvent[];
}

export type CoupActionType =
  | "General Action"
  | "Character Action"
  | "Counter Action"
  | "Challenge"
  | "Reveal"
  | "No Reveal";

export interface CoupPlay {
  coupActionType: CoupActionType;
  initiatingPlayer: Player["playerId"];
  targetPlayer?: Player["playerId"];
  gameState: string;
  roundInitiated: number;
  status: "Pending" | "Success" | "Fail";
}

export interface GeneralActionPlay<T extends GeneralActions> extends CoupPlay {
  coupActionType: "General Action";
  generalActionName: T;
  canBeCountered: T extends "Foreign Aid" ? true : false;
  canBeChallenged: false;
  onSuccessEffects: {
    initiatingPlayer: {
      influence: 0;
      coins: T extends "Foreign Aid" ? 2 : T extends "Income" ? 1 : -7; // final case means it is a coup action
      isForcedToReveal: false;
    };
    targetPlayer: {
      influence: T extends "Coup" ? -1 : 0;
      coins: 0;
      isForcedToReveal: T extends "Coup" ? true : false;
    };
    bankCoins: T extends "Foreign Aid" ? -2 : T extends "Income" ? -1 : 0; // final case means it is a coup action
  };
  onFailEffects: {
    initiatingPlayer: {
      influence: 0;
      coins: 0;
      isForcedToReveal: false;
    };
    targetPlayer: {
      influence: 0;
      coins: 0;
      isForcedToReveal: false;
    };
    bankCoins: 0;
  };
}

/**
 * Character actions either be blocked or challenged.
 */
export interface CharacterActionPlay<T extends CharacterActions>
  extends CoupPlay {
  coupActionType: "Character Action";
  coupActionName: T;
  characterName: Extract<T, CharacterName>;
  canBeCountered: true;
  canBeChallenged: true;
  onSuccessEffects: {
    initiatingPlayer: {
      influence: 0;
      coins: T extends "Duke" ? 3 : T extends "Captain" ? 2 : 0;
      isForcedToReveal: false;
    };
    targetedPlayer: {
      influence: T extends "Assassin" ? -1 : 0;
      coins: T extends "Captain" ? -2 : 0;
      isForcedToReveal: T extends "Assassin" ? true : false;
    };
    bankCoins: T extends "Duke" ? -3 : T extends "Assassin" ? 3 : 0;
  };
  // This only considers the blocking case (being counter actioned)
  // We need to also consider the challenge scenario
  // On fail from a challenge WILL result in a loss of influence
  onFailEffects: {
    initiatingPlayer: {
      influence: T extends "Duke" ? 0 : -1;
      coins: T extends "Assassin" ? -3 : 0;
      isForcedToReveal: true;
    };
    targetedPlayer: {
      influence: 0;
      coins: 0;
      isForcedToReveal: true;
    };
    bankCoins: T extends "Assassin" ? 3 : 0;
  };
}

/**
 * Counter actions won't have a on success effect against the targeted player, since the
 * effect of a successful counter action is on a general or character action
 * which already has defined on fail effects. We wouldn't want to double the effects by defining
 * it on this interface.
 *
 * A counter action only fails if it is properly challenged, hence this only triggers when a challenge
 * is successful.  The failure effect for a counter action is being successfully challenged against
 * so the effect is to lose and influence and be forced to reveal.
 */
export interface CounterActionPlay<T extends CounterActions> extends CoupPlay {
  coupActionType: "Counter Action";
  characterName: Extract<T, CharacterName>; // Contessa Captain Duke Ambassador
  canBeCountered: false;
  canBeChallenged: true;
  onSuccessEffects: {
    initiatingPlayer: {
      influence: 0;
      coins: 0;
      isForcedToReveal: false;
    };
  };
  onFailEffects: {
    initiatingPlayer: {
      influence: -1;
      coins: 0;
      isForcedToReveal: true;
    };
  };
}

export interface ChallengePlay extends CoupPlay {
  coupActionType: "Challenge";
  canBeCountered: false;
  canBeChallenged: false;
  onSuccessEffects: {
    initiatingPlayer: {
      influence: 0;
      coins: 0;
      isForcedToReveal: false;
    };
  };
  onFailEffects: {
    initiatingPlayer: {
      influence: -1;
      coins: 0;
      isForcedToReveal: true;
    };
  };
}

export interface RevealPlay extends CoupPlay {
  coupActionType: "Reveal" | "No Reveal";
  characterCardNameRevealed: CharacterName;
}

export interface CoupGameEvent extends CoupPlay {
  message: string;
}
