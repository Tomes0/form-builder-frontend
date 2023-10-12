import {NgModule} from "@angular/core";
import {TreeViewModule} from "./form-structure-editor/tree-view/tree-view.module";
import {MainComponent} from "./main.component";
import {FormStructureEditorModule} from "./form-structure-editor/form-structure-editor.module";
import {FormPropertyEditorModule} from "./form-property-editor/form-property-editor.module";

@NgModule({
    declarations: [
        MainComponent
    ],
  imports: [
    FormStructureEditorModule,
    FormPropertyEditorModule
  ],
    providers: [],
    exports: [
        MainComponent
    ]
})
export class MainModule { }
