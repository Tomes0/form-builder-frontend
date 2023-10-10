import {NgModule} from "@angular/core";
import {TreeViewModule} from "./tree-view/tree-view.module";
import {MainComponent} from "./main.component";

@NgModule({
    declarations: [
        MainComponent
    ],
    imports: [
        TreeViewModule
    ],
    providers: [],
    exports: [
        MainComponent
    ]
})
export class MainModule { }
