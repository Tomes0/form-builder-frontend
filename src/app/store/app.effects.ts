import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {createEffects} from "@ngrx/effects/src/effects_module";
import {AppActions} from "./actionTypes";
import {map, switchMap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {FormMinimal} from "../shared/interfaces/FormMinimal";


@Injectable()
export class AppEffects {

  constructor(
    private action$: Actions,
    private http: HttpClient
  ){}

  loadFormMinimals$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.loadFormMinimals),
    switchMap(action => {
      return this.http.get<FormMinimal[]>('assests/testFiles/files.json').pipe(
        map(response => {
          return AppActions.loadFormMinimalsSuccess({form: response});
        })
      )
    })
  ))


}
