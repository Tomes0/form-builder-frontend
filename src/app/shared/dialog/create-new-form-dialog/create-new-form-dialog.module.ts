import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {CreateNewFormDialogComponent} from "./create-new-form-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    CreateNewFormDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    InputTextModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  providers: [],
  exports: [
    CreateNewFormDialogComponent
  ]
})
export class CreateNewFormDialogModule { }
