import {createFeatureSelector, createReducer, createSelector} from "@ngrx/store";
import { AppState } from "../reducers/app.reducers";

export const appFeatureState = createFeatureSelector<AppState>('appState');

export const formMinimals = createSelector(
  appFeatureState,
  (appFeatureState) => appFeatureState.formMinimal
);
