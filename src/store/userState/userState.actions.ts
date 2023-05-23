import { createAction } from "@reduxjs/toolkit";
import { User } from "../../models/User";

export const addUser = createAction<User>('userState/addUser');
export const clearUser = createAction("userState/clearUser");