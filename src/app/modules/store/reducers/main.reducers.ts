import {createReducer, on} from '@ngrx/store';
import { Form } from 'src/app/shared/interfaces/Form';
import {NodeMinimal} from "../../../shared/interfaces/NodeMinimal";
import {AppActions} from "../../../store/actions/actionTypes";
import {MainActions} from "../actions/actionTypes";

export interface MainState {
  selectedNode: NodeMinimal;
  form: Form;
}

export const initialMainState: MainState = {
  selectedNode: {} as NodeMinimal,
  form: {} as Form
};

export const mainReducer = createReducer(
  initialMainState,
  on(AppActions.loadFormFromCodeSuccess, (state, action) => {
    return {
      ...state,
      form: action.form
    };
  }),
  on(MainActions.selectNode, (state, action) => {
    return {
      ...state,
      selectedNode: action.node
    }
  }),
  on(MainActions.commitFormStructure, (state, action) => {
    return {
      ...state,
      form: action.form
    }
  }),
  on(MainActions.commitFormLayout, (state, action) => {
    return {
      ...state,
      form: action.form
    }
  }),
  on(MainActions.commitPropertyChanges, (state, action) => {
    const form = state.form;



    return {
      ...state,

    }
  })

);
