import {Component} from '@angular/core';
import {FormsService} from "../core/services/forms.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
  styleUrls: ['/main.component.scss']
})
export class MainComponent  {

  constructor(
    private formsService: FormsService
  ) {
    this.formsService.loadFormMinimals();
  }

}
