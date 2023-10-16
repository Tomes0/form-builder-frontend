import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.scss']
})
export class LayoutViewComponent implements OnInit {

  modeSelect = 'view';
  stateOptions: any[] = [
    { label: 'View', value: 'view' },
    { label: 'Edit', value: 'edit' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  displayModeChange(changeEvent: string) {
    console.log(changeEvent)
  }
}
