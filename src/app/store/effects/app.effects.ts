import {Injectable} from "@angular/core";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {map, of, switchMap} from "rxjs";
import {ApiService} from "../../core/api/api.service";
import {AppActions} from "../actions/actionTypes";
import {DialogService} from "../../core/services/dialog.service";
import {HeaderService} from "../../core/services/header.service";
import {fetchStoreValue} from "../../shared/functions/fetchStoreValue";


// noinspection JSUnusedGlobalSymbols
@Injectable()
export class AppEffects {

  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private dialogService: DialogService,
    private headerService: HeaderService
  ) {
  }

  loadFormMinimals$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.loadFormMinimals),
    switchMap(_action => {
      return this.apiService.getFormMinimals().pipe(
        map(response => {
          return AppActions.loadFormMinimalsSuccess({formMinimals: response});
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
    fetchStoreValue(this.headerService.fetchForm()),
    switchMap(form => {
      return this.apiService.saveForm(form).pipe(
        map(_response => {
          return AppActions.saveFormSuccess();
        })
      )
    })
  ));

  saveFormSuccess$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.saveFormSuccess),
    map(_action => {
      return AppActions.loadFormMinimals();
    })
  ));

  deleteForm$ = createEffect(() => this.action$.pipe(
    ofType(AppActions.deleteForm),
    switchMap(action => {
      return this.dialogService.openDeleteFormDialog().componentInstance.confirm.pipe(
        switchMap(value => {
          if (value) {
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
    map(_action => {
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
