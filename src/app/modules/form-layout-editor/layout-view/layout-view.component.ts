import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LayoutService} from "../../../core/services/layout.service";
import {tap} from "rxjs";
import {BaseNode} from "../../../shared/classes/formNodes/BaseNode";
import {FormNode} from "../../../shared/classes/formNodes/FormNode";
import {GroupNode} from "../../../shared/classes/formNodes/GroupNode";

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutViewComponent implements OnInit {

  modeSelect = 'view';
  stateOptions: any[] = [
    { label: 'View', value: 'view' },
    { label: 'Edit', value: 'edit' },
  ];

  nodesInEditor$ = this.layoutService.nodesInEditor$;

  constructor(
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {}

  displayModeChange(changeEvent: string) {
    console.log(changeEvent)
  }

  drop() {
    this.layoutService.addNodeToEditorNodes();
  }

  determineNodeType(node: BaseNode | undefined): string {
    if (node instanceof FormNode) {
      return 'formNode';
    } else if (node instanceof GroupNode) {
      return 'groupNode';
    }
    // Add more checks for other child classes as needed
    return 'default';
  }
}
