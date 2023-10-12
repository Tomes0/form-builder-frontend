import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {LayoutViewModule} from "./layout-view/layout-view.module";
import {FormLayoutEditorComponent} from "./form-layout-editor.component";

@NgModule({
  declarations: [
    FormLayoutEditorComponent,
  ],
  imports: [
    CommonModule,
    LayoutViewModule
  ],
  exports: [
    FormLayoutEditorComponent
  ]
})
export class FormLayoutEditorModule { }
