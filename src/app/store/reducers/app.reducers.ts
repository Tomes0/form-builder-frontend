import {createReducer, on} from '@ngrx/store';
import * as AppActions from "../app.action";
import {NodeMinimal} from "../../shared/interfaces/NodeMinimal";
import {FormMinimal} from "../../shared/interfaces/FormMinimal";

export interface AppState {
    selectedNode: NodeMinimal,
    formMinimal: FormMinimal[]
}

export const initialAppState: AppState = {
    selectedNode: {} as NodeMinimal,
  formMinimal: []
};

export const appReducer = createReducer(
    initialAppState,
    on(AppActions.selectNode, (state, action) =>{
      return {
        ...state,
        selectedNode: action.node
      }
    }),
  on(AppActions.loadFormMinimalsSuccess, (state, action) => {
    return{
      ...state,
      formMinimal: action.form
    }
  })
);
