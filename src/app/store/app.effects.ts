import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AppActions} from "./actionTypes";
import {map, switchMap} from "rxjs";
import {ApiService} from "../core/api/api.service";


@Injectable()
export class AppEffects {

  constructor(
    private action$: Actions,
    private apiService: ApiService
  ){}

  loadFormMinimals$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.loadFormMinimals),
    switchMap(_action => {
      return this.apiService.getFormMinimals().pipe(
        map(response => {
          return AppActions.loadFormMinimalsSuccess({form: response});
        })
      );
    })
  ));

  loadFormFromCode = createEffect(() => this.action$.pipe(
    ofType(AppActions.loadFormFromCode),
    switchMap(_action => {
      return this.apiService.getFormFromCode(_action.code).pipe(
        map(form => {
          return AppActions.loadFormFromCodeSuccess({form});
        })
      );
    })
  ));


}
