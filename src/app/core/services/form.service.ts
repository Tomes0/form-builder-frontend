import {Injectable} from "@angular/core";
import {Selectors} from "../../store/selectors";
import {Store} from "@ngrx/store";
import {AppActions} from "../../store/actionTypes";
import {switchMap} from "rxjs";
import {NodeService} from "./node.service";
import {classToInterface} from "../../shared/functions/classToInterface";
import {BaseNode} from "../../shared/classes/formNodes/BaseNode";
import {FormNode} from "../../shared/classes/formNodes/FormNode";
import {MatDialog} from "@angular/material/dialog";

@Injectable()
export class FormService {

  constructor(
    private store: Store,
    private nodeService: NodeService,
  ) {}

  loadFormMinimals(){
    this.store.dispatch(AppActions.loadFormMinimals());
  }

  getFormMinimals(){
    return this.store.select(Selectors.AppSelectors.formMinimals);
  }

  getFormByCode(code: string) {
    this.store.dispatch(AppActions.loadFormByCode({code}));
  }

  loadFormByCode(){
    return this.store.select(Selectors.AppSelectors.form).pipe(
      switchMap(form => {
        return this.nodeService.initRootNode(form)
      })
    );
  }

  saveForm() {
    const form = classToInterface(<FormNode | BaseNode>this.nodeService._rootNodeSubject.getValue().data);
    this.store.dispatch(AppActions.saveForm({form}));
  }

  deleteForm(form: { name: string; code: string }) {
    this.store.dispatch(AppActions.deleteForm({formCode: form.code}));
  }

  createNewForm() {
    this.store.dispatch(AppActions.createNewForm());
  }
}
