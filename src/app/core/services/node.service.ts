import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppActions} from "../../store/actionTypes";
import {Selectors} from "../../store/selectors"
import {BehaviorSubject, delay, tap} from "rxjs";
import {TreeDragDropService, TreeNode} from "primeng/api";
import {MedicalFormGroupFieldNode} from 'src/app/shared/classes/formNodes/MedicalFormGroupFieldNode';
import {MedicalFormGroupNode} from 'src/app/shared/classes/formNodes/MedicalFormGroupNode';
import {FormNode} from 'src/app/shared/classes/formNodes/FormNode';
import {BaseNode} from 'src/app/shared/classes/formNodes/BaseNode';
import {NodeMinimal} from "../../shared/interfaces/NodeMinimal";
import {FieldType} from "../../shared/enums/FiledTypes";
import {MedicalFormGroupFieldChoiceNode} from "../../shared/classes/formNodes/MedicalFormGroupFieldChoiceNode";
import {LayoutService} from "./layout.service";
import {Form} from "../../shared/interfaces/Form";
import {interfaceToClass} from "../../shared/functions/interfaceToClass";

@Injectable()
export class NodeService {

  private _rootNodeSubject = new BehaviorSubject<TreeNode<BaseNode>>({});
  rootNode$ = this._rootNodeSubject.asObservable();

  constructor(
    private store: Store,
    private treeDragDropService: TreeDragDropService,
    private layoutService: LayoutService
  ) {}
  initRootNode(form: Form){
    const newRoot = interfaceToClass(form).getAsTreeNode();

    this._rootNodeSubject.next(newRoot);
    return this.rootNode$;
  }

  getRootNode() {
    return this._rootNodeSubject.getValue();
  }

  private updateRootNode(node: TreeNode<BaseNode>) {
    this._rootNodeSubject.next(node);
  }

  selectNode(event: { node: TreeNode<BaseNode> }) {
    if (event.node.data) {
      this.store.dispatch(AppActions.selectNode({node: event.node.data.getMinimal()}));
    }
  }

  getSelectedNode() {
    return this.store.select(Selectors.AppSelectors.selectedNode);
  }

  addRootNode() {
    const rootNodes = this.getRootNode();
    const root = new FormNode("Root");


    this.updateRootNode(rootNodes);
  }

  addNode(selectedNode: TreeNode<BaseNode>) {
    const newNodeDepth = <number>selectedNode.data?.calculateDepth() + 1;
    let newNode!: FormNode | MedicalFormGroupNode | MedicalFormGroupFieldNode | MedicalFormGroupFieldChoiceNode;

    if(newNodeDepth === 1){
      newNode = new MedicalFormGroupNode(<FormNode>selectedNode.data, 'group');
    }

    if(newNodeDepth === 2) {
      newNode = new MedicalFormGroupFieldNode(<MedicalFormGroupNode>selectedNode.data, 'field', FieldType.NONE);
    }

    if(newNodeDepth === 3) {
      newNode = new MedicalFormGroupFieldChoiceNode(<MedicalFormGroupFieldNode>selectedNode.data, 'choice');
    }

    if(  newNodeDepth < 1 || newNodeDepth > 3){
      return;
    }

    selectedNode.children?.push(newNode.getAsTreeNode());
    selectedNode.expanded = true;
  }

  removeNode(selectedNode: TreeNode<BaseNode>) {
    const rootNodes = this.getRootNode();

    selectedNode.data?.removeNode();

    if (selectedNode.parent && selectedNode.parent.data) {
      selectedNode.parent.children = selectedNode.parent.data.getChildrenAsNodes();
    }

    this.updateRootNode(rootNodes);
  }

  hierarchyChange() {
    return this.treeDragDropService.dragStop$.pipe(
      delay(10),
      tap(event => {
        event.node?.data?.moveNode(<BaseNode>event?.node?.parent?.data);
      })
    );
  }

  dragStart() {
    return this.treeDragDropService.dragStart$.pipe(
      tap(val => this.layoutService.setDraggedNode(val.node))
    );
  }


  updateNode(propertyUpdate: NodeMinimal) {
    const rootNodeToUpdate = this.getRootNode();

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
