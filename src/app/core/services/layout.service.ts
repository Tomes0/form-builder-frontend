import {Injectable} from "@angular/core";
import { BaseNode } from "src/app/shared/classes/formNodes/BaseNode";
import {TreeNode} from "primeng/api";
import {BehaviorSubject} from "rxjs";

@Injectable()
export class LayoutService {

  private _draggedNodeSubject = new BehaviorSubject<TreeNode<BaseNode> | undefined>(undefined);
  draggedNode$ = this._draggedNodeSubject.asObservable();

  private _nodesInEditorSubject = new BehaviorSubject<Set<TreeNode<BaseNode>>>(new Set<TreeNode<BaseNode>>);
  nodesInEditor$ = this._nodesInEditorSubject.asObservable();

  setDraggedNode(node: TreeNode<BaseNode> | undefined){
    this._draggedNodeSubject.next(node);
  }

  addNodeToEditorNodes(){
    const nodesInEditor = this._nodesInEditorSubject.getValue();
    if(this._draggedNodeSubject.getValue() !== undefined){
      nodesInEditor.add(<TreeNode<BaseNode>>this._draggedNodeSubject.getValue())
      this._nodesInEditorSubject.next(nodesInEditor);
    }
  }




}
