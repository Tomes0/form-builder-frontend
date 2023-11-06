import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
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

  getFormByCode$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.loadFormByCode),
    switchMap(_action => {
      return this.apiService.getFormByCode(_action.code).pipe(
        map(form => {
          return AppActions.loadFormFromCodeSuccess({form});
        })
      );
    })
  ));

  saveForm$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.saveForm),
    switchMap(action => {
      return this.apiService.saveForm(action.form).pipe(
        map(_response => {
          return AppActions.saveFormSuccess();
        })
      )
    })
  ));

  saveFormSuccess$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.saveFormSuccess),
    map(action => {
      return AppActions.loadFormMinimals();
    })
  ));
}
