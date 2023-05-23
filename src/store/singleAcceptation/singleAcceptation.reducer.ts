import { createReducer } from "@reduxjs/toolkit";
import { addSingle, removeSingle } from './singleAcceptation.actions';

export const singleAcceptationReducer = createReducer('' as string, (builder) =>
  builder
    .addCase(addSingle, (state, action) =>
      state.includes(action.payload) ? state : action.payload
    )
    .addCase(removeSingle, () => '')
);
