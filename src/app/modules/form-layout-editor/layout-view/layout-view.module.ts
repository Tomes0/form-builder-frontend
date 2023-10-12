import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutViewComponent} from "./layout-view.component";

@NgModule({
  declarations: [
    LayoutViewComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    LayoutViewComponent
  ]
})
export class LayoutViewModule { }
