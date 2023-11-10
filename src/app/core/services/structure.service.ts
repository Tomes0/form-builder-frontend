import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {delay, map, skipWhile, tap} from "rxjs";
import {TreeDragDropService} from "primeng/api";
import {FieldNode} from 'src/app/shared/classes/formNodes/FieldNode';
import {GroupNode} from 'src/app/shared/classes/formNodes/GroupNode';
import {FormNode} from 'src/app/shared/classes/formNodes/FormNode';
import {BaseNode} from 'src/app/shared/classes/formNodes/BaseNode';
import {FieldType} from "../../shared/enums/FiledTypes";
import {ChoiceNode} from "../../shared/classes/formNodes/ChoiceNode";
import {LayoutService} from "./layout.service";
import {Form} from "../../shared/interfaces/Form";
import {interfaceToClass} from "../../shared/functions/interfaceToClass";
import {MainActions} from "../../modules/store/actions/actionTypes";
import {MainSelectors} from "../../modules/store/selectors";
import {isEmptyObject} from "../../shared/functions/isEmptyObject";
import {classToInterface} from "../../shared/functions/classToInterface";
import {TreeNode} from "../../shared/interfaces/TreeNode";

@Injectable()
export class StructureService {

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

  commitFormAsNode(formNode: FormNode){
    this.commitForm(classToInterface(formNode));
  }

  fetchFormAsNode(){
    return this.fetchForm().pipe(
      skipWhile(form => isEmptyObject(form)),
      map(form => interfaceToClass(form).getAsTreeNode()),
    );
  }

  selectNode(event: { node: TreeNode<FormNode | GroupNode | FieldNode | ChoiceNode> }) {
    this.store.dispatch(MainActions.selectNode({node: event.node.data.getMinimal()}));
  }

  addNode(selectedNode: TreeNode<FormNode | GroupNode | FieldNode | ChoiceNode>) {
    const newNodeDepth = selectedNode.data.calculateDepth() + 1;

    if(newNodeDepth === 1){
      new GroupNode(<FormNode>selectedNode.data, 'group');
    }

    if(newNodeDepth === 2) {
      new FieldNode(<GroupNode>selectedNode.data, 'field', FieldType.NONE);
    }

    if(newNodeDepth === 3) {
      new ChoiceNode(<FieldNode>selectedNode.data, 'choice');
    }

    if(newNodeDepth < 1 || newNodeDepth > 3){
      return;
    }

    this.commitFormAsNode(selectedNode.data.findRootNode());
  }

  removeNode(selectedNode: TreeNode<FormNode | GroupNode | FieldNode | ChoiceNode>) {
    if(selectedNode.data instanceof FormNode){
      return;
    }

    selectedNode.data.removeNode();
    this.commitFormAsNode(selectedNode.data.findRootNode());
  }

  hierarchyChange() {
    return this.treeDragDropService.dragStop$.pipe(
      delay(10),
      tap(event => {
        event.node?.data.moveNode(<BaseNode>event?.node.parent?.data);
      })
    );
  }

  dragStart() {
    return this.treeDragDropService.dragStart$.pipe(
      tap(val => this.layoutService.setDraggedNode(val.node))
    );
  }
}
