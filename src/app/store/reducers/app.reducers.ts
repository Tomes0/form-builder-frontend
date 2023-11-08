import {createReducer, on} from '@ngrx/store';
import {FormMinimal} from "../../shared/interfaces/FormMinimal";
import {AppActions} from "../actions/actionTypes";
import {Form} from "../../shared/interfaces/Form";

export interface AppState {
  formMinimal: FormMinimal[];
}

export const initialAppState: AppState = {
  formMinimal: [],
};

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.loadFormMinimalsSuccess, (state, action) => {
    return {
      ...state,
      formMinimal: action.formMinimals
    };
  }),
);
