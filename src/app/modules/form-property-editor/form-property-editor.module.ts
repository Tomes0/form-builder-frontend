import {NgModule} from "@angular/core";
import {FormPropertyEditorComponent} from "./form-property-editor.component";
import {CommonModule} from "@angular/common";
import {PropertyViewModule} from "./propery-view/property-view.module";

@NgModule({
  declarations: [
    FormPropertyEditorComponent,
  ],
  imports: [
    CommonModule,
    PropertyViewModule
  ],
  exports: [
    FormPropertyEditorComponent
  ]
})
export class FormStructureEditorModule { }
