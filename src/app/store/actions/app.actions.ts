import {createAction, props} from "@ngrx/store";
import {Form} from "src/app/shared/interfaces/Form";
import {FormMinimal} from "../../shared/interfaces/FormMinimal";

enum Actions {
  LOAD_FORM_MINIMALS = "[App] Load Form Minimals",
  LOAD_FORM_MINIMALS_SUCCESS = '[Load Form Minimals Effect] Form Minimals Loaded',
  LOAD_FORM_BY_CODE = '[Header] Load Form By Code',
  LOAD_FORM_BY_CODE_SUCCESS = '[Load Form By Code Effect] Form Loaded',
  SAVE_FORM = '[Tree] Save Form',
  SAVE_FORM_SUCCESS = '[Save Form By Code Effect] Form Saved',
  DELETE_FORM = '[Header] Delete Form By Code',
  DELETE_FORM_SUCCESS = '[Delete Form By Code Effect] Form Deleted',
  DELETE_FORM_CANCEL = '[Delete Form By Code Effect] Form Deletion Canceled',
  CREATE_NEW_FORM = '[Header] Create New Form',
  CREATE_NEW_FORM_SUCCESS = '[Create New Form Effect] Form Created',
}

export const loadFormMinimals = createAction(
  Actions.LOAD_FORM_MINIMALS
);

export const loadFormMinimalsSuccess = createAction(
  Actions.LOAD_FORM_MINIMALS_SUCCESS, props<{ formMinimals: FormMinimal[] }>()
);

export const loadFormByCode = createAction(
  Actions.LOAD_FORM_BY_CODE, props<{ code: string }>()
);

export const loadFormFromCodeSuccess = createAction(
  Actions.LOAD_FORM_BY_CODE_SUCCESS, props<{ form: Form }>()
);

export const saveForm = createAction(
  Actions.SAVE_FORM, props<{ form: Form }>()
);

export const saveFormSuccess = createAction(
  Actions.SAVE_FORM_SUCCESS
);

export const deleteForm = createAction(
  Actions.DELETE_FORM, props<{ formCode: string }>()
);

export const deleteFormSuccess = createAction(
  Actions.DELETE_FORM_SUCCESS
);

export const deleteFormCancel = createAction(
  Actions.DELETE_FORM_CANCEL
);

export const createNewForm = createAction(
  Actions.CREATE_NEW_FORM
);

export const createNewFormSuccess = createAction(
  Actions.CREATE_NEW_FORM_SUCCESS, props<{ form: Form }>()
);
