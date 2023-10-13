import { createAction, props } from "@ngrx/store";
import {NodeMinimal} from "../shared/interfaces/NodeMinimal";


enum Actions {
  SELECT_NODE = "[Tree] Select Tree Node"
}

export const selectNode = createAction(
  Actions.SELECT_NODE, props<{node: NodeMinimal}>()
);

