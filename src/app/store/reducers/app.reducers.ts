import {createReducer, on} from '@ngrx/store';
import * as AppActions from "../app.action";

export interface AppState {
    placeholder: string;
}

export const initialAppState: AppState = {
    placeholder: {} as string
};

export const appReducer = createReducer(
    initialAppState,
    on(AppActions.placeholder, (state, action) => initialAppState)
);
