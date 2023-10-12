import { Injectable } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppActions} from "../../store/actionTypes";
import {Selectors} from "../../store/selectors"
import {NodeMinimal} from "../../../assets/models/interfaces/NodeMinimal";
import {BehaviorSubject} from "rxjs";
import {TreeNode} from "primeng/api";
import {BaseNode} from "../../../assets/models/classes/formNodes/BaseNode";
import {MedicalFormNode} from "../../../assets/models/classes/formNodes/MedicalFormNode";
import {MedicalFormGroupFieldNode} from "../../../assets/models/classes/formNodes/MedicalFormGroupFieldNode";
import {MedicalFormGroupNode} from "../../../assets/models/classes/formNodes/MedicalFormGroupNode";

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private rootsSubject = new BehaviorSubject<TreeNode<BaseNode>[]>([]);
  roots$ = this.rootsSubject.asObservable();

  constructor(
    private store: Store
  ) {
    const roots = this.rootsSubject.getValue();
    const root = new MedicalFormNode("Root");
    const child1 = new MedicalFormGroupNode(root, "Child1");

    new MedicalFormGroupFieldNode(child1, "SubChild1");
    new MedicalFormGroupFieldNode(child1, "SubChild2");
    new MedicalFormGroupFieldNode(child1, "SubChild3");

    child1.setProperty('id','sajt');
    roots.push(root.getAsTreeNode());


    this.rootsSubject.next(roots);
  }

  selectNode(event: { node: TreeNode<BaseNode> }) {
    if(event.node.data){
      this.store.dispatch(AppActions.selectNode({node: event.node.data.getMinimal()}));
    }
  }

  getSelectedNode(){
    return this.store.select(Selectors.AppSelectors.selectedNode);
  }

  addRootNode(){
    const roots = this.rootsSubject.getValue();
    this.rootsSubject.next([...roots, new MedicalFormNode("Root")]);
  }

  addNode(selectedNode: TreeNode<BaseNode>){
    const newNode = new MedicalFormGroupFieldNode(selectedNode.data, 'field');
    selectedNode.children?.push(newNode.getAsTreeNode());
    selectedNode.expanded = true;
  }

  removeNode(selectedNode: TreeNode<BaseNode>){
    const nodes = this.rootsSubject.getValue();

    selectedNode.data?.removeNode();

    if (selectedNode.parent) {
      selectedNode.parent.children = selectedNode.parent.data?.getChildrenAsNodes();
    } else {
      nodes.splice(nodes.indexOf(selectedNode), 1);
    }

    this.rootsSubject.next(nodes);
  }
}
