import { Injectable } from '@angular/core';
import {TreeNode} from "primeng/api";
import {Store} from "@ngrx/store";
import {BaseNode} from "../../../assets/models/classes/formNodes/BaseNode";
import {AppActions} from "../../store/actionTypes";
import {Selectors} from "../../store/selectors"
import {NodeMinimal} from "../../../assets/models/interfaces/NodeMinimal";

@Injectable()
export class NodeService {

  constructor(
    private store: Store
  ) { }

  selectNode(node: NodeMinimal){
    this.store.dispatch(AppActions.selectNode({node}));
  }

  getSelectedNode(){
    return this.store.select(Selectors.AppSelectors.selectedNode);
  }
}
