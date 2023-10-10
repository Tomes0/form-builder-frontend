import { Component, OnInit } from '@angular/core';
import {MedicalFormNode} from "../../../../assets/models/classes/formNodes/MedicalFormNode";
import {MedicalFormGroupNode} from "../../../../assets/models/classes/formNodes/MedicalFormGroupNode";
import {MedicalFormGroupFieldNode} from "../../../../assets/models/classes/formNodes/MedicalFormGroupFieldNode";
import {NodeService} from "../../../core/services/tree-view.service";
import {TreeNode} from "primeng/api";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  files1!: TreeNode[]
  selectedFile!: TreeNode;

  constructor(
    private nodeService: NodeService
  ) { }

  ngOnInit(): void {
    // const root = new MedicalFormNode(null, "Root");
    //
    // const child1 = new MedicalFormGroupNode(root, "Child1");
    //
    // const subChild1 = new MedicalFormGroupFieldNode(child1, "SubChild1");
    // const subChild2 = new MedicalFormGroupFieldNode(child1, "SubChild2");
    //
    // root.traverse("breadthFirst", (node) => {
    //   console.log(node.toString());
    //   console.log(node.calculateDepth());
    // })
    this.nodeService.getFiles().then((files) => (this.files1 = files));

  }


  nodeSelect(event: TreeNode) {
    console.log(event)
  }

  nodeUnselect(event: TreeNode) {
    console.log(event)

  }

}
