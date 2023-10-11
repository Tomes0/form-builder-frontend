import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MedicalFormNode} from "../../../../assets/models/classes/formNodes/MedicalFormNode";
import {MedicalFormGroupNode} from "../../../../assets/models/classes/formNodes/MedicalFormGroupNode";
import {MedicalFormGroupFieldNode} from "../../../../assets/models/classes/formNodes/MedicalFormGroupFieldNode";
import {MenuItem, TreeNode} from "primeng/api";
import {BaseNode} from "../../../../assets/models/classes/formNodes/BaseNode";
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  nodes!: TreeNode[]
  selectedFile!: TreeNode;
  actionList!: MenuItem[]

  scrollHeight = document.body.offsetHeight;

  constructor(
  ) { }


  ngOnInit(): void {
    const root = new MedicalFormNode(undefined, "Root");

    const child1 = new MedicalFormGroupNode(root, "Child1");

    new MedicalFormGroupFieldNode(child1, "SubChild1");
    new MedicalFormGroupFieldNode(child1, "SubChild2");
    new MedicalFormGroupFieldNode(child1, "SubChild3");


    const treeNodes: TreeNode<BaseNode>[] = [];

    treeNodes.push(root.getAsTreeNode());


    this.nodes = treeNodes;
    this.actionList = [
      {label: 'View', icon: 'pi pi-search', command: (event) => console.log(this.selectedFile, event)},
    ]

    //this.nodeService.getFiles().then((files) => (this.files1 = treeNodes));
  }


  nodeSelect(event: { node: any; }) {
    // console.log(event.node)
  }

  nodeUnselect(event: { node: any; }) {
    // console.log(event.node)
  }

  nodeExpand(event: any) {
    const iconSpan = document.getElementsByClassName('p-tree-toggler-icon pi pi-fw pi-chevron-right');
  }
}
