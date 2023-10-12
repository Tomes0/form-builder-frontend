import { Component, OnInit } from '@angular/core';
import {TreeViewService} from "../../../core/services/tree-view.service";

@Component({
  selector: 'app-property-view',
  templateUrl: './property-view.component.html',
  styleUrls: ['./property-view.component.scss']
})
export class PropertyViewComponent implements OnInit {

  node$ = this.treeViewService.getSelectedNode();

  constructor(
    private treeViewService: TreeViewService
  ) { }

  ngOnInit(): void {
  }
}
