import {NgModule} from "@angular/core";
import {MainComponent} from "./main.component";
import {FormStructureEditorModule} from "./form-structure-editor/form-structure-editor.module";
import {FormPropertyEditorModule} from "./form-property-editor/form-property-editor.module";
import {FormLayoutEditorModule} from "./form-layout-editor/form-layout-editor.module";
import {LayoutService} from "../core/services/layout.service";
import {StructureService} from "../core/services/structure.service";
import {HttpClientModule} from "@angular/common/http";
import {ApiService} from "../core/api/api.service";
import {HeaderModule} from "./header/header.module";
import {HeaderService} from "../core/services/header.service";
import {StoreModule} from "@ngrx/store";
import {reducers} from "./store/reducers";
import {EffectsModule} from "@ngrx/effects";
import {MainEffects} from "./store/effects/main.effects";
import {PropertyService} from "../core/services/property.service";
import {DialogService} from "../core/services/dialog.service";

@NgModule({
  declarations: [
    MainComponent,
  ],
  imports: [
    HeaderModule,
    FormStructureEditorModule,
    FormPropertyEditorModule,
    FormLayoutEditorModule,
    HttpClientModule,

    StoreModule.forFeature('mainState',reducers),
    EffectsModule.forFeature([MainEffects]),
  ],
  providers: [
    LayoutService,
    HeaderService,
    PropertyService,
    StructureService,
    ApiService,
    DialogService
  ],
  exports: [
    MainComponent
  ]
})
export class MainModule {
}
