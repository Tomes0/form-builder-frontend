import {Injectable} from "@angular/core";
import {TreeNode} from "primeng/api";
import {BehaviorSubject} from "rxjs";
import {Store} from "@ngrx/store";
import {MainActions} from "../../modules/store/actions/actionTypes";
import {MainSelectors} from "../../modules/store/selectors";
import {Form} from "../../shared/interfaces/Form";
import {Node} from "../../shared/interfaces/Node"

@Injectable()
export class LayoutService {

  private _draggedNodeSubject = new BehaviorSubject<TreeNode<Node> | undefined>(undefined);
  draggedNode$ = this._draggedNodeSubject.asObservable();

  private _nodesInEditorSubject = new BehaviorSubject<Set<TreeNode<Node>>>(new Set<TreeNode<Node>>);
  nodesInEditor$ = this._nodesInEditorSubject.asObservable();

  constructor(
    private store: Store
  ) {}


  setDraggedNode(node: TreeNode<Node> | undefined){
    this._draggedNodeSubject.next(node);
  }

  addNodeToEditorNodes(){
    const nodesInEditor = this._nodesInEditorSubject.getValue();
    if(this._draggedNodeSubject.getValue() !== undefined){
      nodesInEditor.add(<TreeNode<Node>>this._draggedNodeSubject.getValue())
      this._nodesInEditorSubject.next(nodesInEditor);
    }
  }


  fetchForm(){
    return this.store.select(MainSelectors.fetchForm);
  }

  commitForm(form: Form) {
    this.store.dispatch(MainActions.commitFormLayout({form}))
  }




}
