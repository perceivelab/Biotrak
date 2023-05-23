import { NoBiotrackModel, NoBiotrackModelRedux } from './../../models/NoBiotrackModel';
import { createAction } from "@reduxjs/toolkit";
import { Track, TrackRedux } from '../../models/TrackModel';

export const add = createAction<TrackRedux | NoBiotrackModelRedux>(
  'inputMaterials/add'
);
export const remove = createAction<number>(
  'inputMaterials/remove'
);
export const clear = createAction("inputMaterials/clear");