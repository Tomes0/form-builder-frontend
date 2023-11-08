import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, of, switchMap} from "rxjs";


@Injectable()
export class MainEffects {

  constructor(
    private action$: Actions,
  ){}

}
