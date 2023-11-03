import {Component} from '@angular/core';
import {FormService} from "../core/services/form.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
  styleUrls: ['/main.component.scss']
})
export class MainComponent  {

  constructor(
    private formsService: FormService
  ) {
    this.formsService.loadFormMinimals();
  }

}
