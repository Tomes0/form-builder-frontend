import { createAction, props } from "@ngrx/store";
import {NodeMinimal} from "../shared/interfaces/NodeMinimal";
import {FormMinimal} from "../shared/interfaces/FormMinimal";


enum Actions {
  SELECT_NODE = "[Tree] Select Tree Node",
  LOAD_FORM_MINIMALS = "[App] Load Form Minimals",
  LOAD_FORM_MINIMALS_SUCCESS = '[Load Form Minimals Effect] Form Minimals Loaded'
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
