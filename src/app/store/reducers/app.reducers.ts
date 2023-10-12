import {createReducer, on} from '@ngrx/store';
import * as AppActions from "../app.action";
import {TreeNode} from "primeng/api";
import {BaseNode} from "../../../assets/models/classes/formNodes/BaseNode";
import {NodeProperty} from "../../../assets/models/interfaces/NodeProperty";
import {NodeMinimal} from "../../../assets/models/interfaces/NodeMinimal";

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
