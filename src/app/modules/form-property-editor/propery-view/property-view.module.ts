import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PropertyViewComponent} from "./property-view.component";
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MatButtonModule} from "@angular/material/button";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    PropertyViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    MatButtonModule,
    RippleModule,
    ButtonModule
  ],
  exports: [
    PropertyViewComponent
  ]
})
export class PropertyViewModule { }
