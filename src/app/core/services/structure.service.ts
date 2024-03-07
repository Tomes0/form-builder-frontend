import {Injectable} from '@angular/core';
import {Store} from "@ngrx/store";
import {map, skipWhile, tap} from "rxjs";
import {TreeDragDropService} from "primeng/api";
import {LayoutService} from "./layout.service";
import {Form} from "../../shared/interfaces/Form";
import {interfaceToTreeNode} from "../../shared/functions/interfaceToTreeNode";
import {MainActions} from "../../modules/store/actions/actionTypes";
import {MainSelectors} from "../../modules/store/selectors";
import {isEmptyObject} from "../../shared/functions/isEmptyObject";
import {classToInterface} from "../../shared/functions/classToInterface";
import {TreeNode} from "../../shared/interfaces/TreeNode";
import {Node} from "../../shared/interfaces/Node";
import {NodeType} from "../../shared/enums/NodeType";

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

  commitFormAsNode(formNode: TreeNode<Node>){
    this.commitForm(classToInterface(formNode));
  }

  fetchFormAsNode(){
    return this.fetchForm().pipe(
      skipWhile(form => isEmptyObject(form)),
      map(form => interfaceToTreeNode(form)),
    );
  }

  selectNode(event: { node: TreeNode<Node> }) {
    this.store.dispatch(MainActions.selectNode({node: event.node.data}));
  }

  addNode(selectedNode: TreeNode<Node>) {
    if(selectedNode.data.type === NodeType.FORM){
      selectedNode.children?.push({
        label: 'new group',
        children: [],
        type: NodeType.GROUP,
        data: this.generateNodeData(selectedNode)
      });
    }

    if(selectedNode.data.type === NodeType.GROUP) {
      selectedNode.children?.push({
        label: 'new field',
        children: [],
        type: NodeType.FIELD,
        data: undefined
      });
    }

    if(selectedNode.data.type === NodeType.FIELD) {
      selectedNode.children?.push({
        label: 'new choice',
        children: [],
        type: NodeType.CHOICE,
        data: undefined
      });
    }
    this.commitFormAsNode(this.getRootNode(selectedNode));
  }

  removeNode(selectedNode: TreeNode<Node>) {
    if(selectedNode.data?.type === NodeType.FORM){
      return;
    }

    selectedNode.parent?.children?.splice( <number>selectedNode.children?.indexOf(selectedNode), 1 );
    this.commitFormAsNode(this.getRootNode(selectedNode));
  }

  dragStart() {
    return this.treeDragDropService.dragStart$.pipe(
      tap(val => this.layoutService.setDraggedNode(val.node))
    );
  }

  private calculateDepth(node: TreeNode<Node>){
    if (node.parent === undefined) {
      return 0;
    }

    let depth = 0;
    let parentNode = node.parent;

    while (parentNode) {
      depth++;
      parentNode = <TreeNode<Node>>parentNode.parent;
    }

    return depth;
  }

  private getRootNode(node: TreeNode<Node>): TreeNode<Node> {
    if (node.parent === undefined) {
      return node;
    }

    let parentNode = <TreeNode<Node>>node.parent;

    while (parentNode.parent) {
      parentNode = <TreeNode<Node>>parentNode.parent;
    }

    return parentNode;
  }

  private generateNodeData(selectedNode: TreeNode<Node>): Node {
    switch (selectedNode.data.type) {
      case NodeType.FORM: {
        return {
          type: NodeType.GROUP,
          code: `${selectedNode.data.code}_GROUP${Math.random()*100}`,
          properties: [],
          propertyList: [],
          name: 'new group',
          ordinalPosition: 0,
        };

      }
    }
  }
}
