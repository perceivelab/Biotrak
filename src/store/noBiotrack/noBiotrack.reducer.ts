import { NoBiotrackModel } from './../../models/NoBiotrackModel';
import { createReducer } from "@reduxjs/toolkit";
import { addNoBiotrack, clearNoBiotrack } from './noBiotrack.actions';

const initialState: NoBiotrackModel = {
  id: '',
  name: '',
  lot: '',
  creationDate: '',
  expirationDate: '',
};

export const noBiotrackReducer = createReducer(
  initialState as NoBiotrackModel,
  (builder) =>
    builder
      .addCase(
        addNoBiotrack,
        (initialState, action) => (initialState = action.payload)
      )
      .addCase(clearNoBiotrack, () => initialState)
);
