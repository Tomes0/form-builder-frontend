import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header.component";
import {NgModule} from "@angular/core";
import {MenubarModule} from "primeng/menubar";
import {FormsModule} from "@angular/forms";
import {TransformIntoOptionsPipe} from "../../shared/pipes/transform-into-options.pipe";
import {DropdownModule} from "primeng/dropdown";

@NgModule({
  declarations: [
    HeaderComponent,
    TransformIntoOptionsPipe
  ],
  imports: [
    CommonModule,
    MenubarModule,
    FormsModule,
    DropdownModule
  ],
  providers: [],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
