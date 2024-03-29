import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LayoutService} from "../../../core/services/layout.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LayoutViewComponent {

  modeSelect = 'view';
  stateOptions: any[] = [
    { label: 'View', value: 'view' },
    { label: 'Edit', value: 'edit' },
  ];


  constructor(
    public layoutService: LayoutService
  ) { }


  displayModeChange(changeEvent: string) {
    console.log(changeEvent)
  }

  // determineNodeType(node: BaseNode | undefined): string {
  //   if (node instanceof FormNode) {
  //     return 'formNode';
  //   } else if (node instanceof GroupNode) {
  //     return 'groupNode';
  //   }
  //   // Add more checks for other child classes as needed
  //   return 'default';
  // }
}
