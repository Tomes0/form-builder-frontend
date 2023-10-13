import {createReducer, on} from '@ngrx/store';
import * as AppActions from "../app.action";
import {NodeMinimal} from "../../shared/interfaces/NodeMinimal";

export interface AppState {
    selectedNode: NodeMinimal
}

export const initialAppState: AppState = {
    selectedNode: {} as NodeMinimal
};

export const appReducer = createReducer(
    initialAppState,
    on(AppActions.selectNode, (state, action) =>{
      return {
        ...state,
        selectedNode: action.node
      }
    })
);
