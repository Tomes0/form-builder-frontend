import { createAction, props } from "@ngrx/store";
import {NodeMinimal} from "../shared/interfaces/NodeMinimal";
import {FormMinimal} from "../shared/interfaces/FormMinimal";
import {Form} from "../shared/interfaces/Form";

enum Actions {
  SELECT_NODE = "[Tree] Select Tree Node",
  LOAD_FORM_MINIMALS = "[App] Load Form Minimals",
  LOAD_FORM_MINIMALS_SUCCESS = '[Load Form Minimals Effect] Form Minimals Loaded',
  LOAD_FORM_BY_CODE = '[Header] Load Form By Code',
  LOAD_FORM_BY_CODE_SUCCESS = '[Load Form By Code Effect] Form Loaded By Code',
  SAVE_FORM = '[Tree] Save Form',
  SAVE_FORM_SUCCESS = '[Save Form By Code Effect] Form Saved'
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

export const loadFormByCode = createAction(
  Actions.LOAD_FORM_BY_CODE, props<{ code: string }>()
);

export const loadFormFromCodeSuccess = createAction(
  Actions.LOAD_FORM_BY_CODE_SUCCESS, props<{form: Form}>()
);

export const saveForm = createAction(
  Actions.SAVE_FORM, props<{form: Form}>()
);

export const saveFormSuccess = createAction(
  Actions.SAVE_FORM_SUCCESS
);
