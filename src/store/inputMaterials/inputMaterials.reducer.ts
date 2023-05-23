import { createReducer } from "@reduxjs/toolkit";
import { NoBiotrackModelRedux } from "../../models/NoBiotrackModel";
import { TrackRedux } from "../../models/TrackModel";
import { add, remove, clear } from "./inputMaterials.actions";

export const inputMaterialsReducer = createReducer(
  [] as Array<TrackRedux | NoBiotrackModelRedux>,
  (builder) =>
    builder
      .addCase(add, (state, action) =>
        state.find(({ id }) => id === action.payload.id)
          ? state
          : [...state, action.payload]
      )
      .addCase(remove, (state, action) => {
        return state.filter((_, index) => index !== action.payload);
      })
      .addCase(clear, () => [] as [])
);
