import {NgModule} from "@angular/core";
import {TreeViewModule} from "./tree-view/tree-view.module";
import {FormStructureEditorComponent} from "./form-structure-editor.component";

@NgModule({
    declarations: [
        FormStructureEditorComponent
    ],
    imports: [
        TreeViewModule
    ],
    exports: [
        FormStructureEditorComponent
    ]
})
export class FormStructureEditorModule { }
