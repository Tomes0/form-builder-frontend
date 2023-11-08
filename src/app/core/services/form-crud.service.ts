import {Injectable} from "@angular/core";
import {AppSelectors} from "../../store/selectors";
import {Store} from "@ngrx/store";
import {switchMap} from "rxjs";
import {StructureService} from "./structure.service";
import {classToInterface} from "../../shared/functions/classToInterface";
import {FormNode} from "../../shared/classes/formNodes/FormNode";
import {AppActions} from "../../store/actions/actionTypes";

@Injectable()
export class FormCrudService {

  constructor(
    private store: Store,
    private nodeService: StructureService,
  ) {}

  loadFormMinimals(){
    this.store.dispatch(AppActions.loadFormMinimals());
  }

  getFormMinimals(){
    return this.store.select(AppSelectors.formMinimals);
  }

  getFormByCode(code: string) {
    this.store.dispatch(AppActions.loadFormByCode({code}));
  }

  saveForm() {
    const form = classToInterface(<FormNode>this.nodeService._rootNodeSubject.getValue().data);
    this.store.dispatch(AppActions.saveForm({form}));
  }

  deleteForm(form: { name: string; code: string }) {
    this.store.dispatch(AppActions.deleteForm({formCode: form.code}));
  }

  createNewForm() {
    this.store.dispatch(AppActions.createNewForm());
  }
}
