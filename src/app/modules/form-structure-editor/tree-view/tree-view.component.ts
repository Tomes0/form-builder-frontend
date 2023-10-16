import {Component, HostListener, OnInit} from '@angular/core';
import {MenuItem, TreeNode, TreeNodeDragEvent} from "primeng/api";
import { BaseNode } from 'src/app/shared/classes/formNodes/BaseNode';
import {NodeService} from "../../../core/services/node.service";
import {getViewHeight} from "../../../shared/functions/getViewHeight";
import {TreeDragDropService} from "primeng/api";
import {tap, combineLatest, delay, BehaviorSubject, Subject, concat} from "rxjs";
import * as _ from "lodash";
import {HierarchyChange} from "../../../shared/interfaces/HierarchyChange";




@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  hierarchyChange!: HierarchyChange<BaseNode>;

  selectedNode!: TreeNode<BaseNode>;
  roots$ = this.nodeService.rootNodes$
  start$ = this.treeDragDropService.dragStart$.pipe(
    tap(event => {

      this.hierarchyChange = {
        target: event.node,
        start: event?.node?.parent
      }
    })
  ).subscribe();


  stop$ = this.treeDragDropService.dragStop$.pipe(
    delay(10),
    tap(event => {
      this.hierarchyChange = {
        ...this.hierarchyChange,
        end: event?.node?.parent
      }
      this.nodeService.updateNodeHierarchy(this.hierarchyChange);
    })
  ).subscribe();

  hierarcyChange$ = concat(this.treeDragDropService.dragStart$, this.treeDragDropService.dragStop$).pipe()

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
