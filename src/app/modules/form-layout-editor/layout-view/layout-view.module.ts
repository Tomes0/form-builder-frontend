import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutViewComponent} from "./layout-view.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {SelectButtonModule} from "primeng/selectbutton";

@NgModule({
  declarations: [
    LayoutViewComponent,
  ],
  imports: [
    CommonModule,
    InputSwitchModule,
    FormsModule,
    SelectButtonModule,
  ],
  exports: [
    LayoutViewComponent
  ]
})
export class LayoutViewModule { }
