import { createReducer } from '@reduxjs/toolkit';
import { addType, removeType } from './inputStateProduction.actions';

export const inputStateProductionReducer = createReducer('', (builder) =>
  builder
    .addCase(addType, (state, action) =>
    state.includes(action.payload) ? state : action.payload
    )
    .addCase(removeType, () => '')
);
