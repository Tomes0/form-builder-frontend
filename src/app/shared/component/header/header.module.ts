import {CommonModule} from "@angular/common";
import {HeaderComponent} from "./header.component";
import {NgModule} from "@angular/core";
import {MainModule} from "../../../modules/main.module";

@NgModule({
  declarations: [
    HeaderComponent
  ],
  imports: [
    CommonModule,
    MainModule
  ],
  providers: [],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
