import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PropertyViewComponent} from "./property-view.component";

@NgModule({
  declarations: [
    PropertyViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PropertyViewComponent
  ]
})
export class PropertyViewModule { }
