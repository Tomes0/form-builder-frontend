import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {BehaviorSubject, delay, map, skipWhile, tap} from "rxjs";
import {TreeDragDropService, TreeNode} from "primeng/api";
import {FieldNode} from 'src/app/shared/classes/formNodes/FieldNode';
import {GroupNode} from 'src/app/shared/classes/formNodes/GroupNode';
import {FormNode} from 'src/app/shared/classes/formNodes/FormNode';
import {BaseNode, Traverse} from 'src/app/shared/classes/formNodes/BaseNode';
import {NodeMinimal} from "../../shared/interfaces/NodeMinimal";
import {FieldType} from "../../shared/enums/FiledTypes";
import {ChoiceNode} from "../../shared/classes/formNodes/ChoiceNode";
import {LayoutService} from "./layout.service";
import {Form} from "../../shared/interfaces/Form";
import {interfaceToClass} from "../../shared/functions/interfaceToClass";
import {MainActions} from "../../modules/store/actions/actionTypes";
import {MainSelectors} from "../../modules/store/selectors";
import {isEmptyObject} from "../../shared/functions/isEmptyObject";

@Injectable()
export class StructureService {

  _rootNodeSubject = new BehaviorSubject<TreeNode<BaseNode>>({});
  rootNode$ = this._rootNodeSubject.asObservable();

  constructor(
    private store: Store,
    private treeDragDropService: TreeDragDropService,
    private layoutService: LayoutService
  ) {}

  commitForm(form: Form){
    this.store.dispatch(MainActions.commitFormStructure({form}));
  }

  fetchForm(){
    return this.store.select(MainSelectors.fetchForm);
  }

  fetchFormAsNode(){
    return this.fetchForm().pipe(
      skipWhile(form => isEmptyObject(form)),
      map(form => interfaceToClass(form)),
      tap(formNode => this._rootNodeSubject.next(formNode))
    );
  }

  getRootNode() {
    return this._rootNodeSubject.getValue();
  }

  private updateRootNode(node: TreeNode<BaseNode>) {
    this._rootNodeSubject.next(node);
  }

  selectNode(event: { node: BaseNode }) {
    this.store.dispatch(MainActions.selectNode({node: event.node.getMinimal()}));
  }

  addNode(selectedNode: BaseNode) {
    const newNodeDepth = <number>selectedNode.calculateDepth() + 1;

    if(newNodeDepth === 1){
      new GroupNode(<FormNode>selectedNode, 'group');
    }

    if(newNodeDepth === 2) {
      new FieldNode(<GroupNode>selectedNode, 'field', FieldType.NONE);
    }

    if(newNodeDepth === 3) {
      new ChoiceNode(<FieldNode>selectedNode, 'choice');
    }

    if(newNodeDepth < 1 || newNodeDepth > 3){
      return;
    }
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

    rootNodeToUpdate.data?.traverse(Traverse.BREADTHFIRST, (node) => {
      if (node.code === propertyUpdate.code) {

        node.label = propertyUpdate.label;

        if (propertyUpdate.fieldType) {
          (node as FieldNode).setFieldType(propertyUpdate.fieldType);
        }

        if(propertyUpdate.properties){
          node.setProperties(Object.entries(propertyUpdate.properties));
        }
      }
    });
    this.updateRootNode(rootNodeToUpdate);
  }
}
