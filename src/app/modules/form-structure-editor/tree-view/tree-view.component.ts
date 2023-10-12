import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MedicalFormNode} from "../../../../assets/models/classes/formNodes/MedicalFormNode";
import {MedicalFormGroupNode} from "../../../../assets/models/classes/formNodes/MedicalFormGroupNode";
import {MedicalFormGroupFieldNode} from "../../../../assets/models/classes/formNodes/MedicalFormGroupFieldNode";
import {MenuItem, TreeNode} from "primeng/api";
import {BaseNode} from "../../../../assets/models/classes/formNodes/BaseNode";
import {root} from "postcss";
import {TreeViewService} from "../../../core/services/tree-view.service";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  nodes!: TreeNode<BaseNode>[]
  treeNode!: TreeNode<BaseNode>;


  actionList: MenuItem[] = [
    {label: 'Add Node', icon: 'pi pi-plus', command: (event) => this.addNode(this.treeNode)},
    {label: 'Remove Node', icon: 'pi pi-minus', command: (event) => this.removeNode(this.treeNode)},
  ]

  root = new MedicalFormNode("Root");

  constructor(
    private treeViewService: TreeViewService
  ) {
  }


  ngOnInit(): void {

    const child1 = new MedicalFormGroupNode(this.root, "Child1");

    new MedicalFormGroupFieldNode(child1, "SubChild1");
    new MedicalFormGroupFieldNode(child1, "SubChild2");
    new MedicalFormGroupFieldNode(child1, "SubChild3");

    const treeNodes: TreeNode<BaseNode>[] = [];

    treeNodes.push(this.root.getAsTreeNode());

    this.nodes = treeNodes;
  }


  nodeSelect(event: { node: TreeNode<BaseNode> }) {
    if(event.node.data){
      this.treeViewService.selectNode(event.node.data.getMinimal());
    }
  }

  nodeExpand(event: any) {
    const iconSpan = document.getElementsByClassName('p-tree-toggler-icon pi pi-fw pi-chevron-right');
  }

  addNode(selectedNode: TreeNode<BaseNode>) {
    const newNode = new MedicalFormGroupFieldNode(selectedNode.data, 'field');
    selectedNode.children?.push(newNode.getAsTreeNode());
    selectedNode.expanded = true;

  }

  removeNode(selectedNode: TreeNode<BaseNode>) {
    selectedNode.data?.removeNode();

    if (selectedNode.parent) {
      selectedNode.parent.children = selectedNode.parent.data?.getChildrenAsNodes();
    } else {
      this.nodes.splice(this.nodes.indexOf(selectedNode), 1);
    }
  }

  addNewRootElement() {
    this.nodes.push(new MedicalFormNode("Root"))
  }
}
