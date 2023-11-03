import {Injectable} from "@angular/core";
import {Selectors} from "../../store/selectors";
import {Store} from "@ngrx/store";
import {AppActions} from "../../store/actionTypes";

@Injectable()
export class FormsService {

  constructor(
    private store: Store
  ) {}

  loadFormMinimals(){
    this.store.dispatch(AppActions.loadFormMinimals());
  }

  getFormMinimals(){
    return this.store.select(Selectors.AppSelectors.formMinimals);
  }

}
