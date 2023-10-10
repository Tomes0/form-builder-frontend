import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    TreeViewComponent
  ],
  exports: [
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    MatTreeModule,
    MatButtonModule
  ]
})
export class TreeViewModule { }
