import {createFeatureSelector, createSelector} from "@ngrx/store";
import {MainFeatureState} from "../reducers";


export const mainFeatureState = createFeatureSelector<MainFeatureState>('mainState');

export const selectedNode = createSelector(
  mainFeatureState,
  (mainFeatureState) => mainFeatureState.mainState.selectedNode
);

export const fetchForm = createSelector(
  mainFeatureState,
  (mainFeatureState) => mainFeatureState.mainState.form
);
