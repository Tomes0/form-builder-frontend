import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import {NodeService} from "../../../core/services/tree-view.service";

@NgModule({
  declarations: [
    TreeViewComponent
  ],
  exports: [
    TreeViewComponent
  ],
  imports: [
    CommonModule,
    TreeModule,
    TreeSelectModule,
    MatButtonModule,
    ButtonModule,
    MatIconModule
  ],
  providers: [
    NodeService
  ]
})
export class TreeViewModule { }
