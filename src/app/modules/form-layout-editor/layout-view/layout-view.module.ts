import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutViewComponent} from "./layout-view.component";
import {InputSwitchModule} from "primeng/inputswitch";
import {FormsModule} from "@angular/forms";
import {SelectButtonModule} from "primeng/selectbutton";
import {DragDropModule} from "primeng/dragdrop";
import {PanelModule} from "primeng/panel";
import { FormComponent } from './form/form.component';

@NgModule({
  declarations: [
    LayoutViewComponent,
    FormComponent,
  ],
  imports: [
    CommonModule,
    InputSwitchModule,
    FormsModule,
    SelectButtonModule,
    PanelModule,
    DragDropModule,
  ],
  exports: [
    LayoutViewComponent
  ]
})
export class LayoutViewModule { }
