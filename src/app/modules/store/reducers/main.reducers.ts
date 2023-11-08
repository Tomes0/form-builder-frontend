import {createReducer, on} from '@ngrx/store';
import { Form } from 'src/app/shared/interfaces/Form';
import {NodeMinimal} from "../../../shared/interfaces/NodeMinimal";
import {AppActions} from "../../../store/actions/actionTypes";

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

);
