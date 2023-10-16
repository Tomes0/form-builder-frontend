import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppActions} from "../../store/actionTypes";
import {Selectors} from "../../store/selectors"
import {BehaviorSubject, delay, tap} from "rxjs";
import {TreeDragDropService, TreeNode} from "primeng/api";
import {MedicalFormGroupFieldNode} from 'src/app/shared/classes/formNodes/MedicalFormGroupFieldNode';
import {MedicalFormGroupNode} from 'src/app/shared/classes/formNodes/MedicalFormGroupNode';
import {MedicalFormNode} from 'src/app/shared/classes/formNodes/MedicalFormNode';
import {BaseNode} from 'src/app/shared/classes/formNodes/BaseNode';
import {NodeMinimal} from "../../shared/interfaces/NodeMinimal";
import {FieldType} from "../../shared/enums/FiledTypes";

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  private _rootNodesSubject = new BehaviorSubject<TreeNode<BaseNode>[]>([]);
  rootNodes$ = this._rootNodesSubject.asObservable();

  constructor(
    private store: Store,
    private treeDragDropService: TreeDragDropService
  ) {
    const rootNodes = this.getRootNodes();
    const root = new MedicalFormNode("Root");
    const child1 = new MedicalFormGroupNode(root, "Child1");

    new MedicalFormGroupFieldNode(child1, "SubChild1", FieldType.NONE);
    new MedicalFormGroupFieldNode(child1, "SubChild2", FieldType.NONE);
    new MedicalFormGroupFieldNode(child1, "SubChild3", FieldType.NONE);

    child1.setProperty('id', 'sajt');
    rootNodes.push(root.getAsTreeNode());
    this.saveRootNodes(rootNodes);
  }

  private getRootNodes() {
    return this._rootNodesSubject.getValue();
  }

  private saveRootNodes(nodes: TreeNode<BaseNode>[]) {
    this._rootNodesSubject.next(nodes);
  }

  selectNode(event: { node: TreeNode<BaseNode> }) {
    console.log(event)

    if (event.node.data) {
      this.store.dispatch(AppActions.selectNode({node: event.node.data.getMinimal()}));
    }
  }

  getSelectedNode() {
    return this.store.select(Selectors.AppSelectors.selectedNode);
  }

  addRootNode() {
    const rootNodes = this.getRootNodes();
    const root = new MedicalFormNode("Root");
    rootNodes.push(root.getAsTreeNode());
    this.saveRootNodes(rootNodes);
  }

  addNode(selectedNode: TreeNode<BaseNode>) {
    const newNode = new MedicalFormGroupFieldNode(selectedNode.data, 'field', FieldType.NONE);
    selectedNode.children?.push(newNode.getAsTreeNode());
    selectedNode.expanded = true;
  }

  removeNode(selectedNode: TreeNode<BaseNode>) {
    const rootNodes = this.getRootNodes();

    selectedNode.data?.removeNode();

    if (selectedNode.parent && selectedNode.parent.data) {
      selectedNode.parent.children = selectedNode.parent.data.getChildrenAsNodes();
    } else {
      rootNodes.splice(rootNodes.indexOf(selectedNode), 1);
    }

    this.saveRootNodes(rootNodes);
  }

  hierarchyChange() {
    return this.treeDragDropService.dragStop$.pipe(
      delay(10),
      tap(event => {
        event.node?.data?.moveNode(<BaseNode>event?.node?.parent?.data);
      })
    );
  }


  updateNode(propertyUpdate: NodeMinimal) {
    const rootNodes = this.getRootNodes();


    const rootNodeToUpdate = rootNodes.find(node => {
      console.log(node, propertyUpdate)

      return node.data?.code === propertyUpdate.rootCode
    });


    if (!rootNodeToUpdate) {
      return;
    }


    rootNodeToUpdate.data?.traverse("breadthFirst", (node) => {

      if (node.code === propertyUpdate.code) {

        if (propertyUpdate.fieldType) {
          (node as MedicalFormGroupFieldNode).setFieldType(propertyUpdate.fieldType);
        }

        if(propertyUpdate.properties){
          node.setProperties(Object.entries(propertyUpdate.properties));
        }

      }
    });
  }

}
