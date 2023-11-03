import {Injectable} from "@angular/core";
import {Selectors} from "../../store/selectors";
import {Store} from "@ngrx/store";
import {AppActions} from "../../store/actionTypes";
import {map, switchMap} from "rxjs";
import {interfaceToClass} from "../../shared/functions/interfaceToClass";
import {NodeService} from "./node.service";

@Injectable()
export class FormService {

  constructor(
    private store: Store,
    private nodeService: NodeService
  ) {}

  loadFormMinimals(){
    this.store.dispatch(AppActions.loadFormMinimals());
  }

  getFormMinimals(){
    return this.store.select(Selectors.AppSelectors.formMinimals);
  }

  getFormFromCode(code: string) {
    this.store.dispatch(AppActions.loadFormFromCode({code}));
  }

  loadFormFromCode(){
    return this.store.select(Selectors.AppSelectors.form).pipe(
      switchMap(form => this.nodeService.initRootNode(form))
    );
  }
}
