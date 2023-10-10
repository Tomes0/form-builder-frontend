import {NgModule} from "@angular/core";
import {TreeViewModule} from "./form-structure-editor/tree-view/tree-view.module";
import {MainComponent} from "./main.component";
import {FormStructureEditorModule} from "./form-structure-editor/form-structure-editor.module";

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        FormStructureEditorModule
    ],
    providers: [],
    exports: [
        MainComponent
    ]
})
export class MainModule { }
