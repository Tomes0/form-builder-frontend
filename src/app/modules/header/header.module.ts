import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header.component";
import {NgModule} from "@angular/core";
import {MenubarModule} from "primeng/menubar";
import {FormsModule} from "@angular/forms";
import {TransformFormMinimalsIntoOptionsPipe} from "../../shared/pipes/transform-form-minimals-into-options.pipe";
import {DropdownModule} from "primeng/dropdown";
import {ButtonModule} from "primeng/button";

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
    ButtonModule
  ],
  providers: [],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
