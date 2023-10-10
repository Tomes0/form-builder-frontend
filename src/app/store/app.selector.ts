import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./reducers/app.reducers";

export const appFeatureState = createFeatureSelector<AppState>('appState');

// export const placeholder = createSelector(
//   appFeatureState,
//     (appFeatureState) => appFeatureState
// );

