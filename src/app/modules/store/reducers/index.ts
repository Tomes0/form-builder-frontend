import {mainReducer, MainState} from "./main.reducers";
import {ActionReducerMap} from "@ngrx/store";

export interface MainFeatureState {
  mainState: MainState;
}

export const reducers: ActionReducerMap<MainFeatureState> = {
  mainState: mainReducer
};
