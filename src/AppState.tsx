import {assertIsArray, assertIsNumber, assertIsObject, assertIsString, ListOfAbilities, ListOfAttributes, ListOfBonuses} from "./Constants";
import {useState} from "react";

interface DataBlock<T> {
  [key: string]: T;
}

export class StatisticsBlock {
  private data = {} as DataBlock<number>;

  public constructor() {
    ListOfAttributes.forEach((attr) => {
      this.data[attr] = 1;
    });
    ListOfAbilities.forEach((ability) => {
      this.data[ability] = 0;
    });
  }

  static fromObject(input: any): StatisticsBlock {
    const statistics = new StatisticsBlock();
    for (let prop in input) {
      let value = input[prop];
      if (typeof value === 'number' && (ListOfAttributes.includes(prop) || ListOfAbilities.includes(prop))) {
        statistics.data[prop] = value;
      }
    }
    return statistics;
  }

  clone(): StatisticsBlock {
    const statistics = new StatisticsBlock();
    for (let prop in this.data) {
      if (statistics.data.hasOwnProperty(prop)) {
        statistics.data[prop] = this.data[prop];
      }
    }
    return statistics;
  }

  get(attr: string): number {
    return this.data[attr];
  }

  set(attr: string, value: number): void {
    if (this.data.hasOwnProperty(attr)) {
      this.data[attr] = value;
    }
  }

  toJSON(): object {
    // Really should make a defensive copy here
    return this.data;
  }
}


export class Favourite {
  id?: string;
  name: string;
  attribute: string;
  ability: string;
  difficulty: number;

  static fromObject(input: any): Favourite {
    assertIsString(input.name);
    assertIsString(input.attribute)
    assertIsString(input.ability);
    assertIsNumber(input.difficulty);
    return new Favourite(input.name, input.attribute, input.ability, input.difficulty);
  }

  constructor(name: string, attribute: string, ability: string, difficulty: number, check ?: boolean) {
    this.name = name;
    this.attribute = attribute;
    this.ability = ability;
    this.difficulty = difficulty;
    if (check) {
      if (!(ListOfAbilities.includes(ability) || ListOfBonuses.includes(ability))) {
        throw new Error("Invalid ability:" + ability);
      }
      if (!ListOfAttributes.includes(attribute)) {
        throw new Error("Invalid attribute:" + attribute);
      }
      if (difficulty < 2 || difficulty > 10 || difficulty !== Math.floor(difficulty)) {
        throw new Error("Invalid difficulty:" + difficulty);
      }
    }
  }

  clone(): Favourite {
    return new Favourite(this.name, this.attribute, this.ability, this.difficulty);
  }

  getId(): string {
    if (!this.id) {
      throw new Error("Favourite has no ID");
    }
    return this.id;
  }
  
  setId(others : Favourite[]) {
    let newId: string;
    let tester = (s: string) => others.some((f) => f.id === s);
    do {
      newId = Math.random().toString(36).substring(2, 9);
    } while (tester(newId));
    this.id = newId;
  }
}

const INITIAL_FAVOURITES = [
  new Favourite("Bite Attack", "Dexterity", "Brawl", 5, true),
  new Favourite("Bite Damage", "Strength", "+1 dice", 6, true),
  new Favourite("Claw Attack", "Dexterity", "Brawl", 6, true),
  new Favourite("Claw Damage", "Strength", "+2 dice", 6, true),
  new Favourite("Kick Attack", "Dexterity", "Brawl", 7, true),
  new Favourite("Kick Damage", "Strength", "+1 dice", 6, true),
  new Favourite("Punch Attack", "Dexterity", "Brawl", 6, true),
  new Favourite("Punch Damage", "Strength", "No bonus", 6, true),
  new Favourite("Dodge", "Dexterity", "Dodge", 6, true),
  new Favourite("Shoot", "Dexterity", "Firearms", 6, true),

  new Favourite("Look for clues", "Intelligence", "Investigation", 7, true),
  new Favourite("Searching", "Perception", "Investigation", 7, true),
  new Favourite("Sneaking", "Dexterity", "Stealth", 6, true),

  new Favourite("Gift: Persuasion", "Charisma", "Subterfuge", 6, true),
  new Favourite("Gift: Sense Wyrm", "Perception", "Occult", 6, true),
  new Favourite("Gift: Heightened Senses", "Perception", "Primal-Urge", 6, true),
  new Favourite("Gift: Leaping", "Stamina", "Athletics", 7, true),
  new Favourite("Gift: Blur of the Milky Eye", "Manipulation", "Stealth", 8, true),
  new Favourite("Gift: Mother's Touch", "Intelligence", "Medicine", 6, true),
  new Favourite("Gift: Scent of the True Form", "Perception", "Primal-Urge", 8, true),
  new Favourite("Gift: Truth of Gaia", "Intelligence", "Empathy", 6, true),
  new Favourite("Gift: Beast Speech", "Charisma", "Animal Ken", 6, true),
  new Favourite("Gift: Call of the Wyld", "Stamina", "Empathy", 6, true),
  new Favourite("Gift: Mindspeak", "Manipulation", "Expression", 6, true),
  new Favourite("Gift: The Falling Touch", "Dexterity", "Medicine", 6, true),
  new Favourite("Gift: Cooking", "Wits", "Survival", 6, true),
  new Favourite("Gift: Scent of Sweet Honey", "Wits", "Subterfuge", 6, true),
  new Favourite("Gift: Control Simple Machine", "Manipulation", "Repair", 7, true)
];

export class AppState {
  statistics: StatisticsBlock;
  favourites: Favourite[];
  history: number[][];


  constructor(statistics: StatisticsBlock, favourites: Favourite[], history: number[][]) {
    this.statistics = statistics;
    this.favourites = favourites;
    this.history = history;

    // ensure favourites have unique ids
    this.favourites.forEach((favourite) => {
      if (typeof favourite.id !== 'string') {
        let newId: string;
        let tester = (s: string) => this.favourites.some((f) => f.id === s);
        do {
          newId = Math.random().toString(36).substring(2, 9);
        } while (tester(newId));
        favourite.id = newId;
      }
    });
  }

  static fromObject(input: any): AppState {
    assertIsObject(input.statistics);
    assertIsArray(input.favourites);
    assertIsArray(input.history);
    return new AppState(
        StatisticsBlock.fromObject(input.statistics),
        input.favourites.map((x: any) => Favourite.fromObject(x)),
        input.history);
  }

  static fromJSON(input: string | null): AppState {
    return input != null
        ? AppState.fromObject(JSON.parse(input))
        : new AppState(new StatisticsBlock(), INITIAL_FAVOURITES, []);
  }

  clone(): AppState {
    return new AppState(
        this.statistics.clone(),
        this.favourites.map((x) => x.clone()),
        [...this.history]
    );
  }

  addRoll(roll: number[]): AppState {
    let newState = this.clone();
    if (newState.history.length >= 30) {
      newState.history.length = 29;
    }
    newState.history.unshift(roll);
    return newState;
  }

  toJSON(): object {
    return {statistics: this.statistics, favourites: this.favourites, history: this.history};
  }
}


export function useLocalStorageForState(
    key: string
) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return new AppState(new StatisticsBlock(), INITIAL_FAVOURITES, []);
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return (item == null) ? new AppState(new StatisticsBlock(), INITIAL_FAVOURITES, []) : AppState.fromJSON(item);
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return new AppState(new StatisticsBlock(), INITIAL_FAVOURITES, []);
    }
  });
  // Return a wrapped version of useState's setter function that persists the new value to localStorage.
  const setValue = (value: AppState) => {
    try {
      // Save state
      setStoredValue(value);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue] as const;
}
