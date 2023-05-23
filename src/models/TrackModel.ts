export interface Track {
  id: number;
  type: string;
  event: string;
  name: string;
  issuedAt: Date;
  expiration: Date;
  batchCode: string;
  resourceUri: string;
  chained: boolean;
  available: boolean;
  published: boolean;
  inputs: any[];
  outputs: number[];
  supplyChain: Track[];
}

export interface TrackPost {
  type: string;
  event: string;
  name: string;
  expiration?: Date;
  batchCode: string;
  inputs: any[];
}

export interface TrackRedux extends Track {
  biotrack: boolean;
}