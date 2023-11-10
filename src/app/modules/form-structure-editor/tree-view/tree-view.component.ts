import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MenuItem, TreeNode} from "primeng/api";
import {BaseNode} from 'src/app/shared/classes/formNodes/BaseNode';
import {StructureService} from "../../../core/services/structure.service";
import {GroupNode} from "../../../shared/classes/formNodes/GroupNode";
import {FormNode} from "../../../shared/classes/formNodes/FormNode";
import {FieldNode} from "../../../shared/classes/formNodes/FieldNode";
import {ChoiceNode} from "../../../shared/classes/formNodes/ChoiceNode";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeViewComponent {

  selectedNode!: TreeNode<FormNode | GroupNode | FieldNode | ChoiceNode>;
  dragStart$ = this.structureService.dragStart();
  dragStop$ = this.structureService.hierarchyChange();
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

  onDrop($event: any) {
    if($event['dragNode'] instanceof GroupNode && $event['dropNode'] instanceof FormNode){
      $event.accept();
    }

    if($event['dragNode'] instanceof FieldNode && $event['dropNode'] instanceof GroupNode){
      $event.accept();
    }

    if($event['dragNode'] instanceof ChoiceNode && $event['dropNode'] instanceof FieldNode){
      $event.accept();
    }
  }
}
