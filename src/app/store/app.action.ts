import { createAction, props } from "@ngrx/store";
import {NodeMinimal} from "../shared/interfaces/NodeMinimal";
import {FormMinimal} from "../shared/interfaces/FormMinimal";
import {Form} from "../shared/interfaces/Form";




enum Actions {
  SELECT_NODE = "[Tree] Select Tree Node",
  LOAD_FORM_MINIMALS = "[App] Load Form Minimals",
  LOAD_FORM_MINIMALS_SUCCESS = '[Load Form Minimals Effect] Form Minimals Loaded',
  LOAD_FORM_FROM_CODE = '[Header] Load Form From Code',
  LOAD_FORM_FROM_CODE_SUCCESS = '[Load Form From Code Effect] Form Loaded From Code',
}

export const selectNode = createAction(
  Actions.SELECT_NODE, props<{node: NodeMinimal}>()
);

export const loadFormMinimals = createAction(
  Actions.LOAD_FORM_MINIMALS
);

export const loadFormMinimalsSuccess = createAction(
  Actions.LOAD_FORM_MINIMALS_SUCCESS, props<{ form: FormMinimal[]}>()
);

export const loadFormFromCode = createAction(
  Actions.LOAD_FORM_FROM_CODE, props<{ code: string }>()
);

export const loadFormFromCodeSuccess = createAction(
  Actions.LOAD_FORM_FROM_CODE_SUCCESS, props<{form: Form}>()
);

