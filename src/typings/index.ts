export interface CrawlerOptions {
  type: number;
  batch: string;
}

export enum CrawlerType {
  SECOND_HAND_HOUSE = 1,
  NEW_HOUSE = 2,
  RENT_HOUSE = 3
}
