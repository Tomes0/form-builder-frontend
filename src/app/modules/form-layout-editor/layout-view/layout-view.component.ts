import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {LayoutService} from "../../../core/services/layout.service";
import {tap} from "rxjs";

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

  nodesInEditor$ = this.layoutService.nodesInEditor$.pipe(
    tap(nodes => console.log(nodes))
  );

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
}
