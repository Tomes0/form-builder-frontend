import {AfterViewInit, Component, OnInit} from '@angular/core';
import {MedicalFormNode} from "../../../../assets/models/classes/formNodes/MedicalFormNode";
import {MedicalFormGroupNode} from "../../../../assets/models/classes/formNodes/MedicalFormGroupNode";
import {MedicalFormGroupFieldNode} from "../../../../assets/models/classes/formNodes/MedicalFormGroupFieldNode";
import {MenuItem, TreeNode} from "primeng/api";
import {BaseNode} from "../../../../assets/models/classes/formNodes/BaseNode";
import {root} from "postcss";
@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  nodes!: TreeNode<BaseNode>[]
  selectedFile!: TreeNode<BaseNode>;
  actionList!: MenuItem[]

 root = new MedicalFormNode(undefined, "Root");

  constructor(
  ) { }


  ngOnInit(): void {

    const child1 = new MedicalFormGroupNode(this.root, "Child1");

    new MedicalFormGroupFieldNode(child1, "SubChild1");
    new MedicalFormGroupFieldNode(child1, "SubChild2");
    new MedicalFormGroupFieldNode(child1, "SubChild3");


    const treeNodes: TreeNode<BaseNode>[] = [];

    treeNodes.push(this.root.getAsTreeNode());


    this.nodes = treeNodes;
    this.actionList = [
      {label: 'View', icon: 'pi pi-search', command: (event) => console.log(this.selectedFile, event)},
      {label: 'Add Node', icon: 'pi pi-plus', command: (event) =>  this.addNode(this.selectedFile)},

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

  addNode(selectedNode: TreeNode<BaseNode>){
    const newNode = new MedicalFormGroupFieldNode(selectedNode.data, 'field');
    selectedNode.children?.push(newNode);
  }
}
