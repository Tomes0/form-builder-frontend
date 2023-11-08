import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header.component";
import {NgModule} from "@angular/core";
import {MenubarModule} from "primeng/menubar";
import {FormsModule} from "@angular/forms";
import {TransformFormMinimalsIntoOptionsPipe} from "../../shared/pipes/transform-form-minimals-into-options.pipe";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {ConfirmDialogModule} from "../../shared/dialog/confirm-dialog/confirm-dialog.module";
import {CreateNewFormDialogModule} from "../../shared/dialog/create-new-form-dialog/create-new-form-dialog.module";

@NgModule({
  declarations: [
    HeaderComponent,
    TransformFormMinimalsIntoOptionsPipe
  ],
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    DropdownModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    CreateNewFormDialogModule
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
