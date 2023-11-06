import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ConfirmDialogComponent} from "./confirm-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";

@NgModule({
  declarations: [
    ConfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    ButtonModule,
    RippleModule
  ],
  providers: [],
  exports: [
    ConfirmDialogComponent
  ]
})
export class ConfirmDialogModule { }
