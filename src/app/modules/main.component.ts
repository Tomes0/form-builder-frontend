import {Component} from '@angular/core';
import {HeaderService} from "../core/services/header.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
  styleUrls: ['/main.component.scss']
})
export class MainComponent  {

  constructor(
    private formsService: HeaderService
  ) {
    this.formsService.loadFormMinimals();
  }

}
