import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { inputMaterialsReducer } from './inputMaterials/inputMaterials.reducer';
import { noBiotrackReducer } from './noBiotrack/noBiotrack.reducer';
import { singleAcceptationReducer } from './singleAcceptation/singleAcceptation.reducer';
import { inputStateProductionReducer } from './stateProduction/inputStateProduction.reducer';
import { userStateReducer } from './userState/userState.reducer';

const rootReducer = combineReducers({
  inputMaterials: inputMaterialsReducer,
  inputStateProduction: inputStateProductionReducer,
  userState: userStateReducer,
  singleAcceptation: singleAcceptationReducer,
  noBiotrack: noBiotrackReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;