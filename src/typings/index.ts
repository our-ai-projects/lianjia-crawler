export interface CrawlerOptions {
  type: number;
  batchId: number;
  mapping: Obj;
  cache: string[];
  queue: string[];
}

export type Obj = {
  [key in string]: any;
};

export enum CrawlerType {
  SECOND_HAND_HOUSE = 1,
  NEW_HOUSE = 2,
  RENT_HOUSE = 3
}
