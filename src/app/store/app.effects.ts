import { Injectable } from "@angular/core";
import {act, Actions, createEffect, ofType} from "@ngrx/effects";
import {AppActions} from "./actionTypes";
import {map, switchMap} from "rxjs";
import {ApiService} from "../core/api/api.service";


// noinspection JSUnusedGlobalSymbols
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

  loadFormFromCode$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.loadFormFromCode),
    switchMap(_action => {
      return this.apiService.getFormByCode(_action.code).pipe(
        map(form => {
          return AppActions.loadFormFromCodeSuccess({form});
        })
      );
    })
  ));

  saveFormByCode$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.saveFormByCode),
    switchMap(action => {
      console.log(action.form);

      return this.apiService.saveFormByCode(action.form).pipe(
        map(response => {
          return AppActions.saveFormByCodeSuccess();
        })
      )
    })
  ));


}
