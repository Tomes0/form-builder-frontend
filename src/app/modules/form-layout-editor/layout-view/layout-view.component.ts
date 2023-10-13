import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout-view',
  templateUrl: './layout-view.component.html',
  styleUrls: ['./layout-view.component.scss']
})
export class LayoutViewComponent implements OnInit {

  displayModeToggle!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  toggleDisplayMode(changeEvent: {checked: boolean}) {
    console.log(changeEvent.checked)
  }
}
