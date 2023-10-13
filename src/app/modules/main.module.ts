import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {FormStructureEditorModule} from "./form-structure-editor/form-structure-editor.module";
import {FormPropertyEditorModule} from "./form-property-editor/form-property-editor.module";
import {FormLayoutEditorModule} from "./form-layout-editor/form-layout-editor.module";
import {NgClass} from "@angular/common";

@NgModule({
    declarations: [
        MainComponent,
    ],
  imports: [
    FormStructureEditorModule,
    FormPropertyEditorModule,
    FormLayoutEditorModule,
    NgClass
  ],
    providers: [],
    exports: [
        MainComponent
    ]
})
export class MainModule { }
