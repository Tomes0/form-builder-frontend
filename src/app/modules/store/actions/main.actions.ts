import {createAction, props} from "@ngrx/store";
import {Node} from "../../../shared/interfaces/Node";
import {Form} from "../../../shared/interfaces/Form";

enum Actions {
  SELECT_NODE = '[Tree] Select Tree Node',
  COMMIT_FORM = '[Header] Save Form State',
  COMMIT_FORM_PROPERTY = '[Property Panel] Save Form State',
  COMMIT_FORM_STRUCTURE = '[Structure Panel] Save Form State',
  COMMIT_FORM_LAYOUT = '[Layout Panel] Save Form State',
  COMMIT_PROPERTY_CHANGES = '[Property Panel] Save Property Changes',
}

export const selectNode = createAction(
  Actions.SELECT_NODE, props<{node: Node}>()
);

export const commitForm = createAction(
  Actions.COMMIT_FORM, props<{ form: Form }>()
);

export const commitFormProperty = createAction(
  Actions.COMMIT_FORM_PROPERTY, props<{ form: Form }>()
);

export const commitFormStructure = createAction(
  Actions.COMMIT_FORM_STRUCTURE, props<{ form: Form }>()
);

export const commitFormLayout = createAction(
    Actions.COMMIT_FORM_LAYOUT, props<{ form: Form }>()
);

export const commitPropertyChanges = createAction(
  Actions.COMMIT_PROPERTY_CHANGES, props<{ propertyUpdate: Node }>()
);



