import {createFeatureSelector, createSelector} from "@ngrx/store";
import {MainState} from "../reducers/main.reducers";


export const mainFeatureState = createFeatureSelector<MainState>('mainState');

export const selectedNode = createSelector(
  mainFeatureState,
  (mainFeatureState) => mainFeatureState.selectedNode
);

export const fetchForm = createSelector(
  mainFeatureState,
  (mainFeatureState) => mainFeatureState.form
);
