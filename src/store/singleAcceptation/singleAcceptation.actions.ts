import { createAction } from "@reduxjs/toolkit";

export const addSingle = createAction<string>("singleAcceptation/addSingle");
export const removeSingle = createAction('singleAcceptation/removeSingle');