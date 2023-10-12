import { createAction, props } from "@ngrx/store";
import {TreeNode} from "primeng/api";
import {BaseNode} from "../../assets/models/classes/formNodes/BaseNode";
import {NodeMinimal} from "../../assets/models/interfaces/NodeMinimal";


enum Actions {
  SELECT_NODE = "[Tree] Select Tree Node"
}

export const selectNode = createAction(
  Actions.SELECT_NODE, props<{node: NodeMinimal}>()
);

