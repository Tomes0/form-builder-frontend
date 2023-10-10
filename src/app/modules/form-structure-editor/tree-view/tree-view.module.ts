import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view.component';
import {MatTreeModule} from "@angular/material/tree";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


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
    MatButtonModule,
    MatIconModule
  ]
})
export class TreeViewModule { }
