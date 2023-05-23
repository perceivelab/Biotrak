import { createAction } from "@reduxjs/toolkit";

export const addType = createAction<string>("inputStateProduction/addType");
export const removeType = createAction("inputStateProduction/removeType");