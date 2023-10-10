import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { ActionReducerMap } from "@ngrx/store";
import { appReducer, AppState } from "./app.reducers";

export interface AppFeatureState {
  router: RouterReducerState;
  appState: AppState;
}

export const reducers: ActionReducerMap<AppFeatureState> = {
  router: routerReducer,
  appState: appReducer
};
