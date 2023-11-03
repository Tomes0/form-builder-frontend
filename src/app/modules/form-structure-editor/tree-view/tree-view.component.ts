import {Component, OnInit} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";
import { BaseNode } from 'src/app/shared/classes/formNodes/BaseNode';
import {NodeService} from "../../../core/services/node.service";
import {LayoutService} from "../../../core/services/layout.service";
import {FormService} from "../../../core/services/form.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  selectedNode!: TreeNode<BaseNode>;
  dragStart$ = this.nodeService.dragStart();
  dragStop$ = this.nodeService.hierarchyChange();
  selectedForm$ = this.formService.loadFormFromCode().pipe(
    tap(a => console.log(a))
  );

  actionList: MenuItem[] = [
    {label: 'Add Node', icon: 'pi pi-plus', command: (_event) => this.nodeService.addNode(this.selectedNode) },
    {label: 'Remove Node', icon: 'pi pi-minus', command: (_event) => this.nodeService.removeNode(this.selectedNode)},
    {label: 'Inspect', icon: 'pi pi-search', command: (_event) => console.log(this.selectedNode)},
  ]

  constructor(
    public nodeService: NodeService,
    private layoutService: LayoutService,
    private formService: FormService
  ) {}

  ngOnInit(): void {}

  endDrag() {
    this.layoutService.setDraggedNode(undefined);
  }

}
