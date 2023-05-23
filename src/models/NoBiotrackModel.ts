export interface NoBiotrackModel {
  id: unknown;
  name: string;
  lot: string;
  creationDate: string;
  expirationDate: string;
}

export interface NoBiotrackModelRedux extends NoBiotrackModel {
  biotrack: boolean;
}
