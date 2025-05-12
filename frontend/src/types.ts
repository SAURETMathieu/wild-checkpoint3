export type ContinentType = {
  id: number;
  name: string;
};

export type CountryType = {
  id: number;
  name: string;
  emoji: string;
  code: string;
  continent: ContinentType;
};
