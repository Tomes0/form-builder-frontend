import {Component} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";
import { BaseNode } from 'src/app/shared/classes/formNodes/BaseNode';
import {StructureService} from "../../../core/services/structure.service";
import {LayoutService} from "../../../core/services/layout.service";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent {

  selectedNode!: TreeNode<BaseNode>;
  dragStart$ = this.structureService.dragStart();
  dragStop$ = this.structureService.hierarchyChange();
  form$ = this.structureService.loadFormByCode();

  actionList: MenuItem[] = [
    {label: 'Add Node', icon: 'pi pi-plus', command: (_event) => this.structureService.addNode(this.selectedNode) },
    {label: 'Remove Node', icon: 'pi pi-minus', command: (_event) => this.structureService.removeNode(this.selectedNode)},
    {label: 'Inspect (console.log)', icon: 'pi pi-search', command: (_event) => console.log(this.selectedNode)},
  ]

  constructor(
    public structureService: StructureService,
    private layoutService: LayoutService,
  ) {}

  endDrag() {
    this.layoutService.setDraggedNode(undefined);
  }

  saveForm() {
    //this.formService.saveForm();
  }
}
