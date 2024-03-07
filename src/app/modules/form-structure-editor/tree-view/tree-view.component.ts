import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {StructureService} from "../../../core/services/structure.service";
import {Node} from '../../../shared/interfaces/Node'
import {TreeNode} from "../../../shared/interfaces/TreeNode";
import {NodeType} from "../../../shared/enums/NodeType";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewComponent {

  selectedNode!: TreeNode<Node>;
  form$ = this.structureService.fetchFormAsNode();

  actionList: MenuItem[] = [
    // @ts-ignore
    {label: 'Add Node', icon: 'pi pi-plus', command: (_event) => this.structureService.addNode(this.selectedNode) },
    // @ts-ignore
    {label: 'Remove Node', icon: 'pi pi-minus', command: (_event) => this.structureService.removeNode(this.selectedNode)},
    {label: 'Inspect (console.log)', icon: 'pi pi-search', command: (_event) => console.log(this.selectedNode)},
  ]

  constructor(
    public structureService: StructureService,
  ) {}

  onDrop($event: {dragNode: TreeNode<Node>, dropNode: TreeNode<Node>, accept: Function}) {
    if($event.dragNode.data?.type === NodeType.GROUP && $event.dropNode.data?.type === NodeType.FORM){
     $event.accept();
    }
    if($event.dragNode.data?.type === NodeType.FIELD && $event.dropNode.data?.type === NodeType.GROUP){
     $event.accept();
    }
    if($event.dragNode.data?.type === NodeType.CHOICE && $event.dropNode.data?.type === NodeType.FIELD){
     $event.accept();
    }
  }
}
