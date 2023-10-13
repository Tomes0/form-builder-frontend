import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeViewComponent } from './tree-view.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { ButtonModule } from 'primeng/button';
import { TreeModule } from 'primeng/tree';
import { TreeSelectModule } from 'primeng/treeselect';
import {TreeDragDropService} from "primeng/api";
import {ContextMenuModule} from "primeng/contextmenu";
import {FormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {DragDropModule} from "primeng/dragdrop";

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
    MatIconModule,
    ContextMenuModule,
    FormsModule,
    RippleModule,
    DragDropModule
  ],
  providers: [
    TreeDragDropService
  ]
})
export class TreeViewModule { }
