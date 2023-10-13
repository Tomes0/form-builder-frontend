import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem, TreeNode, TreeNodeDragEvent} from "primeng/api";
import { BaseNode } from 'src/app/shared/classes/formNodes/BaseNode';
import {NodeService} from "../../../core/services/node.service";
import {getViewHeight} from "../../../shared/functions/getViewHeight";
import {TreeDragDropService} from "primeng/api";
import {tap} from "rxjs";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  roots$ = this.nodeService.rootNodes$
  selectedNode!: TreeNode<BaseNode>;

  dragStart$ = this.treeDragDropService.dragStart$.pipe(
    tap(event => {
      console.log(event.node?.label);
      console.log()

      console.log(event.tree.parentNode.label)
      // console.log(event.tree.parentNode);
      const grabbedNode = {...event.node} as TreeNode<BaseNode>;

    })
  ).subscribe();

  dragStop$ = this.treeDragDropService.dragStop$.pipe(
    tap(event => {

      console.log(event.node?.parent?.label);
      console.log(event.node);


      // console.log(event.node?.parent)
      const grabbedNode = {...event.node} as TreeNode<BaseNode>;

    })
  ).subscribe();


  scrollHeight = getViewHeight() - 80;

  actionList: MenuItem[] = [
    {label: 'Add Node', icon: 'pi pi-plus', command: (event) => this.nodeService.addNode(this.selectedNode)},
    {label: 'Remove Node', icon: 'pi pi-minus', command: (event) => this.nodeService.removeNode(this.selectedNode)},
    {label: 'Inspect', icon: 'pi pi-search', command: (event) => console.log(this.selectedNode)},
  ]

  constructor(
    public nodeService: NodeService,
    private treeDragDropService: TreeDragDropService
  ) {
  }


  ngOnInit(): void {
  }

  onDragStart($event: any, node: any) {
    console.log($event, node);
  }

  onDrop($event: any, node: any) {
    console.log($event, node);
  }

  onDrag($event: any, node: any) {
    console.log($event, node);
  }
}
