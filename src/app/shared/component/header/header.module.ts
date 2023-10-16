import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header.component";
import {NgModule} from "@angular/core";
import {MainModule} from "../../../modules/main.module";
import {MenubarModule} from "primeng/menubar";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MainModule,
    MenubarModule
  ],
  providers: [],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
