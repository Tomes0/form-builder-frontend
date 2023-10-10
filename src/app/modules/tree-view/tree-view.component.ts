import { Component, OnInit } from '@angular/core';
import {MedicalFormNode} from "../../../assets/models/classes/MedicalFormNode";
import {MedicalFormGroupNode} from "../../../assets/models/classes/MedicalFormGroupNode";
import {MedicalFormGroupFieldNode} from "../../../assets/models/classes/MedicalFormGroupFieldNode";

@Component({
  selector: 'app-tree-view',
  templateUrl: './tree-view.component.html',
  styleUrls: ['./tree-view.component.scss']
})
export class TreeViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const root = new MedicalFormNode(null, "Root");

    const child1 = new MedicalFormGroupNode(root, "Child1");

    const subChild1 = new MedicalFormGroupFieldNode(child1, "SubChild1");
    const subChild2 = new MedicalFormGroupFieldNode(child1, "SubChild2");

    root.traverse("breadthFirst", (node) => {
      console.log(node.toString());
    })

  }

}
