import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {FormStructureEditorModule} from "./form-structure-editor/form-structure-editor.module";
import {FormPropertyEditorModule} from "./form-property-editor/form-property-editor.module";
import {FormLayoutEditorModule} from "./form-layout-editor/form-layout-editor.module";
import {NgClass} from "@angular/common";
import {DragDropModule} from "primeng/dragdrop";
import {LayoutService} from "../core/services/layout.service";
import {NodeService} from "../core/services/node.service";

@NgModule({
    declarations: [
      MainComponent,
    ],
  imports: [
    FormStructureEditorModule,
    FormPropertyEditorModule,
    FormLayoutEditorModule,
    NgClass,
  ],
    providers: [
      LayoutService,
      NodeService
    ],
    exports: [
        MainComponent
    ]
})
export class MainModule { }
