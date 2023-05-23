import { createReducer } from "@reduxjs/toolkit";
import { User } from "../../models/User";
import { addUser, clearUser } from './userState.actions';

const initialState: User = {
  username: '',
  tenant: '',
  displayName: 'A B',
  roles: [''],
  privileges: ['']
};

export const userStateReducer = createReducer(initialState as User, (builder) =>
  builder
    .addCase(addUser, (initialState, action) => (initialState = action.payload))
    .addCase(clearUser, () => initialState)
);
