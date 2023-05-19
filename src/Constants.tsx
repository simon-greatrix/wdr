
const ListOfAttributes = [
  // Physical
  "Strength",
  "Dexterity",
  "Stamina",

  // Social
  "Charisma",
  "Manipulation",
  "Appearance",

  // Mental
  "Perception",
  "Intelligence",
  "Wits"
];

const ListOfAbilities = [
  // Talents
  "Alertness",
  "Athletics",
  "Brawl",
  "Dodge",
  "Empathy",
  "Expression",
  "Intimidation",
  "Primal-Urge",
  "Streetwise",
  "Subterfuge",

  // Skills
  "Animal Ken",
  "Drive",
  "Etiquette",
  "Firearms",
  "Melee",
  "Leadership",
  "Performance",
  "Repair",
  "Stealth",
  "Survival",

  // Knowledge
  "Computer",
  "Enigmas",
  "Investigation",
  "Law",
  "Linguistics",
  "Medicine",
  "Occult",
  "Politics",
  "Rituals",
  "Science"
];

const ListOfBonuses = [
  "No bonus",
  "+1 dice",
  "+2 dice",
  "+3 dice",
  "+4 dice",
  "+5 dice"
];

function assertIsNumber(value: any): asserts value is number {
  if (typeof value !== 'number') {
    throw new TypeError('Not a number, but ' + typeof value);
  }
}

function assertIsString(value: any): asserts value is string {
  if (typeof value !== 'string') {
    throw new TypeError('Not a string, but ' + typeof value);
  }
}

function assertIsBoolean(value: any): asserts value is boolean {
  if (typeof value !== 'boolean') {
    throw new TypeError('Not a boolean, but ' + typeof value);
  }
}

function assertIsArray(value: any): asserts value is any[] {
  if (!Array.isArray(value)) {
    throw new TypeError('Not an array, but ' + typeof value);
  }
}

function assertIsObject(value: any): asserts value is object {
  if (typeof value !== 'object') {
    throw new TypeError('Not an object, but ' + typeof value);
  }
}

export {ListOfAbilities, ListOfAttributes, ListOfBonuses, assertIsNumber, assertIsString, assertIsBoolean, assertIsArray, assertIsObject};