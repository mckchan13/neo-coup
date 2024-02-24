import { Card } from "./types";
import { CharacterName } from "./types";
import { CharacterNamesMap } from "./types";

export const characterCardNames = {
  ASSASSIN: "Assassin",
  CONTESSA: "Contessa",
  CAPTAIN: "Captain",
  DUKE: "Duke",
  AMBASSADOR: "Ambassador",
} as const satisfies CharacterNamesMap;

export type None = undefined | null;

export type Option<TResult, TNone extends None = None> = TResult | TNone;

export class GameMaster {
  public bankCoins: number = 15;
  public characterCardNames: CharacterNamesMap = characterCardNames;
  private deck: Card[] = [];

  constructor() {
    this.initalizeGameDeck();
  }

  public peakDeck(): Option<Card> {
    return this.deck.at(-1);
  }

  public dealCard(): Option<Card> {
    return this.deck.pop();
  }

  public shuffle(): void {
    const getRandomInt = (): number => {
      const max = this.deck.length;
      return Math.floor(Math.random() * max);
    };

    for (const index in this.deck) {
      const randomInt = getRandomInt();
      const temp = this.deck[index];
      this.deck[index] = this.deck[randomInt];
      this.deck[randomInt] = temp;
    }
  }

  private initalizeGameDeck() {
    for (const key in this.characterCardNames) {
      const name = this.characterCardNames[key as Uppercase<CharacterName>];
      for (let id = 0; id < 3; id++) {
        const card = {
          id,
          name,
          owner: "Deck",
          isRevealed: false,
        } satisfies Card;

        this.deck.push(card);
      }
    }

    this.shuffle();
  }
}
