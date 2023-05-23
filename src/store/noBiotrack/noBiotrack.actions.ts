import { createAction } from "@reduxjs/toolkit";
import { NoBiotrackModel } from "../../models/NoBiotrackModel";

export const addNoBiotrack = createAction<NoBiotrackModel>('noBiotrack/addNoBiotrack');
export const clearNoBiotrack = createAction('noBiotrack/clearNoBiotrack');