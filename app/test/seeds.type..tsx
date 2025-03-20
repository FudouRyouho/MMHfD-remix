interface BonusValue {
  [bonusName: string]: (number | string)[]; // Cada bonificación es un array
}

interface Bonus {
  beta: BonusValue;
  classic: BonusValue;
}

interface Element {
  [elementName: string]: Bonus;
}

interface Seed {
  weapon: Element;
  set: Element;
}

interface Craft {
  runes: number[];
}

interface Seeds {
  info: Seed;
  craft: Craft;
}

export interface SeedsData {
  seeds: Seeds;
}