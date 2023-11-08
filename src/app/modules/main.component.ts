import {Component} from '@angular/core';
import {FormCrudService} from "../core/services/form-crud.service";

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html',
  styleUrls: ['/main.component.scss']
})
export class MainComponent  {

  constructor(
    private formsService: FormCrudService
  ) {
    this.formsService.loadFormMinimals();
  }

}
