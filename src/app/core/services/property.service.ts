import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {MainActions} from "../../modules/store/actions/actionTypes";
import {MainSelectors} from "../../modules/store/selectors";
import {Form} from "../../shared/interfaces/Form";
import {Node} from "../../shared/interfaces/Node";


@Injectable()
export class PropertyService {

  constructor(
    private store: Store
  ) {}

  commitForm(form: Form){
    this.store.dispatch(MainActions.commitFormProperty({form}));
  }

  fetchForm(){
    return this.store.select(MainSelectors.fetchForm);
  }

  getSelectedNode() {
    return this.store.select(MainSelectors.selectedNode)
  }

  commitPropertyChanges(propertyUpdate: Node) {
    this.store.dispatch(MainActions.commitPropertyChanges({propertyUpdate}));
  }
}
