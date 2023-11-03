import {createReducer, on} from '@ngrx/store';
import * as Actions from "../app.action";
import {NodeMinimal} from "../../shared/interfaces/NodeMinimal";
import {FormMinimal} from "../../shared/interfaces/FormMinimal";
import {Form} from "../../shared/interfaces/Form";

export interface AppState {
  selectedNode: NodeMinimal;
  formMinimal: FormMinimal[];
  form: Form;
}

export const initialAppState: AppState = {
  selectedNode: {} as NodeMinimal,
  formMinimal: [],
  form: {} as Form
};

export const appReducer = createReducer(
  initialAppState,
  on(Actions.selectNode, (state, action) => {
    return {
      ...state,
      selectedNode: action.node
    };
  }),
  on(Actions.loadFormMinimalsSuccess, (state, action) => {
    return {
      ...state,
      formMinimal: action.form
    };
  }),
  on(Actions.loadFormFromCodeSuccess, (state, action) => {
    return {
      ...state,
      form: action.form
    };
  })
);
