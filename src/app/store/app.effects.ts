import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {AppActions} from "./actionTypes";
import {map, of, switchMap} from "rxjs";
import {ApiService} from "../core/api/api.service";
import {DialogService} from "../core/services/dialog.service";


// noinspection JSUnusedGlobalSymbols
@Injectable()
export class AppEffects {

  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private dialogService: DialogService
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

  deleteForm$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.deleteForm),
    switchMap(action => {
      return this.dialogService.openDeleteFormDialog().componentInstance.confirm.pipe(
        switchMap(value => {
          if(value){
            return this.apiService.deleteForm(action.formCode).pipe(
              map(response => {
                return AppActions.deleteFormSuccess();
              })
            );
          } else {
            return of(AppActions.deleteFormCancel());
          }
        })
      )
    })
  ));

  deleteFormSuccess$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.deleteFormSuccess),
    map(action => {
      return AppActions.loadFormMinimals();
    })
  ));

  createNewForm$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.createNewForm),
    switchMap(_action => {
      return this.dialogService.openCreateNewFormDialog().componentInstance.newFormName.pipe(
        switchMap(newName => {
          return this.apiService.createNewForm(newName).pipe(
            map(form => {
              return AppActions.createNewFormSuccess({form})
            })
          )
        })
      )
    })
  ))

}
