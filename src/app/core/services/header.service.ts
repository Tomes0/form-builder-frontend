import {Injectable} from "@angular/core";
import {AppSelectors} from "../../store/selectors";
import {Store} from "@ngrx/store";
import {AppActions} from "../../store/actions/actionTypes";
import {MainSelectors} from "../../modules/store/selectors";

@Injectable()
export class HeaderService {

  constructor(
    private store: Store,
  ) {}

  fetchForm(){
    return this.store.select(MainSelectors.fetchForm);
  }

  loadFormMinimals(){
    this.store.dispatch(AppActions.loadFormMinimals());
  }

  getFormMinimals(){
    return this.store.select(AppSelectors.formMinimals);
  }

  getFormByCode(code: string) {
    this.store.dispatch(AppActions.loadFormByCode({code}));
  }

  deleteForm(form: { name: string; code: string }) {
    this.store.dispatch(AppActions.deleteForm({formCode: form.code}));
  }

  createNewForm() {
    this.store.dispatch(AppActions.createNewForm());
  }

  saveForm() {
    this.store.dispatch(AppActions.saveForm());
  }
}
