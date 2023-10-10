import { createAction } from "@ngrx/store";


enum Actions {
  PLACEHOLDER = "[Placeholder] Placeholder",
}

export const placeholder = createAction(
  Actions.PLACEHOLDER
);

