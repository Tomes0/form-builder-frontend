import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppActions} from "../../store/actionTypes";
import {Selectors} from "../../store/selectors"
import {NodeMinimal} from "../../../assets/models/interfaces/NodeMinimal";
import {BehaviorSubject, isEmpty} from "rxjs";
import {TreeNode} from "primeng/api";
import {BaseNode} from "../../../assets/models/classes/formNodes/BaseNode";
import {MedicalFormNode} from "../../../assets/models/classes/formNodes/MedicalFormNode";
import {MedicalFormGroupFieldNode} from "../../../assets/models/classes/formNodes/MedicalFormGroupFieldNode";
import {MedicalFormGroupNode} from "../../../assets/models/classes/formNodes/MedicalFormGroupNode";

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private _rootNodesSubject = new BehaviorSubject<TreeNode<BaseNode>[]>([]);
  rootNodes$ = this._rootNodesSubject.asObservable();

  constructor(
    private store: Store
  ) {
    const rootNodes = this.getRootNodes();
    const root = new MedicalFormNode("Root");
    const child1 = new MedicalFormGroupNode(root, "Child1");

    new MedicalFormGroupFieldNode(child1, "SubChild1");
    new MedicalFormGroupFieldNode(child1, "SubChild2");
    new MedicalFormGroupFieldNode(child1, "SubChild3");

    child1.setProperty('id','sajt');
    rootNodes.push(root.getAsTreeNode());


    this.saveRootNodes(rootNodes);
  }

  private getRootNodes(){
    return this._rootNodesSubject.getValue();
  }

  private saveRootNodes(nodes: TreeNode<BaseNode>[]){
    this._rootNodesSubject.next(nodes);
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
    const rootNodes = this.getRootNodes();
    this.saveRootNodes([...rootNodes, new MedicalFormNode("Root")]);
  }

  addNode(selectedNode: TreeNode<BaseNode>){
    const newNode = new MedicalFormGroupFieldNode(selectedNode.data, 'field');
    selectedNode.children?.push(newNode.getAsTreeNode());
    selectedNode.expanded = true;
  }

  removeNode(selectedNode: TreeNode<BaseNode>){
    const rootNodes = this.getRootNodes();

    selectedNode.data?.removeNode();

    if (selectedNode.parent && selectedNode.parent.data) {
      selectedNode.parent.children = selectedNode.parent.data.getChildrenAsNodes();
    } else {
      rootNodes.splice(rootNodes.indexOf(selectedNode), 1);
    }

    this.saveRootNodes(rootNodes);
  }

  updateNode(propertyUpdate: NodeMinimal) {
    const rootNodes = this.getRootNodes();
    rootNodes.forEach(root => {
      if(root.data?.root.code === propertyUpdate.rootCode){
        root.data?.traverse("breadthFirst", (node) => {
          if(node.code === propertyUpdate.code){
            for(const key in propertyUpdate.properties){
              if( !!propertyUpdate.properties[key] ){
                node.setProperty(key, propertyUpdate.properties[key]);
              }

            }
          }
        });
      }
    });
  }
}
