import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {PropertyViewComponent} from "./property-view.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {MatButtonModule} from "@angular/material/button";
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {DropdownModule} from "primeng/dropdown";

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
    ButtonModule,
    DropdownModule,
    FormsModule
  ],
  exports: [
    PropertyViewComponent
  ]
})
export class PropertyViewModule { }
