import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ConfirmDialogComponent} from "./confirm-dialog.component";

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
  ],
  providers: [],
  exports: [
    ConfirmDialogComponent
  ]
})
export class HeaderModule { }
