import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";
import {BaseNode} from "../../../../assets/models/classes/formNodes/BaseNode";
import {NodeService} from "../../../core/services/node.service";
import {getViewHeight} from "../../../shared/function/getViewHeight";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  roots$ = this.nodeService.rootNodes$
  selectedNode!: TreeNode<BaseNode>;

  scrollHeight = getViewHeight() - 80;

  actionList: MenuItem[] = [
    {label: 'Add Node', icon: 'pi pi-plus', command: (event) => this.nodeService.addNode(this.selectedNode)},
    {label: 'Remove Node', icon: 'pi pi-minus', command: (event) => this.nodeService.removeNode(this.selectedNode)},
    {label: 'Inspect', icon: 'pi pi-search', command: (event) => console.log(this.selectedNode)},
  ]

  constructor(
    public nodeService: NodeService
  ) {
  }


  ngOnInit(): void {
  }
}
