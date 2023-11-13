import { Injectable } from "@angular/core";
import {Actions} from "@ngrx/effects";
import {PropertyService} from "../../../core/services/property.service";


@Injectable()
export class MainEffects {

  constructor(
    private action$: Actions,
  ){}
}
