import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {FormStructureEditorModule} from "./form-structure-editor/form-structure-editor.module";
import {FormPropertyEditorModule} from "./form-property-editor/form-property-editor.module";
import {FormLayoutEditorModule} from "./form-layout-editor/form-layout-editor.module";
import {LayoutService} from "../core/services/layout.service";
import {NodeService} from "../core/services/node.service";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "../core/api/api.service";
import {HeaderModule} from "./header/header.module";
import {FormsService} from "../core/services/forms.service";

@NgModule({
    declarations: [
      MainComponent,
    ],
  imports: [
    HeaderModule,
    FormStructureEditorModule,
    FormPropertyEditorModule,
    FormLayoutEditorModule,
    HttpClientModule
  ],
    providers: [
      LayoutService,
      NodeService,
      FormsService,
      ApiService
    ],
    exports: [
        MainComponent
    ]
})
export class MainModule { }
